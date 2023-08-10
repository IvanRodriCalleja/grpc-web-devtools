import { StatusCode } from 'grpc-web';

import { GrpcStreamPartial, PartialNetworkAction } from 'src/shared';
import {
	GrpcStreamData,
	GrpcStreamEnd,
	GrpcStreamError,
	GrpcStreamMetadata
} from 'src/shared/GrpcStream';

import { DevToolsNetworkState } from '../DevToolsNetworkContext';

type SelectedNetworkRequest = {
	type: 'select-network-request';
	payload: {
		networkId: string;
	};
};

type CloseNetworkRequest = {
	type: 'close-network-request';
};

type StartRecording = {
	type: 'start-recording';
};

type StopRecording = {
	type: 'stop-recording';
};

type ClearNetworks = {
	type: 'clear-networks';
};

type SetSearch = {
	type: 'set-search';
	payload: string;
};

type Actions =
	| PartialNetworkAction
	| SelectedNetworkRequest
	| CloseNetworkRequest
	| StartRecording
	| StopRecording
	| ClearNetworks
	| SetSearch;

export const networkReducer = (
	state: DevToolsNetworkState,
	action: Actions
): DevToolsNetworkState => {
	switch (action.type) {
		case 'unary-request':
			if (state.isRecording === false) return state;

			return {
				...state,
				networkRequests: [...state.networkRequests, action.payload.partial]
			};
		case 'unary-response':
		case 'unary-error':
			if (state.isRecording === false) return state;

			return {
				...state,
				networkRequests: state.networkRequests.map(networkCall => {
					if (networkCall.id === action.payload.networkId) {
						return { ...networkCall, ...action.payload.partial };
					}
					return networkCall;
				}) as DevToolsNetworkState['networkRequests']
			};
		case 'stream-request':
			if (state.isRecording === false) return state;

			return {
				...state,
				networkRequests: [...state.networkRequests, { ...action.payload.partial, responses: [] }]
			};
		case 'stream-data':
		case 'stream-metadata':
		case 'stream-status':
			if (state.isRecording === false) return state;

			return {
				...state,
				networkRequests: state.networkRequests.map(networkCall => {
					const network = networkCall as GrpcStreamPartial;
					if (networkCall.id === action.payload.networkId) {
						return {
							...networkCall,
							responses: [
								...network.responses,
								action.payload.partial as
									| GrpcStreamData
									| GrpcStreamMetadata
									| GrpcStreamEnd
									| GrpcStreamError
							]
						};
					}
					return networkCall;
				})
			};

		case 'stream-error':
			if (state.isRecording === false) return state;

			return {
				...state,
				networkRequests: state.networkRequests.map(networkCall => {
					const network = networkCall as GrpcStreamPartial;
					if (networkCall.id === action.payload.networkId) {
						return {
							...networkCall,
							status: action.payload.partial.error.code,
							responses: [...network.responses, action.payload.partial]
						};
					}
					return networkCall;
				})
			};

		case 'stream-end':
			if (state.isRecording === false) return state;

			return {
				...state,
				networkRequests: state.networkRequests.map(networkCall => {
					const network = networkCall as GrpcStreamPartial;
					if (networkCall.id === action.payload.networkId) {
						return {
							...networkCall,
							status: networkCall.status || StatusCode.OK,
							time: action.payload.partial.time,
							responses: [...network.responses, action.payload.partial]
						};
					}
					return networkCall;
				})
			};
		case 'select-network-request':
			return {
				...state,
				selectedId: action.payload.networkId
			};

		case 'close-network-request':
			return {
				...state,
				selectedId: undefined
			};
		case 'start-recording':
			return {
				...state,
				isRecording: true
			};

		case 'stop-recording':
			return {
				...state,
				isRecording: false
			};
		case 'clear-networks':
			return {
				...state,
				networkRequests: []
			};
		case 'set-search':
			return {
				...state,
				search: action.payload
			};

		default:
			return state;
	}
};
