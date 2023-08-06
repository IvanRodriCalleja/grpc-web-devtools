import { RpcError, StatusCode } from 'grpc-web';
import { describe, it } from 'vitest';

import { NetworkMessage } from 'src/shared';
import { GrpcUnaryRequest } from 'src/shared/GrpcUnary';

import { DevToolsNetworkState } from '../DevToolsNetworkContext';
import { networkReducer } from './networkReducer';

const emptyState: DevToolsNetworkState = {
	networkRequests: [],
	selectedNetworkRequest: undefined
};

const unaryRequestTest: GrpcUnaryRequest = {
	id: '1',
	type: 'unary',
	url: '/test/url',
	request: { body: { test: 'test' }, metadata: { other: 'other' } }
};

describe('networkReducer', () => {
	describe('Unary actions', () => {
		describe('Unary request', () => {
			it('Should add Unary request to state', () => {
				const message: NetworkMessage = {
					source: 'grpc-web-devtools',
					networkId: '1',
					action: {
						type: 'unary-request',
						partial: {
							id: '1',
							type: 'unary',
							url: '/test/url',
							request: { body: { test: 'test' }, metadata: { other: 'other' } }
						}
					}
				};

				const state = networkReducer(emptyState, message);
				expect(state).toEqual({
					networkRequests: [message.action.partial],
					selectedNetworkRequest: undefined
				});
			});

			it('Should add multiple Unary request to state', () => {
				const messageOne: NetworkMessage = {
					source: 'grpc-web-devtools',
					networkId: '1',
					action: {
						type: 'unary-request',
						partial: {
							id: '1',
							type: 'unary',
							url: '/test/one',
							request: { body: { test: 'test-one' }, metadata: { other: 'other' } }
						}
					}
				};

				const messageTwo: NetworkMessage = {
					source: 'grpc-web-devtools',
					networkId: '2',
					action: {
						type: 'unary-request',
						partial: {
							id: '2',
							type: 'unary',
							url: '/test/two',
							request: { body: { test: 'test-two' }, metadata: { other: 'other' } }
						}
					}
				};

				const firstState = networkReducer(emptyState, messageOne);
				const state = networkReducer(firstState, messageTwo);
				expect(state).toEqual({
					networkRequests: [messageOne.action.partial, messageTwo.action.partial],
					selectedNetworkRequest: undefined
				});
			});
		});

		describe('Unary response', () => {
			it('Should append response to request', () => {
				const message: NetworkMessage = {
					source: 'grpc-web-devtools',
					networkId: '1',
					action: {
						type: 'unary-response',
						partial: {
							status: StatusCode.OK,
							response: { body: { test: 'test' }, metadata: { other: 'other' } },
							time: 100
						}
					}
				};

				const initialState: DevToolsNetworkState = {
					networkRequests: [unaryRequestTest]
				};

				const state = networkReducer(initialState, message);
				expect(state).toEqual({
					networkRequests: [{ ...unaryRequestTest, ...message.action.partial }],
					selectedNetworkRequest: undefined
				});
			});
		});
	});

	describe('Unary error', () => {
		it('Should append error to request', () => {
			const message: NetworkMessage = {
				source: 'grpc-web-devtools',
				networkId: '1',
				action: {
					type: 'unary-error',
					partial: {
						status: StatusCode.NOT_FOUND,
						error: new RpcError(StatusCode.NOT_FOUND, 'Not found', {}),
						time: 100
					}
				}
			};

			const initialState: DevToolsNetworkState = {
				networkRequests: [unaryRequestTest]
			};

			const state = networkReducer(initialState, message);
			expect(state).toEqual({
				networkRequests: [{ ...unaryRequestTest, ...message.action.partial }],
				selectedNetworkRequest: undefined
			});
		});
	});
});
