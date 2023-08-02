//@ts-expect-error
import grpcWebInterceptors from './grpcWebRegister/grpcWebInterceptor?script&module&bundle';
import { injectScript } from './grpcWebRegister/injectScript';

const grpcWebInterceptorsUrl = chrome.runtime.getURL(grpcWebInterceptors);

injectScript(grpcWebInterceptorsUrl);
