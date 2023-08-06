import * as pb from 'google-protobuf';
import { StreamInterceptor, UnaryInterceptor } from 'grpc-web';

import { GRPCStreamInterceptor } from './injected/GRPCStreamInterceptor';
import { GRPCUnaryInterceptor } from './injected/GRPCUnaryInterceptor';

type ServiceOptions = {
	unaryInterceptors: UnaryInterceptor<pb.Message, pb.Message>[];
	streamInterceptors: StreamInterceptor<pb.Message, pb.Message>[];
};

declare global {
	interface Window {
		__GRPC_WEB_DEVTOOLS__: (options?: null | ServiceOptions) => ServiceOptions;
	}
}
window.__GRPC_WEB_DEVTOOLS__ = options => {
	const devToolsInterceptors = {
		unaryInterceptors: [new GRPCUnaryInterceptor()],
		streamInterceptors: [new GRPCStreamInterceptor()]
	};

	if (!options) {
		return devToolsInterceptors;
	}

	return {
		...options,
		unaryInterceptors: [
			...(options?.unaryInterceptors || []),
			...devToolsInterceptors.unaryInterceptors
		],
		streamInterceptors: [
			...(options.streamInterceptors || []),
			...devToolsInterceptors.streamInterceptors
		]
	};
};

export {};
