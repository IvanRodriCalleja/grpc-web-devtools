import { PropsWithChildren, createContext, useContext, useEffect, useReducer } from 'react';

import { GrpcNetworkPartial, NetworkMessage } from '../../shared';
import { networkReducer } from './networkContext/networkReducer';

export type DevToolsNetworkState = {
	networkRequests: GrpcNetworkPartial[];
	isRecording: boolean;
	selectedId?: string;
};

type DevToolsNetworkContextValue = {
	state: DevToolsNetworkState & {
		selectedNetworkRequest?: GrpcNetworkPartial;
	};
	onSelectNetwork: (networkId: string) => void;
	onCloseNetwork: () => void;
	onStartRecording: () => void;
	onStopRecording: () => void;
	onClearNetworks: () => void;
};

const DevToolsNetworkContext = createContext<DevToolsNetworkContextValue>({
	state: {
		networkRequests: [],
		isRecording: true,
		selectedNetworkRequest: undefined
	},
	onSelectNetwork: () => {},
	onCloseNetwork: () => {},
	onStartRecording: () => {},
	onStopRecording: () => {},
	onClearNetworks: () => {}
});

const initialState: DevToolsNetworkState = {
	networkRequests: [],
	isRecording: true,
	selectedId: undefined
};

export const DevToolsNetworkProvider = ({ children }: PropsWithChildren) => {
	const [state, dispatch] = useReducer(networkReducer, initialState);

	const onSelectNetwork = (networkId: string) =>
		dispatch({
			type: 'select-network-request',
			payload: {
				networkId
			}
		});

	const onCloseNetwork = () =>
		dispatch({
			type: 'close-network-request'
		});

	const onStartRecording = () =>
		dispatch({
			type: 'start-recording'
		});

	const onStopRecording = () =>
		dispatch({
			type: 'stop-recording'
		});

	const onClearNetworks = () =>
		dispatch({
			type: 'clear-networks'
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
				dispatch(message.action);
			}
		});
	}, []);

	const selectedNetworkRequest = state.networkRequests.find(({ id }) => id === state.selectedId);

	return (
		<DevToolsNetworkContext.Provider
			value={{
				onSelectNetwork,
				onCloseNetwork,
				onStartRecording,
				onStopRecording,
				onClearNetworks,
				state: { ...state, selectedNetworkRequest }
			}}>
			{children}
		</DevToolsNetworkContext.Provider>
	);
};

export const useDevToolsNetwork = () => useContext(DevToolsNetworkContext);
