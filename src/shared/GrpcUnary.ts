import { RpcError, StatusCode } from 'grpc-web';

export type GrpcUnary = GrpcUnaryRequest & GrpcUnaryResponse;

export type GrpcUnaryRequest = {
	type: 'unary';
	id: string;
	url: string;
	request: {
		metadata: Record<string, string>;
		body: unknown;
	};
};

export type GrpcUnaryResponse = {
	response: {
		metadata: Record<string, string>;
		body: unknown;
	};
	time: number;
	status: StatusCode;
};

export type GrpcUnaryError = {
	error: RpcError;
	time: number;
	status: StatusCode;
};
