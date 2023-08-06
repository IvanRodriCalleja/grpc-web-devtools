import * as pb from 'google-protobuf';
import { Request, RpcError, StatusCode, UnaryResponse } from 'grpc-web';

import { UnaryErrorMessage, UnaryRequestMessage, UnaryResponseMessage } from 'src/shared';

import { sendNetworkMessage } from '../shared/networkMessageSender';

type SendUnaryNetworkRequestMessageArgs = {
	networkId: string;
	request: Request<pb.Message, pb.Message>;
};

export const sendUnaryNetworkRequestMessage = ({
	networkId,
	request
}: SendUnaryNetworkRequestMessageArgs) => {
	const partialNetworkMessage: UnaryRequestMessage = {
		type: 'unary-request',
		partial: {
			id: networkId,
			type: 'unary',
			url: request.getMethodDescriptor().getName(),
			request: {
				body: request.getRequestMessage().toObject(),
				metadata: request.getMetadata()
			}
		}
	};

	sendNetworkMessage({ partialNetworkMessage, networkId });
};

type SendUnaryResponseArgs = {
	networkId: string;
	time: number;
	response: UnaryResponse<pb.Message, pb.Message>;
};

export const sendUnaryNetworkResponseMessage = ({
	networkId,
	response,
	time
}: SendUnaryResponseArgs) => {
	const partialNetworkMessage: UnaryResponseMessage = {
		type: 'unary-response',
		partial: {
			time,
			status: StatusCode.OK,
			response: {
				body: response.getResponseMessage().toObject(),
				metadata: response.getMetadata()
			}
		}
	};

	sendNetworkMessage({ partialNetworkMessage, networkId });
};

type SendUnaryNetworkErrorMessageArgs = {
	networkId: string;
	time: number;
	error: RpcError;
};

export const sendUnaryNetworkErrorMessage = ({
	networkId,
	error,
	time
}: SendUnaryNetworkErrorMessageArgs) => {
	const partialNetworkMessage: UnaryErrorMessage = {
		type: 'unary-error',
		partial: {
			time,
			status: error.code,
			error
		}
	};

	sendNetworkMessage({ partialNetworkMessage, networkId });
};
