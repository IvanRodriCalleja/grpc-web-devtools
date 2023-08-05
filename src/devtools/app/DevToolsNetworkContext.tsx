import { PropsWithChildren, createContext, useContext, useReducer } from 'react';

import { GrpcStream } from 'src/shared/GrpcStream';
import { GrpcUnary } from 'src/shared/GrpcUnary';

import { networkReducer } from './networkContext/networkReducer';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type GrpcUnaryPartial = Optional<GrpcUnary, 'response' | 'status' | 'time'>;
export type GrpcStreamPartial = Optional<GrpcStream, 'status' | 'time'>;
export type GrpcNetworkPartial = GrpcUnaryPartial | GrpcStreamPartial;

export type DevToolsNetworkState = {
	networkRequests: GrpcNetworkPartial[];
	selectedNetworkRequest?: GrpcNetworkPartial;
};

const DevToolsNetworkContext = createContext<DevToolsNetworkState>({
	networkRequests: [],
	selectedNetworkRequest: undefined
});

const initialState: DevToolsNetworkState = {
	networkRequests: [],
	selectedNetworkRequest: undefined
};

export const DevToolsNetworkProvider = ({ children }: PropsWithChildren) => {
	const [state] = useReducer(networkReducer, initialState);

	return (
		<DevToolsNetworkContext.Provider value={state}>{children}</DevToolsNetworkContext.Provider>
	);
};

export const useDevToolsNetwork = () => useContext(DevToolsNetworkContext);
