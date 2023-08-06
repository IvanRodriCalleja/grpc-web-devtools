import { NetworkMessage } from 'src/shared';

import { DevToolsNetworkState } from '../DevToolsNetworkContext';

export const networkReducer = (
	state: DevToolsNetworkState,
	{ action, networkId }: NetworkMessage
): DevToolsNetworkState => {
	switch (action.type) {
		case 'unary-request':
			return {
				...state,
				networkRequests: [...state.networkRequests, action.partial]
			};
		case 'unary-response':
		case 'unary-error':
			return {
				...state,
				networkRequests: state.networkRequests.map(networkCall => {
					if (networkCall.id === networkId) {
						return { ...networkCall, ...action.partial };
					}
					return networkCall;
				})
			};
		default:
			return state;
	}
};
