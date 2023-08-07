import { StatusCode } from 'grpc-web';

import { GrpcStreamPartial, NetworkMessage } from 'src/shared';
import {
	GrpcStreamData,
	GrpcStreamEnd,
	GrpcStreamError,
	GrpcStreamMetadata
} from 'src/shared/GrpcStream';

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
		case 'stream-request':
			return {
				...state,
				networkRequests: [...state.networkRequests, { ...action.partial, chunks: [] }]
			};
		case 'stream-data':
		case 'stream-metadata':
		case 'stream-status':
			return {
				...state,
				networkRequests: state.networkRequests.map(networkCall => {
					const network = networkCall as GrpcStreamPartial;
					if (networkCall.id === networkId) {
						return {
							...networkCall,
							chunks: [
								...network.chunks,
								action.partial as
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
			return {
				...state,
				networkRequests: state.networkRequests.map(networkCall => {
					const network = networkCall as GrpcStreamPartial;
					if (networkCall.id === networkId) {
						return {
							...networkCall,
							status: action.partial.error.code,
							chunks: [...network.chunks, action.partial]
						};
					}
					return networkCall;
				})
			};

		case 'stream-end':
			return {
				...state,
				networkRequests: state.networkRequests.map(networkCall => {
					const network = networkCall as GrpcStreamPartial;
					if (networkCall.id === networkId) {
						return {
							...networkCall,
							status: networkCall.status || StatusCode.OK,
							time: action.partial.time,
							chunks: [...network.chunks, action.partial]
						};
					}
					return networkCall;
				})
			};
		default:
			return state;
	}
};
