import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
export interface BitKeepWalletOptions {
    projectId?: string;
    chains: Chain[];
}
export declare const bitkeepWallet: ({ chains, projectId, ...options }: BitKeepWalletOptions & InjectedConnectorOptions) => Wallet;
