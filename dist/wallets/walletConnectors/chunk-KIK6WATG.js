import {
  getWalletConnectConnector
} from "./chunk-XRTMZ3WL.js";

// src/wallets/walletConnectors/imTokenWallet/imTokenWallet.ts
var imTokenWallet = ({
  chains,
  projectId
}) => ({
  id: "imToken",
  name: "imToken",
  iconUrl: async () => (await import("./imTokenWallet-N4QF2A7I.js")).default,
  iconBackground: "#098de6",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=im.token.app",
    ios: "https://itunes.apple.com/us/app/imtoken2/id1384798940",
    mobile: "https://token.im/download",
    qrCode: "https://token.im/download"
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ projectId, chains });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return `imtokenv2://wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl: typeof window !== "undefined" && window.navigator.language.includes("zh") ? "https://support.token.im/hc/zh-cn/categories/360000925393" : "https://support.token.im/hc/en-us/categories/360000925393",
          steps: [
            {
              description: "Put imToken app on your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the imToken app"
            },
            {
              description: "Create a new wallet or import an existing one.",
              step: "create",
              title: "Create or Import a Wallet"
            },
            {
              description: "Choose New Connection, then scan the QR code and confirm the prompt to connect.",
              step: "scan",
              title: "Tap Scanner Icon in top right corner"
            }
          ]
        }
      }
    };
  }
});

export {
  imTokenWallet
};
