import { grpcResponseToBuffer } from '@cloudnc/grpc-web-testing-toolbox/base';
import { status as Status } from '@grpc/grpc-js';
import { RpcError, StatusCode } from 'grpc-web';
import { NextApiHandler } from 'next';
import { delay } from 'shared/delay';

const handler: NextApiHandler = async (req, res) => {
	const message = 'This is a devtools error';
	const status = StatusCode.INVALID_ARGUMENT;

	const rpcError = new RpcError(status, message, {});

	const body = serializeErrorMock(rpcError);

	await delay(1000);

	return res
		.setHeader('Access-Control-Expose-Headers', 'custom-header-1,grpc-status,grpc-message')
		.setHeader('content-type', 'application/grpc-web+proto')
		.setHeader('grpc-status', status.toString())
		.setHeader('grpc-message', message)
		.status(200)
		.send(body);
};

export const serializeErrorMock = (error: RpcError): string => {
	const buffer = grpcResponseToBuffer({
		status: error.code as unknown as Status,
		detail: error.message
	});

	return buffer.toString('base64');
};

export default handler;
