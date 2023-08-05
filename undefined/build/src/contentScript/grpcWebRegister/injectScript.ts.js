export const injectScript = (src)=>{
    const scriptNode = document.createElement('script');
    scriptNode.type = 'text/javascript';
    scriptNode.src = src;
    (document.head || document.documentElement).appendChild(scriptNode);
    scriptNode.parentNode?.removeChild(scriptNode);
};
