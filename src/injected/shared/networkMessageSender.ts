import { NetworkMessage, PartialNetworkMessage } from 'src/shared';

type SendNetworkMessageArgs = {
	partialNetworkMessage: PartialNetworkMessage;
	networkId: string;
};

export const sendNetworkMessage = ({
	partialNetworkMessage,
	networkId
}: SendNetworkMessageArgs) => {
	window.postMessage({
		source: 'grpc-web-devtools',
		networkId,
		action: { ...partialNetworkMessage }
	} as NetworkMessage);
};
