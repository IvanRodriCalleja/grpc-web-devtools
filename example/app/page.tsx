'use client';
import { useState } from 'react';
import {
	AlwaysErrorRequest,
	ExampleOneRequest,
	ExampleOneResponse,
	StreamingExampleCar,
	StreamingExampleRequest,
	devToolsService
} from '@/services';

const Home = () => {
	return (
		<div>
			<h1>Devtools Example</h1>
			<ExampleOne />
			<AlwaysError />
			<Streaming />
		</div>
	);
};

const ExampleOne = () => {
	const [state, setState] = useState<ExampleOneResponse.AsObject | null>(null);

	const fetchExampleOne = async () => {
		const request = new ExampleOneRequest();
		request.setFieldOne('Request Field One');
		request.setFieldTwo(999);
		request.setFieldThree(false);

		const response = await devToolsService.exampleOne(request);
		setState(response.toObject());
	};

	return (
		<div>
			<h2>Example One</h2>
			<div>{state ? JSON.stringify(state, null, 2) : '{}'}</div>
			<button onClick={fetchExampleOne}>Load Example One</button>
		</div>
	);
};

const AlwaysError = () => {
	const [state, setState] = useState<string>('');

	const fetchAlwaysError = async () => {
		const request = new AlwaysErrorRequest();
		request.setMsg('Request for error');

		try {
			await devToolsService.alwaysError(request);
		} catch (e) {
			const error = e as Error;
			setState(error.message);
		}
	};

	return (
		<div>
			<h2>Always Error</h2>
			<div>{state ? JSON.stringify(state, null, 2) : '{}'}</div>
			<button onClick={fetchAlwaysError}>Fetch with error</button>
		</div>
	);
};

const Streaming = () => {
	const [state, setState] = useState<StreamingExampleCar.AsObject[]>([]);

	const fetchStreaming = async () => {
		const request = new StreamingExampleRequest();
		request.setFieldOne('Request Field One');
		request.setFieldTwo(999);
		request.setFieldThree(false);

		const stream = await devToolsService.streamingExample(request);

		stream.on('data', response => {
			const cars = response.toObject().fieldOneList;
			setState(state => [...state, ...cars]);
		});

		stream.on('metadata', metadata => {
			console.log({ metadata });
		});

		stream.on('status', status => {
			console.log({ status });
		});

		stream.on('end', () => {
			console.log('EOF');
		});

		stream.on('error', error => {
			console.log({ error });
		});
	};

	return (
		<div>
			<h2>Streaming</h2>
			<div>{state ? JSON.stringify(state, null, 2) : '{}'}</div>
			<button onClick={fetchStreaming}>Fetch with error</button>
		</div>
	);
};

export default Home;
