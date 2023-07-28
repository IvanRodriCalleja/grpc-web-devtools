import { StreamingExampleCar, StreamingExampleResponse } from '@/services';
import { NextApiHandler } from 'next';
import * as grpcMock from '@botchris/grpc-web-mock';
import { StatusCode } from 'grpc-web';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const handler: NextApiHandler = async (req, res) => {
	res
		.setHeader('content-type', 'application/grpc-web-text')
		.setHeader('grpc-status', StatusCode.OK.toString())
		.setHeader('grpc-message', '');

	//Response One
	await delay(1000);

	const responseOne = new StreamingExampleResponse();
	const carOne = new StreamingExampleCar();

	carOne.setFieldOne('Mercedes');
	carOne.setFieldTwo(2020);
	carOne.setFieldThree(true);

	responseOne.setFieldOneList([carOne]);

	const bodyOne = grpcMock.ToTextResponse(responseOne).body as string;
	res.write(bodyOne);

	//Response Two
	await delay(1000);

	const responseTwo = new StreamingExampleResponse();
	const carTwo = new StreamingExampleCar();

	carTwo.setFieldOne('BWM');
	carTwo.setFieldTwo(1999);
	carTwo.setFieldThree(false);

	responseTwo.setFieldOneList([carTwo]);

	const bodyTwo = grpcMock.ToTextResponse(responseTwo).body as string;
	res.write(bodyTwo);

	//Response Three
	await delay(1000);

	const responseThree = new StreamingExampleResponse();
	const carThree = new StreamingExampleCar();

	carThree.setFieldOne('Peugeot');
	carThree.setFieldTwo(2010);
	carThree.setFieldThree(true);

	responseThree.setFieldOneList([carThree]);

	const bodyThree = grpcMock.ToTextResponse(responseThree).body as string;
	res.write(bodyThree);

	res.status(200).end();
};

export default handler;
