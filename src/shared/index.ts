import {
	GrpcStream,
	GrpcStreamData,
	GrpcStreamEnd,
	GrpcStreamError,
	GrpcStreamMetadata,
	GrpcStreamRequest,
	GrpcStreamStatus
} from './GrpcStream';
import { GrpcUnary, GrpcUnaryError, GrpcUnaryRequest, GrpcUnaryResponse } from './GrpcUnary';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type GrpcUnaryPartial = Optional<GrpcUnary, 'response' | 'status' | 'time'>;
export type GrpcStreamPartial = Optional<GrpcStream, 'status' | 'time'>;
export type GrpcNetworkPartial = GrpcUnaryPartial | GrpcStreamPartial;

export type PartialNetworkAction =
	| UnaryRequestAction
	| UnaryResponseAction
	| UnaryErrorAction
	| StreamRequestAction
	| StreamDataAction
	| StreamMetadataAction
	| StreamStatusAction
	| StreamErrorAction
	| StreamEndAction;

export type UnaryRequestAction = {
	type: 'unary-request';
	payload: {
		partial: GrpcUnaryRequest;
	};
};

export type UnaryResponseAction = {
	type: 'unary-response';
	payload: {
		networkId: string;
		partial: GrpcUnaryResponse;
	};
};

export type UnaryErrorAction = {
	type: 'unary-error';
	payload: {
		networkId: string;
		partial: GrpcUnaryError;
	};
};

export type NetworkMessage = {
	source: 'grpc-web-devtools';
	action: PartialNetworkAction;
};

export type StreamRequestAction = {
	type: 'stream-request';
	payload: {
		partial: GrpcStreamRequest;
	};
};

export type StreamDataAction = {
	type: 'stream-data';
	payload: {
		networkId: string;
		partial: GrpcStreamData;
	};
};

export type StreamMetadataAction = {
	type: 'stream-metadata';
	payload: {
		networkId: string;
		partial: GrpcStreamMetadata;
	};
};

export type StreamStatusAction = {
	type: 'stream-status';
	payload: {
		networkId: string;
		partial: GrpcStreamStatus;
	};
};

export type StreamErrorAction = {
	type: 'stream-error';
	payload: {
		networkId: string;
		partial: GrpcStreamError;
	};
};

export type StreamEndAction = {
	type: 'stream-end';
	payload: {
		networkId: string;
		partial: GrpcStreamEnd;
	};
};
