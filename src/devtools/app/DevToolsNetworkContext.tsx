import { PropsWithChildren, createContext, useContext, useEffect, useReducer } from 'react';

import { GrpcNetworkPartial, NetworkMessage } from '../../shared';
import { networkReducer } from './networkContext/networkReducer';

export type DevToolsNetworkState = {
	networkRequests: GrpcNetworkPartial[];
	selectedNetworkRequest?: GrpcNetworkPartial;
};

type DevToolsNetworkContextValue = {
	state: DevToolsNetworkState;
	onSelectNetwork: (networkId: string) => void;
};

const DevToolsNetworkContext = createContext<DevToolsNetworkContextValue>({
	state: {
		networkRequests: [],
		selectedNetworkRequest: undefined
	},
	onSelectNetwork: () => {}
});

const initialState: DevToolsNetworkState = {
	networkRequests: [],
	selectedNetworkRequest: undefined
};

export const DevToolsNetworkProvider = ({ children }: PropsWithChildren) => {
	const [state, dispatch] = useReducer(networkReducer, initialState);

	const onSelectNetwork = (networkId: string) =>
		dispatch({
			networkId,
			action: {
				type: 'select-network-request'
			}
		});

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
		<DevToolsNetworkContext.Provider value={{ onSelectNetwork, state }}>
			{children}
		</DevToolsNetworkContext.Provider>
	);
};

export const useDevToolsNetwork = () => useContext(DevToolsNetworkContext);
