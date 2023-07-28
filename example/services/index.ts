export * from './dev_tools_grpc_web_pb';
export * from './dev_tools_pb';

import { DevToolsServicePromiseClient } from './dev_tools_grpc_web_pb';

const domain = 'http://localhost:3000/api';

export const devToolsService = new DevToolsServicePromiseClient(domain, null, null);
