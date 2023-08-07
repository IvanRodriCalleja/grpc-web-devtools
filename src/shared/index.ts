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

export type PartialNetworkMessage =
	| UnaryRequestMessage
	| UnaryResponseMessage
	| UnaryErrorMessage
	| StreamRequestMessage
	| StreamDataMessage
	| StreamMetadataMessage
	| StreamStatusMessage
	| StreamErrorMessage
	| StreamEndMessage;

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

export type StreamRequestMessage = {
	type: 'stream-request';
	partial: GrpcStreamRequest;
};

export type StreamDataMessage = {
	type: 'stream-data';
	partial: GrpcStreamData;
};

export type StreamMetadataMessage = {
	type: 'stream-metadata';
	partial: GrpcStreamMetadata;
};

export type StreamStatusMessage = {
	type: 'stream-status';
	partial: GrpcStreamStatus;
};

export type StreamErrorMessage = {
	type: 'stream-error';
	partial: GrpcStreamError;
};

export type StreamEndMessage = {
	type: 'stream-end';
	partial: GrpcStreamEnd;
};
