import * as pb from 'google-protobuf';
import { Request, RpcError, StatusCode, UnaryResponse } from 'grpc-web';

import { UnaryErrorAction, UnaryRequestAction, UnaryResponseAction } from 'src/shared';

import { sendNetworkMessage } from '../shared/networkMessageSender';

type SendUnaryNetworkRequestMessageArgs = {
	networkId: string;
	request: Request<pb.Message, pb.Message>;
};

export const sendUnaryNetworkRequestMessage = ({
	networkId,
	request
}: SendUnaryNetworkRequestMessageArgs) => {
	const action: UnaryRequestAction = {
		type: 'unary-request',
		payload: {
			partial: {
				id: networkId,
				type: 'unary',
				url: request.getMethodDescriptor().getName(),
				request: {
					body: request.getRequestMessage().toObject(),
					metadata: request.getMetadata()
				}
			}
		}
	};

	sendNetworkMessage({ action });
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
	const action: UnaryResponseAction = {
		type: 'unary-response',
		payload: {
			networkId,
			partial: {
				time,
				status: StatusCode.OK,
				response: {
					body: response.getResponseMessage().toObject(),
					metadata: response.getMetadata()
				}
			}
		}
	};

	sendNetworkMessage({ action });
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
	const action: UnaryErrorAction = {
		type: 'unary-error',
		payload: {
			networkId,
			partial: {
				time,
				status: error.code,
				response: error
			}
		}
	};

	sendNetworkMessage({ action });
};
