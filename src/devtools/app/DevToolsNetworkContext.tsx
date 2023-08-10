import { PropsWithChildren, createContext, useContext, useEffect, useReducer } from 'react';

import { GrpcNetworkPartial, NetworkMessage } from '../../shared';
import { networkReducer } from './networkContext/networkReducer';

export type DevToolsNetworkState = {
	networkRequests: GrpcNetworkPartial[];
	isRecording: boolean;
	selectedId?: string;
	search: string;
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
	onSetSearch: (search: string) => void;
};

const DevToolsNetworkContext = createContext<DevToolsNetworkContextValue>({
	state: {
		networkRequests: [],
		isRecording: true,
		selectedNetworkRequest: undefined,
		search: ''
	},
	onSelectNetwork: () => {},
	onCloseNetwork: () => {},
	onStartRecording: () => {},
	onStopRecording: () => {},
	onClearNetworks: () => {},
	onSetSearch: () => {}
});

const initialState: DevToolsNetworkState = {
	networkRequests: [],
	isRecording: true,
	selectedId: undefined,
	search: ''
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

	const onSetSearch = (search: string) =>
		dispatch({
			type: 'set-search',
			payload: search
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
	const networkRequests = filterNetworks(state.networkRequests, state.search);

	return (
		<DevToolsNetworkContext.Provider
			value={{
				onSelectNetwork,
				onCloseNetwork,
				onStartRecording,
				onStopRecording,
				onClearNetworks,
				onSetSearch,
				state: {
					...state,
					selectedNetworkRequest,
					networkRequests
				}
			}}>
			{children}
		</DevToolsNetworkContext.Provider>
	);
};

export const useDevToolsNetwork = () => useContext(DevToolsNetworkContext);

const filterNetworks = (networks: GrpcNetworkPartial[], search: string) => {
	if (!search) {
		return networks;
	}

	return networks.filter(({ url }) => url.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
};
