import {
  getWalletConnectConnector
} from "./chunk-XRTMZ3WL.js";

// src/wallets/walletConnectors/trustWallet/trustWallet.ts
import { InjectedConnector } from "wagmi/connectors/injected";
function getTrustWalletInjectedProvider() {
  var _a;
  const isTrustWallet = (ethereum) => {
    const trustWallet2 = !!ethereum.isTrust;
    return trustWallet2;
  };
  const injectedProviderExist = typeof window !== "undefined" && typeof window.ethereum !== "undefined";
  if (!injectedProviderExist) {
    return;
  }
  if (window["trustwallet"]) {
    return window["trustwallet"];
  }
  if (isTrustWallet(window.ethereum)) {
    return window.ethereum;
  }
  if ((_a = window.ethereum) == null ? void 0 : _a.providers) {
    return window.ethereum.providers.find(isTrustWallet);
  }
}
var trustWallet = ({
  chains,
  projectId,
  ...options
}) => {
  const isTrustWalletInjected = Boolean(getTrustWalletInjectedProvider());
  const shouldUseWalletConnect = !isTrustWalletInjected;
  return {
    id: "trust",
    name: "Trust Wallet",
    iconUrl: async () => (await import("./trustWallet-TQQHHBST.js")).default,
    installed: isTrustWalletInjected || void 0,
    iconAccent: "#3375BB",
    iconBackground: "#fff",
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp",
      ios: "https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409",
      mobile: "https://trustwallet.com/download",
      qrCode: "https://trustwallet.com/download",
      chrome: "https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph",
      browserExtension: "https://trustwallet.com/browser-extension"
    },
    createConnector: () => {
      const getUriMobile = async () => {
        const { uri } = (await connector.getProvider()).connector;
        return `https://link.trustwallet.com/wc?uri=${encodeURIComponent(uri)}`;
      };
      const getUriQR = async () => {
        const { uri } = (await connector.getProvider()).connector;
        return uri;
      };
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({ projectId, chains }) : new InjectedConnector({
        chains,
        options: {
          name: "Trust Wallet",
          shimChainChangedDisconnect: true,
          getProvider: getTrustWalletInjectedProvider,
          ...options
        }
      });
      const mobileConnector = {
        getUri: shouldUseWalletConnect ? getUriMobile : void 0
      };
      let qrConnector = void 0;
      if (shouldUseWalletConnect) {
        qrConnector = {
          getUri: getUriQR,
          instructions: {
            learnMoreUrl: "https://trustwallet.com/",
            steps: [
              {
                description: "Put Trust Wallet on your home screen for faster access to your wallet.",
                step: "install",
                title: "Open the Trust Wallet app"
              },
              {
                description: "Create a new wallet or import an existing one.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "Choose New Connection, then scan the QR code and confirm the prompt to connect.",
                step: "scan",
                title: "Tap WalletConnect in Settings"
              }
            ]
          }
        };
      }
      const extensionConnector = {
        instructions: {
          learnMoreUrl: "https://trustwallet.com/browser-extension",
          steps: [
            {
              description: "Click at the top right of your browser and pin Trust Wallet for easy access.",
              step: "install",
              title: "Install the Trust Wallet extension"
            },
            {
              description: "Create a new wallet or import an existing one.",
              step: "create",
              title: "Create or Import a wallet"
            },
            {
              description: "Once you set up Trust Wallet, click below to refresh the browser and load up the extension.",
              step: "refresh",
              title: "Refresh your browser"
            }
          ]
        }
      };
      return {
        connector,
        mobile: mobileConnector,
        qrCode: qrConnector,
        extension: extensionConnector
      };
    }
  };
};

export {
  trustWallet
};
