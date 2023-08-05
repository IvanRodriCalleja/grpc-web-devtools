export class GRPCUnaryInterceptor {
    intercept(request, invoker) {
        const requestM = {
            body: request.getRequestMessage().toObject(),
            metadata: request.getMetadata(),
            url: request.getMethodDescriptor().getName()
        };
        console.log({
            requestM
        });
        return invoker(request).then((response)=>{
            const responseM = {
                body: response.getResponseMessage().toObject(),
                a: response.getStatus(),
                b: response.getMetadata()
            };
            console.log({
                responseM
            });
            return response;
        }).catch((error)=>{
            console.log({
                error
            });
            throw error;
        });
    }
}
