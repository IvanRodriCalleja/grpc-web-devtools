import { GRPCStreamInterceptor } from "/src/contentScript/grpcWebRegister/grpcWebInterceptor/GRPCStreamInterceptor.ts.js";
import { GRPCUnaryInterceptor } from "/src/contentScript/grpcWebRegister/grpcWebInterceptor/GRPCUnaryInterceptor.ts.js";
window.__GRPC_WEB_DEVTOOLS__ = (options)=>{
    const devToolsInterceptors = {
        unaryInterceptors: [
            new GRPCUnaryInterceptor()
        ],
        streamInterceptors: [
            new GRPCStreamInterceptor()
        ]
    };
    if (!options) {
        return devToolsInterceptors;
    }
    return {
        ...options,
        unaryInterceptors: [
            ...options?.unaryInterceptors || [],
            ...devToolsInterceptors.unaryInterceptors
        ],
        streamInterceptors: [
            ...options.streamInterceptors || [],
            ...devToolsInterceptors.streamInterceptors
        ]
    };
};
