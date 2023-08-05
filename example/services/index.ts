import * as pb from 'google-protobuf';
import { StreamInterceptor, UnaryInterceptor } from 'grpc-web';

import { DevToolsServicePromiseClient } from './dev_tools_grpc_web_pb';

export * from './dev_tools_grpc_web_pb';
export * from './dev_tools_pb';

type ServiceOptions = {
	unaryInterceptors: UnaryInterceptor<pb.Message, pb.Message>[];
	streamInterceptors: StreamInterceptor<pb.Message, pb.Message>[];
};

const domain = 'http://localhost:3000/api';

const defaultTools = (options?: ServiceOptions) => options;

declare const __GRPC_WEB_DEVTOOLS__: (options?: null | ServiceOptions) => ServiceOptions;
const grpcDevTools =
	typeof __GRPC_WEB_DEVTOOLS__ !== 'undefined' ? __GRPC_WEB_DEVTOOLS__ : defaultTools;

export const devToolsService = new DevToolsServicePromiseClient(domain, null, grpcDevTools());
console.log({ devToolsService });
