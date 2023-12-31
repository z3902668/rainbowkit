import {
  isAndroid
} from "./chunk-FJVNKOUD.js";
import {
  getWalletConnectConnector
} from "./chunk-XRTMZ3WL.js";

// src/wallets/walletConnectors/zerionWallet/zerionWallet.ts
import { InjectedConnector } from "wagmi/connectors/injected";
var zerionWallet = ({
  chains,
  projectId,
  ...options
}) => {
  const isZerionInjected = typeof window !== "undefined" && (typeof window.ethereum !== "undefined" && window.ethereum.isZerion || typeof window.zerionWallet !== "undefined");
  const shouldUseWalletConnect = !isZerionInjected;
  return {
    id: "zerion",
    name: "Zerion",
    iconUrl: async () => (await import("./zerionWallet-I7DAEX5P.js")).default,
    iconAccent: "#2962ef",
    iconBackground: "#2962ef",
    installed: !shouldUseWalletConnect ? isZerionInjected : void 0,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=io.zerion.android",
      ios: "https://apps.apple.com/app/apple-store/id1456732565",
      mobile: "https://link.zerion.io/pt3gdRP0njb",
      qrCode: "https://link.zerion.io/pt3gdRP0njb",
      chrome: "https://chrome.google.com/webstore/detail/klghhnkeealcohjjanjjdaeeggmfmlpl",
      browserExtension: "https://zerion.io/extension"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({ projectId, chains }) : new InjectedConnector({
        chains,
        options: {
          getProvider: () => typeof window !== "undefined" ? window.zerionWallet || window.ethereum : void 0,
          ...options
        }
      });
      const getUri = async () => {
        const { uri } = (await connector.getProvider()).connector;
        return isAndroid() ? uri : `https://wallet.zerion.io/wc?uri=${encodeURIComponent(uri)}`;
      };
      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://zerion.io/blog/announcing-the-zerion-smart-wallet/",
            steps: [
              {
                description: "We recommend putting Zerion on your home screen for quicker access.",
                step: "install",
                title: "Open the Zerion app"
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
            learnMoreUrl: "https://help.zerion.io/en/",
            steps: [
              {
                description: "We recommend pinning Zerion to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the Zerion extension"
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
  zerionWallet
};
