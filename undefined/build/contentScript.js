"use strict";(()=>{var r=t=>{var o;let e=document.createElement("script");e.type="text/javascript",e.src=t,(document.head||document.documentElement).appendChild(e),(o=e.parentNode)==null||o.removeChild(e)};var n=chrome.runtime.getURL("../injected.js");window.addEventListener("message",t=>{if(console.log("ContentScript",{event:t}),t.source!==window)return;let e=t.data;e.source==="grpc-web-devtools"&&typeof e.partialNetworkMessage=="object"&&e.networkId!==void 0&&chrome.runtime.sendMessage(e)});r(n);})();
//# sourceMappingURL=contentScript.js.map