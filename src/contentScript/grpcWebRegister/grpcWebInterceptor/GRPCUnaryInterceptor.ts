import * as pb from 'google-protobuf';
import { Request, UnaryInterceptor, UnaryResponse } from 'grpc-web';

export class GRPCUnaryInterceptor implements UnaryInterceptor<pb.Message, pb.Message> {
	intercept(
		request: Request<pb.Message, pb.Message>,
		invoker: (
			request: Request<pb.Message, pb.Message>
		) => Promise<UnaryResponse<pb.Message, pb.Message>>
	) {
		const requestM = {
			body: request.getRequestMessage().toObject(),
			metadata: request.getMetadata(),
			url: request.getMethodDescriptor().getName()
		};

		console.log({ requestM });
		return invoker(request)
			.then((response: UnaryResponse<pb.Message, pb.Message>) => {
				const responseM = {
					body: response.getResponseMessage().toObject(),
					a: response.getStatus(),
					b: response.getMetadata()
				};

				console.log({ responseM });

				return response;
			})
			.catch(error => {
				console.log({ error });
				throw error;
			});
	}
}
