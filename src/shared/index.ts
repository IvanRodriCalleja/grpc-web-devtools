import { GrpcStream } from './GrpcStream';
import { GrpcUnary, GrpcUnaryError, GrpcUnaryRequest, GrpcUnaryResponse } from './GrpcUnary';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type GrpcUnaryPartial = Optional<GrpcUnary, 'response' | 'status' | 'time'>;
export type GrpcStreamPartial = Optional<GrpcStream, 'status' | 'time'>;
export type GrpcNetworkPartial = GrpcUnaryPartial | GrpcStreamPartial;

export type PartialNetworkMessage = UnaryRequestMessage | UnaryResponseMessage | UnaryErrorMessage;

export type UnaryRequestMessage = {
	type: 'unary-request';
	partial: GrpcUnaryRequest;
};

export type UnaryResponseMessage = {
	type: 'unary-response';
	partial: GrpcUnaryResponse;
};

export type UnaryErrorMessage = {
	type: 'unary-error';
	partial: GrpcUnaryError;
};

export type NetworkMessage = {
	source: 'grpc-web-devtools';
	networkId: string;
	action: PartialNetworkMessage;
};
