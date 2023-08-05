export class GRPCStreamInterceptor {
    intercept(request, invoker) {
        const requestM = {
            body: request.getRequestMessage().toObject(),
            metadata: request.getMetadata(),
            url: request.getMethodDescriptor().getName()
        };
        console.log({
            requestM
        });
        const stream = invoker(request);
        stream.on('data', (response)=>{
            console.log({
                url: requestM.url,
                response: response.toObject()
            });
        });
        stream.on('metadata', (metadata)=>{
            console.log({
                url: requestM.url,
                metadata
            });
        });
        stream.on('status', (status)=>{
            console.log({
                url: requestM.url,
                status
            });
        });
        stream.on('end', ()=>{
            console.log({
                url: requestM.url,
                response: 'EOF'
            });
        });
        stream.on('error', (error)=>{
            console.log({
                error
            });
        });
        return stream;
    }
}
