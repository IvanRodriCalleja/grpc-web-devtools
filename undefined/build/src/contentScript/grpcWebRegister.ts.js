//@ts-expect-error
import grpcWebInterceptors from "/src/contentScript/grpcWebRegister/grpcWebInterceptor.ts__scriptId--hAfo8.js";
import { injectScript } from "/src/contentScript/grpcWebRegister/injectScript.ts.js";
const grpcWebInterceptorsUrl = chrome.runtime.getURL(grpcWebInterceptors);
injectScript(grpcWebInterceptorsUrl);
