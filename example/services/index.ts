import * as pb from 'google-protobuf';

export * from './dev_tools_grpc_web_pb';
export * from './dev_tools_pb';

type ServiceOptions = {
	unaryInterceptors: UnaryInterceptor<pb.Message, pb.Message>[];
	streamInterceptors: StreamInterceptor<pb.Message, pb.Message>[];
};

declare global {
	interface Window {
		__GRPC_WEB_DEVTOOLS__: (options?: null | ServiceOptions) => ServiceOptions;
	}
}

import { StreamInterceptor, UnaryInterceptor } from 'grpc-web';
import { DevToolsServicePromiseClient } from './dev_tools_grpc_web_pb';

const domain = 'http://localhost:3000/api';
const grpcDevTools =
	typeof window !== 'undefined'
		? window.__GRPC_WEB_DEVTOOLS__
		: (options?: ServiceOptions) => options;

export const devToolsService = new DevToolsServicePromiseClient(domain, null, grpcDevTools());
console.log({ devToolsService });
