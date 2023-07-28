import * as jspb from 'google-protobuf';

export class ExampleOneRequest extends jspb.Message {
	getFieldOne(): string;
	setFieldOne(value: string): ExampleOneRequest;

	getFieldTwo(): number;
	setFieldTwo(value: number): ExampleOneRequest;

	getFieldThree(): boolean;
	setFieldThree(value: boolean): ExampleOneRequest;

	serializeBinary(): Uint8Array;
	toObject(includeInstance?: boolean): ExampleOneRequest.AsObject;
	static toObject(includeInstance: boolean, msg: ExampleOneRequest): ExampleOneRequest.AsObject;
	static serializeBinaryToWriter(message: ExampleOneRequest, writer: jspb.BinaryWriter): void;
	static deserializeBinary(bytes: Uint8Array): ExampleOneRequest;
	static deserializeBinaryFromReader(
		message: ExampleOneRequest,
		reader: jspb.BinaryReader
	): ExampleOneRequest;
}

export namespace ExampleOneRequest {
	export type AsObject = {
		fieldOne: string;
		fieldTwo: number;
		fieldThree: boolean;
	};
}

export class ExampleOneResponse extends jspb.Message {
	getFieldOne(): string;
	setFieldOne(value: string): ExampleOneResponse;

	getFieldTwo(): number;
	setFieldTwo(value: number): ExampleOneResponse;

	getFieldThree(): boolean;
	setFieldThree(value: boolean): ExampleOneResponse;

	serializeBinary(): Uint8Array;
	toObject(includeInstance?: boolean): ExampleOneResponse.AsObject;
	static toObject(includeInstance: boolean, msg: ExampleOneResponse): ExampleOneResponse.AsObject;
	static serializeBinaryToWriter(message: ExampleOneResponse, writer: jspb.BinaryWriter): void;
	static deserializeBinary(bytes: Uint8Array): ExampleOneResponse;
	static deserializeBinaryFromReader(
		message: ExampleOneResponse,
		reader: jspb.BinaryReader
	): ExampleOneResponse;
}

export namespace ExampleOneResponse {
	export type AsObject = {
		fieldOne: string;
		fieldTwo: number;
		fieldThree: boolean;
	};
}

export class AlwaysErrorRequest extends jspb.Message {
	getMsg(): string;
	setMsg(value: string): AlwaysErrorRequest;

	serializeBinary(): Uint8Array;
	toObject(includeInstance?: boolean): AlwaysErrorRequest.AsObject;
	static toObject(includeInstance: boolean, msg: AlwaysErrorRequest): AlwaysErrorRequest.AsObject;
	static serializeBinaryToWriter(message: AlwaysErrorRequest, writer: jspb.BinaryWriter): void;
	static deserializeBinary(bytes: Uint8Array): AlwaysErrorRequest;
	static deserializeBinaryFromReader(
		message: AlwaysErrorRequest,
		reader: jspb.BinaryReader
	): AlwaysErrorRequest;
}

export namespace AlwaysErrorRequest {
	export type AsObject = {
		msg: string;
	};
}

export class AlwaysErrorResponse extends jspb.Message {
	getMsg(): string;
	setMsg(value: string): AlwaysErrorResponse;

	serializeBinary(): Uint8Array;
	toObject(includeInstance?: boolean): AlwaysErrorResponse.AsObject;
	static toObject(includeInstance: boolean, msg: AlwaysErrorResponse): AlwaysErrorResponse.AsObject;
	static serializeBinaryToWriter(message: AlwaysErrorResponse, writer: jspb.BinaryWriter): void;
	static deserializeBinary(bytes: Uint8Array): AlwaysErrorResponse;
	static deserializeBinaryFromReader(
		message: AlwaysErrorResponse,
		reader: jspb.BinaryReader
	): AlwaysErrorResponse;
}

export namespace AlwaysErrorResponse {
	export type AsObject = {
		msg: string;
	};
}

export class StreamingExampleRequest extends jspb.Message {
	getFieldOne(): string;
	setFieldOne(value: string): StreamingExampleRequest;

	getFieldTwo(): number;
	setFieldTwo(value: number): StreamingExampleRequest;

	getFieldThree(): boolean;
	setFieldThree(value: boolean): StreamingExampleRequest;

	serializeBinary(): Uint8Array;
	toObject(includeInstance?: boolean): StreamingExampleRequest.AsObject;
	static toObject(
		includeInstance: boolean,
		msg: StreamingExampleRequest
	): StreamingExampleRequest.AsObject;
	static serializeBinaryToWriter(message: StreamingExampleRequest, writer: jspb.BinaryWriter): void;
	static deserializeBinary(bytes: Uint8Array): StreamingExampleRequest;
	static deserializeBinaryFromReader(
		message: StreamingExampleRequest,
		reader: jspb.BinaryReader
	): StreamingExampleRequest;
}

export namespace StreamingExampleRequest {
	export type AsObject = {
		fieldOne: string;
		fieldTwo: number;
		fieldThree: boolean;
	};
}

export class StreamingExampleResponse extends jspb.Message {
	getFieldOneList(): Array<StreamingExampleCar>;
	setFieldOneList(value: Array<StreamingExampleCar>): StreamingExampleResponse;
	clearFieldOneList(): StreamingExampleResponse;
	addFieldOne(value?: StreamingExampleCar, index?: number): StreamingExampleCar;

	serializeBinary(): Uint8Array;
	toObject(includeInstance?: boolean): StreamingExampleResponse.AsObject;
	static toObject(
		includeInstance: boolean,
		msg: StreamingExampleResponse
	): StreamingExampleResponse.AsObject;
	static serializeBinaryToWriter(
		message: StreamingExampleResponse,
		writer: jspb.BinaryWriter
	): void;
	static deserializeBinary(bytes: Uint8Array): StreamingExampleResponse;
	static deserializeBinaryFromReader(
		message: StreamingExampleResponse,
		reader: jspb.BinaryReader
	): StreamingExampleResponse;
}

export namespace StreamingExampleResponse {
	export type AsObject = {
		fieldOneList: Array<StreamingExampleCar.AsObject>;
	};
}

export class StreamingExampleCar extends jspb.Message {
	getFieldOne(): string;
	setFieldOne(value: string): StreamingExampleCar;

	getFieldTwo(): number;
	setFieldTwo(value: number): StreamingExampleCar;

	getFieldThree(): boolean;
	setFieldThree(value: boolean): StreamingExampleCar;

	serializeBinary(): Uint8Array;
	toObject(includeInstance?: boolean): StreamingExampleCar.AsObject;
	static toObject(includeInstance: boolean, msg: StreamingExampleCar): StreamingExampleCar.AsObject;
	static serializeBinaryToWriter(message: StreamingExampleCar, writer: jspb.BinaryWriter): void;
	static deserializeBinary(bytes: Uint8Array): StreamingExampleCar;
	static deserializeBinaryFromReader(
		message: StreamingExampleCar,
		reader: jspb.BinaryReader
	): StreamingExampleCar;
}

export namespace StreamingExampleCar {
	export type AsObject = {
		fieldOne: string;
		fieldTwo: number;
		fieldThree: boolean;
	};
}
