import { ExampleOneResponse } from 'services';
import { NextApiHandler } from 'next';
import * as grpcMock from '@botchris/grpc-web-mock';
import { StatusCode } from 'grpc-web';

const handler: NextApiHandler = (req, res) => {
	const response = new ExampleOneResponse();
	response.setFieldOne('This is field one');
	response.setFieldTwo(25);
	response.setFieldThree(true);

	const body = grpcMock.ToTextResponse(response).body as string;

	return res
		.setHeader('content-type', 'application/grpc-web-text')
		.setHeader('grpc-status', StatusCode.OK.toString())
		.setHeader('grpc-message', '')
		.status(200)
		.send(body);
};

export default handler;
