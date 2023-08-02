import * as pb from 'google-protobuf';
import { ClientReadableStream, Request, StreamInterceptor } from 'grpc-web';

export class GRPCStreamInterceptor implements StreamInterceptor<pb.Message, pb.Message> {
	intercept(
		request: Request<pb.Message, pb.Message>,
		invoker: (request: Request<pb.Message, pb.Message>) => ClientReadableStream<pb.Message>
	): ClientReadableStream<pb.Message> {
		const requestM = {
			body: request.getRequestMessage().toObject(),
			metadata: request.getMetadata(),
			url: request.getMethodDescriptor().getName()
		};

		console.log({ requestM });

		const stream = invoker(request);

		stream.on('data', response => {
			console.log({ url: requestM.url, response: response.toObject() });
		});

		stream.on('metadata', metadata => {
			console.log({ url: requestM.url, metadata });
		});

		stream.on('status', status => {
			console.log({ url: requestM.url, status });
		});

		stream.on('end', () => {
			console.log({ url: requestM.url, response: 'EOF' });
		});

		stream.on('error', error => {
			console.log({ error });
		});

		return stream;
	}
}
