import { RpcError, StatusCode } from 'grpc-web';

export type GrpcStream = {
	type: 'stream';
	id: string;
	url: string;
	request: GrpcStreamRequest;
	chunks: (GrpcStreamData | GrpcStreamMetaData | GrpcStreamEnd | GrpcStreamError)[];
	time: number;
	status: StatusCode;
};

export type GrpcStreamRequest = {
	type: 'stream-request';
	metadata: Record<string, string>;
	body: unknown;
};

export type GrpcStreamData = {
	type: 'stream-data';
	data: unknown;
};

export type GrpcStreamMetaData = {
	type: 'stream-metadata';
	metadata: unknown;
};

//Missing on('status')

export type GrpcStreamEnd = {
	type: 'stream-end';
};

export type GrpcStreamError = {
	type: 'stream-error';
	error: RpcError;
};
