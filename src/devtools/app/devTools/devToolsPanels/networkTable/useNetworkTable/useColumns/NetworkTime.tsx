type NetworkTimeProps = {
	time?: number;
};

export const NetworkTime = ({ time }: NetworkTimeProps) => {
	if (time === undefined) return '(Pending)';

	return `${time}ms`;
};
