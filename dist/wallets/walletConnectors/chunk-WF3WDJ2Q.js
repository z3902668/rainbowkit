import {
  isAndroid
} from "./chunk-FJVNKOUD.js";
import {
  getWalletConnectConnector
} from "./chunk-XRTMZ3WL.js";

// src/wallets/walletConnectors/bitkeepWallet/bitkeepWallet.ts
import { InjectedConnector } from "wagmi/connectors/injected";
var bitkeepWallet = ({
  chains,
  projectId,
  ...options
}) => {
  const isBitKeepInjected = typeof window !== "undefined" && typeof window.bitkeep && window.bitkeep.ethereum;
  const shouldUseWalletConnect = !isBitKeepInjected;
  return {
    id: "bitkeep",
    name: "BitKeep",
    iconUrl: async () => (await import("./bitkeepWallet-YWBBVSMT.js")).default,
    iconAccent: "#7524f9",
    iconBackground: "#7524f9",
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.okinc.okex.gp",
      ios: "https://itunes.apple.com/app/id1327268470?mt=8",
      mobile: "https://okx.com/download",
      qrCode: "https://okx.com/download",
      chrome: "https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge",
      edge: "https://microsoftedge.microsoft.com/addons/detail/okx-wallet/pbpjkcldjiffchgbbndmhojiacbgflha",
      firefox: "https://addons.mozilla.org/firefox/addon/okexwallet/",
      browserExtension: "https://okx.com/download"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({ projectId, chains }) : new InjectedConnector({
        chains,
        options: {
          getProvider: () => window.bitkeep.ethereum,
          ...options
        }
      });
      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? async () => {
            const { uri } = (await connector.getProvider()).connector;
            return isAndroid() ? uri : `okex://main/wc?uri=${encodeURIComponent(uri)}`;
          } : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri: async () => (await connector.getProvider()).connector.uri,
          instructions: {
            learnMoreUrl: "https://okx.com/web3/",
            steps: [
              {
                description: "We recommend putting OKX Wallet on your home screen for quicker access.",
                step: "install",
                title: "Open the OKX Wallet app"
              },
              {
                description: "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "After you scan, a connection prompt will appear for you to connect your wallet.",
                step: "scan",
                title: "Tap the scan button"
              }
            ]
          }
        } : void 0,
        extension: {
          instructions: {
            learnMoreUrl: "https://okx.com/web3/",
            steps: [
              {
                description: "We recommend pinning OKX Wallet to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the OKX Wallet extension"
              },
              {
                description: "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "Once you set up your wallet, click below to refresh the browser and load up the extension.",
                step: "refresh",
                title: "Refresh your browser"
              }
            ]
          }
        }
      };
    }
  };
};

export {
  bitkeepWallet
};
