import { StatusCode } from 'grpc-web';

type NetworkStatusProps = {
	status?: StatusCode;
};

export const NetworkStatus = ({ status }: NetworkStatusProps) => {
	if (status === undefined) return '(Pending)';

	const indexOfS = Object.values(StatusCode).indexOf(status);
	const networkStatus = Object.keys(StatusCode)[indexOfS];

	return networkStatus;
};
