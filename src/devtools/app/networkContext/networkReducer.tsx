import { GrpcUnaryRequest, GrpcUnaryResponse } from 'src/shared/GrpcUnary';

import { DevToolsNetworkState } from '../DevToolsNetworkContext';

type OnRequestStart = { type: 'request-start'; payload: GrpcUnaryRequest };
type OnRequestEnd = { type: 'request-end'; payload: { id: string; response: GrpcUnaryResponse } };

type RequestActions = OnRequestStart | OnRequestEnd;

type Actions = RequestActions;

export const networkReducer = (
	state: DevToolsNetworkState,
	action: Actions
): DevToolsNetworkState => {
	switch (action.type) {
		case 'request-start':
			return {
				...state,
				networkRequests: [...state.networkRequests, action.payload]
			};
		case 'request-end':
			return {
				...state,
				networkRequests: state.networkRequests.map(networkCall => {
					if (networkCall.id === action.payload.id) {
						return { ...networkCall, ...action.payload.response };
					}
					return networkCall;
				})
			};
		default:
			return state;
	}
};
