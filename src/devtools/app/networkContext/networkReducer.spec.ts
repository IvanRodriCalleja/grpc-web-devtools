import { RpcError, StatusCode } from 'grpc-web';
import { describe, it } from 'vitest';

import { PartialNetworkAction } from 'src/shared';
import { GrpcUnaryRequest } from 'src/shared/GrpcUnary';

import { DevToolsNetworkState } from '../DevToolsNetworkContext';
import { networkReducer } from './networkReducer';

const emptyState: DevToolsNetworkState = {
	networkRequests: [],
	selectedId: undefined,
	isRecording: true,
	search: ''
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
				const action: PartialNetworkAction = {
					type: 'unary-request',
					payload: {
						partial: {
							id: '1',
							type: 'unary',
							url: '/test/url',
							request: { body: { test: 'test' }, metadata: { other: 'other' } }
						}
					}
				};

				const state = networkReducer(emptyState, action);
				expect(state).toEqual({
					networkRequests: [action.payload.partial],
					selectedNetworkRequest: undefined,
					isRecording: true,
					search: ''
				});
			});

			it('Should add multiple Unary request to state', () => {
				const messageOne: PartialNetworkAction = {
					type: 'unary-request',
					payload: {
						partial: {
							id: '1',
							type: 'unary',
							url: '/test/one',
							request: { body: { test: 'test-one' }, metadata: { other: 'other' } }
						}
					}
				};

				const messageTwo: PartialNetworkAction = {
					type: 'unary-request',
					payload: {
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
					networkRequests: [messageOne.payload.partial, messageTwo.payload.partial],
					selectedNetworkRequest: undefined,
					isRecording: true,
					search: ''
				});
			});
		});

		describe('Unary response', () => {
			it('Should append response to request', () => {
				const message: PartialNetworkAction = {
					type: 'unary-response',
					payload: {
						networkId: '1',
						partial: {
							status: StatusCode.OK,
							response: { body: { test: 'test' }, metadata: { other: 'other' } },
							time: 100
						}
					}
				};

				const initialState: DevToolsNetworkState = {
					networkRequests: [unaryRequestTest],
					isRecording: true,
					search: ''
				};

				const state = networkReducer(initialState, message);
				expect(state).toEqual({
					networkRequests: [{ ...unaryRequestTest, ...message.payload.partial }],
					selectedNetworkRequest: undefined,
					isRecording: true,
					search: ''
				});
			});
		});
	});

	describe('Unary error', () => {
		it('Should append error to request', () => {
			const message: PartialNetworkAction = {
				type: 'unary-error',
				payload: {
					networkId: '1',
					partial: {
						status: StatusCode.NOT_FOUND,
						response: new RpcError(StatusCode.NOT_FOUND, 'Not found', {}),
						time: 100
					}
				}
			};

			const initialState: DevToolsNetworkState = {
				networkRequests: [unaryRequestTest],
				isRecording: true,
				search: ''
			};

			const state = networkReducer(initialState, message);
			expect(state).toEqual({
				networkRequests: [{ ...unaryRequestTest, ...message.payload.partial }],
				selectedNetworkRequest: undefined,
				isRecording: true,
				search: ''
			});
		});
	});
});
