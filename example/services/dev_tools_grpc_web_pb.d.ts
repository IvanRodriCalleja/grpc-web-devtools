import * as grpcWeb from 'grpc-web';

import * as dev_tools_pb from './dev_tools_pb';

export class DevToolsServiceClient {
	constructor(
		hostname: string,
		credentials?: null | { [index: string]: string },
		options?: null | { [index: string]: unknown }
	);

	exampleOne(
		request: dev_tools_pb.ExampleOneRequest,
		metadata: grpcWeb.Metadata | undefined,
		callback: (err: grpcWeb.RpcError, response: dev_tools_pb.ExampleOneResponse) => void
	): grpcWeb.ClientReadableStream<dev_tools_pb.ExampleOneResponse>;

	alwaysError(
		request: dev_tools_pb.AlwaysErrorRequest,
		metadata: grpcWeb.Metadata | undefined,
		callback: (err: grpcWeb.RpcError, response: dev_tools_pb.AlwaysErrorResponse) => void
	): grpcWeb.ClientReadableStream<dev_tools_pb.AlwaysErrorResponse>;

	streamingExample(
		request: dev_tools_pb.StreamingExampleRequest,
		metadata?: grpcWeb.Metadata
	): grpcWeb.ClientReadableStream<dev_tools_pb.StreamingExampleResponse>;
}

export class DevToolsServicePromiseClient {
	constructor(
		hostname: string,
		credentials?: null | { [index: string]: string },
		options?: null | { [index: string]: unknown }
	);

	exampleOne(
		request: dev_tools_pb.ExampleOneRequest,
		metadata?: grpcWeb.Metadata
	): Promise<dev_tools_pb.ExampleOneResponse>;

	alwaysError(
		request: dev_tools_pb.AlwaysErrorRequest,
		metadata?: grpcWeb.Metadata
	): Promise<dev_tools_pb.AlwaysErrorResponse>;

	streamingExample(
		request: dev_tools_pb.StreamingExampleRequest,
		metadata?: grpcWeb.Metadata
	): grpcWeb.ClientReadableStream<dev_tools_pb.StreamingExampleResponse>;
}
