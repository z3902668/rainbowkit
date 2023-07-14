import {
  getWalletConnectConnector
} from "./chunk-XRTMZ3WL.js";

// src/wallets/walletConnectors/tokenpocketWallet/tokenpocketWallet.ts
import { InjectedConnector } from "wagmi/connectors/injected";
var tokenpocketWallet = ({
  chains,
  projectId,
  ...options
}) => {
  const isTokenPocketInjected = typeof window !== "undefined" && typeof window.ethereum !== "undefined";
  const shouldUseWalletConnect = !isTokenPocketInjected;
  return {
    id: "tokenpocket",
    name: "TokenPocket",
    iconUrl: async () => (await import("./tokenpocketWallet-NMTQVFAY.js")).default,
    iconAccent: "#2980fe",
    iconBackground: "#2980fe",
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=vip.mytokenpocket",
      ios: "https://apps.apple.com/hk/app/tp-global-wallet/id6444625622",
      mobile: "https://www.tokenpocket.pro/zh/download/app",
      qrCode: "https://www.tokenpocket.pro/zh/download/app",
      chrome: "https://chrome.google.com/webstore/detail/tokenpocket/mfgccjchihfkkindfppnaooecgfneiii?hl=zh-CN",
      browserExtension: "https://www.tokenpocket.pro/zh/download/app"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        chains,
        projectId
      }) : new InjectedConnector({
        chains,
        options: {
          getProvider: () => window.ethereum,
          ...options
        }
      });
      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? async () => {
            const { uri } = (await connector.getProvider()).connector;
            return uri;
          } : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri: async () => (await connector.getProvider()).connector.uri,
          instructions: {
            learnMoreUrl: "https://www.tokenpocket.pro/",
            steps: [
              {
                description: "We recommend putting TokenPocket Wallet on your home screen for quicker access.",
                step: "install",
                title: "Open the TokenPocket Wallet app"
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
            learnMoreUrl: "https://www.tokenpocket.pro/",
            steps: [
              {
                description: "We recommend pinning TokenPocket Wallet to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the TokenPocket Wallet extension"
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
  tokenpocketWallet
};
