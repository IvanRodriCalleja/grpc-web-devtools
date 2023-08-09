import { NetworkMessage, PartialNetworkAction } from 'src/shared';

type SendNetworkMessageArgs = {
	action: PartialNetworkAction;
};

export const sendNetworkMessage = ({ action }: SendNetworkMessageArgs) => {
	window.postMessage({
		source: 'grpc-web-devtools',
		action
	} as NetworkMessage);
};
