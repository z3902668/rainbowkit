import {
  getWalletConnectConnector
} from "./chunk-XRTMZ3WL.js";

// src/wallets/walletConnectors/bitkeepWallet/bitkeepWallet.ts
import "wagmi/connectors/injected";
var bitkeepWallet = ({
  chains,
  projectId,
  ...options
}) => {
  const isBitKeepInjected = typeof window !== "undefined" && typeof window.bitkeep !== "undefined" && window.bitkeep.ethereum;
  const shouldUseWalletConnect = !isBitKeepInjected;
  return {
    id: "bitkeep",
    name: "BitKeep",
    iconUrl: async () => (await import("./bitkeepWallet-YWBBVSMT.js")).default,
    iconAccent: "#7524f9",
    iconBackground: "#7524f9",
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.bitkeep.wallet",
      ios: "https://apps.apple.com/app/bitkeep/id1395301115",
      mobile: "https://bitkeep.com/en/download",
      qrCode: "https://bitkeep.com/en/download",
      chrome: "https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak",
      browserExtension: "https://bitkeep.com/en/download"
    },
    createConnector: () => {
      const connector = true ? getWalletConnectConnector({
        chains,
        projectId
      }) : new InjectedConnector({
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
            return uri;
          } : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri: async () => (await connector.getProvider()).connector.uri,
          instructions: {
            learnMoreUrl: "https://study.bitkeep.com/en/",
            steps: [
              {
                description: "We recommend putting BitKeep Wallet on your home screen for quicker access.",
                step: "install",
                title: "Open the BitKeep Wallet app"
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
            learnMoreUrl: "https://study.bitkeep.com/en/",
            steps: [
              {
                description: "We recommend pinning BitKeep Wallet to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the BitKeep Wallet extension"
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
