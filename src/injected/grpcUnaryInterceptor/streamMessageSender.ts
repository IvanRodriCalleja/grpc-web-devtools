import * as pb from 'google-protobuf';
import { Metadata, Request, RpcError, Status } from 'grpc-web';

import {
	StreamDataAction,
	StreamEndAction,
	StreamErrorAction,
	StreamMetadataAction,
	StreamRequestAction,
	StreamStatusAction
} from 'src/shared';

import { sendNetworkMessage } from '../shared/networkMessageSender';

type SendStreamNetworkRequestMessageArgs = {
	networkId: string;
	request: Request<pb.Message, pb.Message>;
};

export const sendStreamNetworkRequestMessageArgs = ({
	networkId,
	request
}: SendStreamNetworkRequestMessageArgs) => {
	const action: StreamRequestAction = {
		type: 'stream-request',
		payload: {
			partial: {
				id: networkId,
				type: 'stream',
				//@ts-ignore
				url: request.getMethodDescriptor().name || request.getMethodDescriptor().getName(),
				request: {
					body: request.getRequestMessage().toObject(),
					metadata: request.getMetadata()
				}
			}
		}
	};

	sendNetworkMessage({ action });
};

type SendStreamNetworkDataMessageArgs = {
	networkId: string;
	data: pb.Message;
	time: number;
};

export const sendStreamNetworkDataMessageArgs = ({
	networkId,
	data,
	time
}: SendStreamNetworkDataMessageArgs) => {
	const action: StreamDataAction = {
		type: 'stream-data',
		payload: {
			networkId,
			partial: {
				data: data.toObject(),
				time
			}
		}
	};

	sendNetworkMessage({ action });
};

type SendStreamNetworkMetadataMessageArgs = {
	networkId: string;
	metadata: Metadata;
	time: number;
};

export const sendStreamNetworkMetadataMessageArgs = ({
	networkId,
	metadata,
	time
}: SendStreamNetworkMetadataMessageArgs) => {
	const action: StreamMetadataAction = {
		type: 'stream-metadata',
		payload: {
			networkId,
			partial: {
				metadata,
				time
			}
		}
	};

	sendNetworkMessage({ action });
};

type SendStreamNetworkStatusMessageArgs = {
	networkId: string;
	status: Status;
	time: number;
};

export const sendStreamNetworkStatusMessageArgs = ({
	networkId,
	status,
	time
}: SendStreamNetworkStatusMessageArgs) => {
	const action: StreamStatusAction = {
		type: 'stream-status',
		payload: {
			networkId,
			partial: {
				status,
				time
			}
		}
	};

	sendNetworkMessage({ action });
};

type SendStreamNetworkErrorMessageArgs = {
	networkId: string;
	error: RpcError;
	time: number;
};

export const sendStreamNetworkErrorMessageArgs = ({
	networkId,
	error,
	time
}: SendStreamNetworkErrorMessageArgs) => {
	const action: StreamErrorAction = {
		type: 'stream-error',
		payload: {
			networkId,
			partial: {
				error,
				time
			}
		}
	};

	sendNetworkMessage({ action });
};

type SendStreamNetworkEndMessageArgs = {
	networkId: string;
	time: number;
};

export const sendStreamNetworkEndMessageArgs = ({
	networkId,
	time
}: SendStreamNetworkEndMessageArgs) => {
	const action: StreamEndAction = {
		type: 'stream-end',
		payload: {
			networkId,
			partial: {
				end: 'EOF',
				time
			}
		}
	};

	sendNetworkMessage({ action });
};
