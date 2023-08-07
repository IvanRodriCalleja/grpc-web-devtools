import * as pb from 'google-protobuf';
import { Metadata, Request, RpcError, Status } from 'grpc-web';

import {
	StreamDataMessage,
	StreamEndMessage,
	StreamErrorMessage,
	StreamMetadataMessage,
	StreamRequestMessage,
	StreamStatusMessage
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
	const partialNetworkMessage: StreamRequestMessage = {
		type: 'stream-request',
		partial: {
			id: networkId,
			type: 'stream',
			url: request.getMethodDescriptor().getName(),
			request: {
				body: request.getRequestMessage().toObject(),
				metadata: request.getMetadata()
			}
		}
	};

	sendNetworkMessage({ partialNetworkMessage, networkId });
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
	const partialNetworkMessage: StreamDataMessage = {
		type: 'stream-data',
		partial: {
			data: data.toObject(),
			time
		}
	};

	sendNetworkMessage({ partialNetworkMessage, networkId });
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
	const partialNetworkMessage: StreamMetadataMessage = {
		type: 'stream-metadata',
		partial: {
			metadata,
			time
		}
	};

	sendNetworkMessage({ partialNetworkMessage, networkId });
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
	const partialNetworkMessage: StreamStatusMessage = {
		type: 'stream-status',
		partial: {
			status,
			time
		}
	};

	sendNetworkMessage({ partialNetworkMessage, networkId });
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
	const partialNetworkMessage: StreamErrorMessage = {
		type: 'stream-error',
		partial: {
			error,
			time
		}
	};

	sendNetworkMessage({ partialNetworkMessage, networkId });
};

type SendStreamNetworkEndMessageArgs = {
	networkId: string;
	time: number;
};

export const sendStreamNetworkEndMessageArgs = ({
	networkId,
	time
}: SendStreamNetworkEndMessageArgs) => {
	const partialNetworkMessage: StreamEndMessage = {
		type: 'stream-end',
		partial: {
			end: 'EOF',
			time
		}
	};

	sendNetworkMessage({ partialNetworkMessage, networkId });
};
