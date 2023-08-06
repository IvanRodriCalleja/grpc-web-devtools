import { PropsWithChildren, createContext, useContext, useEffect, useReducer } from 'react';

import { GrpcNetworkPartial, NetworkMessage } from '../../shared';
import { networkReducer } from './networkContext/networkReducer';

export type DevToolsNetworkState = {
	networkRequests: GrpcNetworkPartial[];
	selectedNetworkRequest?: GrpcNetworkPartial;
};

const DevToolsNetworkContext = createContext<DevToolsNetworkState>({
	networkRequests: [],
	selectedNetworkRequest: undefined
});

const initialState: DevToolsNetworkState = {
	networkRequests: [],
	selectedNetworkRequest: undefined
};

export const DevToolsNetworkProvider = ({ children }: PropsWithChildren) => {
	const [state, dispatch] = useReducer(networkReducer, initialState);

	useEffect(() => {
		const connection = chrome.runtime.connect({
			name: 'panel'
		});

		connection.postMessage({
			name: 'init',
			tabId: chrome.devtools.inspectedWindow.tabId
		});

		connection.onMessage.addListener((message: NetworkMessage) => {
			if (message.source === 'grpc-web-devtools') {
				dispatch(message);
			}
		});
	}, []);

	return (
		<DevToolsNetworkContext.Provider value={state}>{children}</DevToolsNetworkContext.Provider>
	);
};

export const useDevToolsNetwork = () => useContext(DevToolsNetworkContext);
