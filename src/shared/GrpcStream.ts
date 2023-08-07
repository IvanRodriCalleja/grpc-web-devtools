import { Metadata, RpcError, Status, StatusCode } from 'grpc-web';

export type GrpcStream = GrpcStreamRequest & {
	chunks: (GrpcStreamData | GrpcStreamMetadata | GrpcStreamEnd | GrpcStreamError)[];
	time: number;
	status: StatusCode;
};

export type GrpcStreamRequest = {
	type: 'stream';
	id: string;
	url: string;
	request: {
		metadata: Record<string, string>;
		body: unknown;
	};
};

export type GrpcStreamData = {
	data: unknown;
	time: number;
};

export type GrpcStreamMetadata = {
	metadata: Metadata;
	time: number;
};

export type GrpcStreamStatus = {
	status: Status;
	time: number;
};

export type GrpcStreamError = {
	error: RpcError;
	time: number;
};

export type GrpcStreamEnd = {
	end: 'EOF';
	time: number;
};
