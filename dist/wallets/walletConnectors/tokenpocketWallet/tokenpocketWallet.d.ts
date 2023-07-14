import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
export interface TokenPocketWalletOptions {
    projectId?: string;
    chains: Chain[];
}
export declare const tokenpocketWallet: ({ chains, projectId, ...options }: TokenPocketWalletOptions & InjectedConnectorOptions) => Wallet;
