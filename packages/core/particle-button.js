// "use client";
// var __accessCheck = (obj, member, msg) => {
//   if (!member.has(obj)) throw TypeError("Cannot " + msg);
// };
// var __privateGet = (obj, member, getter) => {
//   __accessCheck(obj, member, "read from private field");
//   return getter ? getter.call(obj) : member.get(obj);
// };
// var __privateAdd = (obj, member, value) => {
//   if (member.has(obj))
//     throw TypeError("Cannot add the same private member more than once");
//   member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
// };

// // src/index.ts
// import debounce from "lodash/debounce.js";

// // src/utils.ts
// var isServer = () => {
//   return typeof window === "undefined";
// };
// function isNullish(x) {
//   return x === void 0 || x === null;
// }

// // src/config.ts
// var _devEnv, _stagingEnv, _productionEnv;
// var GlobalConfig = class {
//   constructor() {
//     __privateAdd(this, _devEnv, {
//       walletUrl: "https://wallet-debug.particle.network",
//     });
//     __privateAdd(this, _stagingEnv, {
//       walletUrl: "https://wallet-staging.particle.network",
//     });
//     __privateAdd(this, _productionEnv, {
//       walletUrl: "https://wallet.particle.network",
//     });
//   }
//   get env() {
//     if (!isServer() && window.__PARTICLE_ENVIRONMENT__ === "development") {
//       return __privateGet(this, _devEnv);
//     } else if (!isServer() && window.__PARTICLE_ENVIRONMENT__ === "staging") {
//       return __privateGet(this, _stagingEnv);
//     } else {
//       return __privateGet(this, _productionEnv);
//     }
//   }
// };
// _devEnv = new WeakMap();
// _stagingEnv = new WeakMap();
// _productionEnv = new WeakMap();
// var globalConfig = new GlobalConfig();
// var config_default = globalConfig;

// // src/html.ts
// var html = `
//   <button class="particle-pwe-btn">
//     <img class="particle-pwe-img particle-pwe-wallet-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" alt="" />
//     <img class="particle-pwe-img particle-pwe-down-arrow particle-pwe-down-arrow-hide" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" alt="" />
//   </button>
//   <div class="particle-pwe-iframe-content">
//   </div>
// `;
// var walletEntryRender = () => {
//   const className = "particle-wallet-entry-container";
//   const el = document.querySelector("." + className);
//   el && el.remove();
//   const EL = document.createElement("div");
//   EL.classList.add(className);
//   EL.innerHTML = html;
//   document.body.appendChild(EL);
// };
// var html_default = walletEntryRender;

// // src/iconsBase64.ts
// var walletIconDarkBase64 =
//   "data:image/png;base64,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";
// var downArrowDarkBase64 =
//   "data:image/png;base64,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";

// // src/messageHandler.ts
// import sha256 from "crypto-js/sha256.js";
// import stringify from "fast-json-stable-stringify";
// import { v4 as uuid } from "uuid";

// // src/types.ts
// var IframeWalletMessageType = "particle-auth-core-iframe-wallet-message";
// var walletIframeId = "particle-auth-core-iframe-wallet";
// var EntryPosition = /* @__PURE__ */ ((EntryPosition2) => {
//   EntryPosition2["BR"] = "bottom-right";
//   EntryPosition2["BL"] = "bottom-left";
//   EntryPosition2["TR"] = "top-right";
//   EntryPosition2["TL"] = "top-left";
//   return EntryPosition2;
// })(EntryPosition || {});

// // src/messageHandler.ts
// var walletPluginIds = [walletIframeId];
// function checkMessage(message) {
//   const { id, messageType, data } = message;
//   const { nonce, date, hash, iframeId } = JSON.parse(
//     Buffer.from(id, "base64").toString()
//   );
//   const hashBody = stringify({
//     state: { nonce, date, iframeId },
//     messageType,
//     data,
//   });
//   const hashValue = sha256(hashBody).toString();
//   if (hashValue === hash) {
//     return {
//       state: { nonce, date, hash, iframeId },
//       messageType,
//       data,
//     };
//   }
// }
// function buildMessage(data, messageType, nonce) {
//   const state = {
//     nonce: nonce || uuid(),
//     date: Date.now(),
//   };
//   const hashValue = sha256(
//     stringify({
//       state,
//       messageType,
//       data,
//     })
//   )
//     .toString()
//     .toLowerCase();
//   const id = Buffer.from(
//     JSON.stringify({
//       ...state,
//       hash: hashValue,
//     })
//   ).toString("base64");
//   return {
//     id,
//     messageType,
//     data,
//   };
// }
// var handleEthereumRpc = async (data, provider) => {
//   if (!provider) {
//     throw {
//       code: 4200,
//       message: "Wallet plugin not support EVM chains.",
//     };
//   }
//   const result = await provider.request(data);
//   return result;
// };
// var handleSolanaRpc = async (data, solana) => {
//   if (!solana) {
//     throw {
//       code: 4200,
//       message: "Wallet plugin not support Solana chains.",
//     };
//   }
//   if (data.method === "solana_requestAccounts") {
//     const publicAddress = solana.selectedAddress;
//     if (!publicAddress) {
//       await solana.connect();
//     }
//     return solana.selectedAddress;
//   } else if (data.method === "solana_chainId") {
//     return solana.chainId;
//   } else if (data.method === "solana_signTransaction") {
//     const { VersionedTransaction } = await import("@solana/web3.js");
//     const result = await solana.signTransaction(
//       VersionedTransaction.deserialize(Buffer.from(data.params[0], "base64")),
//       data.chainId
//     );
//     return Buffer.from(result.serialize()).toString("base64");
//   } else if (data.method === "solana_signAllTransactions") {
//     const { VersionedTransaction } = await import("@solana/web3.js");
//     const txs = data.params[0].map((tx) =>
//       VersionedTransaction.deserialize(Buffer.from(tx, "base64"))
//     );
//     const result = await solana.signAllTransactions(txs, data.chainId);
//     return result.map((tx) => Buffer.from(tx.serialize()).toString("base64"));
//   } else if (data.method === "solana_signAndSendTransaction") {
//     const { VersionedTransaction } = await import("@solana/web3.js");
//     const result = await solana.signAndSendTransaction(
//       VersionedTransaction.deserialize(Buffer.from(data.params[0], "base64")),
//       data.chainId
//     );
//     return result;
//   } else if (data.method === "solana_signMessage") {
//     const result = await solana.signMessage(
//       Buffer.from(data.params[0], "base64")
//     );
//     return Buffer.from(result).toString("base64");
//   } else if (data.method === "solana_switchChain") {
//     if (!solana.switchChain) {
//       throw {
//         code: 4200,
//         message: "Solana Wallet not support switch chain.",
//       };
//     }
//     await solana.switchChain(data.params[0]);
//   }
// };
// var handleRpc = async (event, walletCore) => {
//   var _a, _b, _c;
//   const messageBody = checkMessage(
//     (_a = event.data) == null ? void 0 : _a.message
//   );
//   if (messageBody) {
//     if (!walletPluginIds.includes(messageBody.state.iframeId)) {
//       walletPluginIds.push(messageBody.state.iframeId);
//     }
//     let message;
//     try {
//       let result;
//       if (messageBody.messageType === "ethereum-rpc" /* EthereumRpc */) {
//         result = await handleEthereumRpc(messageBody.data, walletCore.ethereum);
//       } else {
//         result = await handleSolanaRpc(messageBody.data, walletCore.solana);
//       }
//       message = buildMessage(
//         { result },
//         messageBody.messageType,
//         messageBody.state.nonce
//       );
//     } catch (error) {
//       message = buildMessage(
//         {
//           error: {
//             message: error.message || error.stack || error.toString(),
//             code: error.code,
//           },
//         },
//         messageBody.messageType,
//         messageBody.state.nonce
//       );
//     }
//     (_c =
//       (_b = window.document.getElementById(messageBody.state.iframeId)) == null
//         ? void 0
//         : _b.contentWindow) == null
//       ? void 0
//       : _c.postMessage(
//           {
//             type: IframeWalletMessageType,
//             message,
//           },
//           "*"
//         );
//   } else {
//   }
// };
// var handleCustomEvent = async (event, customEventHandler) => {
//   var _a, _b, _c;
//   const messageBody = checkMessage(
//     (_a = event.data) == null ? void 0 : _a.message
//   );
//   if (messageBody) {
//     if (!walletPluginIds.includes(messageBody.state.iframeId)) {
//       walletPluginIds.push(messageBody.state.iframeId);
//     }
//     let message;
//     try {
//       if (!customEventHandler) {
//         message = buildMessage(
//           {
//             error: {
//               code: 4200,
//               message: "Wallet plugin not support custom event.",
//             },
//           },
//           messageBody.messageType,
//           messageBody.state.nonce
//         );
//       } else {
//         const result = await customEventHandler(
//           messageBody.messageType,
//           messageBody.data
//         );
//         message = buildMessage(
//           { result },
//           messageBody.messageType,
//           messageBody.state.nonce
//         );
//       }
//     } catch (error) {
//       message = buildMessage(
//         {
//           error: {
//             message: error.message || error.stack || error.toString(),
//             code: error.code,
//           },
//         },
//         messageBody.messageType,
//         messageBody.state.nonce
//       );
//     }
//     (_c =
//       (_b = window.document.getElementById(messageBody.state.iframeId)) == null
//         ? void 0
//         : _b.contentWindow) == null
//       ? void 0
//       : _c.postMessage(
//           {
//             type: IframeWalletMessageType,
//             message,
//           },
//           "*"
//         );
//   } else {
//   }
// };
// var sendEthereumEvent = (event, args) => {
//   var _a, _b;
//   const message = buildMessage(
//     { name: event, args },
//     "ethereum-event" /* EthereumEvent */
//   );
//   for (const iframeId of walletPluginIds) {
//     (_b =
//       (_a = window.document.getElementById(iframeId)) == null
//         ? void 0
//         : _a.contentWindow) == null
//       ? void 0
//       : _b.postMessage(
//           {
//             type: IframeWalletMessageType,
//             message,
//           },
//           "*"
//         );
//   }
// };

// // src/style.ts
// var style = `
// .particle-wallet-entry-container .particle-pwe-btn {
//   background: none;
//   border: none;
//   cursor: pointer;
//   height: 60px;
//   margin: 0;
//   outline: none;
//   padding: 0;
//   position: fixed;
//   width: 60px;
//   border-radius: 60px;
//   z-index: 1000;
// }
// .particle-wallet-entry-container .particle-pwe-btn:not(.is-dragging) {
//   -webkit-transition: all 0.2s;
//   transition: all 0.2s;
// }
// .particle-wallet-entry-container .particle-pwe-btn > img {
//   height: 100%;
//   width: 100%;
//   -webkit-box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.1);
//   box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.1);
//   border-radius: 60px;
// }
// .particle-wallet-entry-container .particle-pwe-btn .particle-pwe-wallet-icon {
//   display: block;
// }
// .particle-wallet-entry-container .particle-pwe-btn .particle-pwe-wallet-icon:not(.particle-pwe-wallet-icon-hide) {
//   -webkit-animation: particle-pwe-wallet-icon-show 0.3s ease-in-out;
//           animation: particle-pwe-wallet-icon-show 0.3s ease-in-out;
// }
// @-webkit-keyframes particle-pwe-wallet-icon-show {
//   0% {
//     -webkit-transform: scale(0.8);
//             transform: scale(0.8);
//   }
//   100% {
//     -webkit-transform: scale(1);
//             transform: scale(1);
//   }
// }
// @keyframes particle-pwe-wallet-icon-show {
//   0% {
//     -webkit-transform: scale(0.6);
//             transform: scale(0.6);
//   }
//   100% {
//     -webkit-transform: scale(1);
//             transform: scale(1);
//   }
// }
// .particle-wallet-entry-container .particle-pwe-btn .particle-pwe-wallet-icon.particle-pwe-wallet-icon-hide {
//   display: none;
// }
// .particle-wallet-entry-container .particle-pwe-btn .particle-pwe-down-arrow {
//   display: block;
// }
// .particle-wallet-entry-container .particle-pwe-btn .particle-pwe-down-arrow:not(.particle-pwe-down-arrow-hide) {
//   -webkit-animation: particle-pwe-down-arrow-show 0.3s ease-in-out;
//           animation: particle-pwe-down-arrow-show 0.3s ease-in-out;
// }
// @-webkit-keyframes particle-pwe-down-arrow-show {
//   0% {
//     -webkit-transform: scale(0.6);
//             transform: scale(0.6);
//   }
//   100% {
//     -webkit-transform: scale(1);
//             transform: scale(1);
//   }
// }
// @keyframes particle-pwe-down-arrow-show {
//   0% {
//     -webkit-transform: scale(0.6);
//             transform: scale(0.6);
//   }
//   100% {
//     -webkit-transform: scale(1);
//             transform: scale(1);
//   }
// }
// .particle-wallet-entry-container .particle-pwe-btn .particle-pwe-down-arrow.particle-pwe-down-arrow-hide {
//   display: none;
// }
// .particle-wallet-entry-container .particle-pwe-iframe-content {
//   background-color: #fff;
//   border: none;
//   border-radius: 10px;
//   -webkit-box-shadow: -1px 3px 11px 2px #00000073;
//           box-shadow: -1px 3px 11px 2px #00000073;
//   display: none;
//   height: 650px;
//   overflow: hidden;
//   position: fixed;
//   width: 400px;
//   z-index: 10000;
// }
// .particle-wallet-entry-container .particle-pwe-iframe-content.particle-pwe-full-screen-iframe-content {
//   top: 0 !important;
//   left: 0 !important;
//   width: 100% !important;
//   height: 100% !important;
//   border-radius: 0 !important;
// }
// @media screen and (max-height: 660px) {
//   .particle-wallet-entry-container .particle-pwe-iframe-content {
//     height: 600px;
//     width: 360px;
//   }
// }
// .particle-wallet-entry-container .particle-pwe-iframe-content.particle-pwe-iframe-content-show {
//   display: block;
// }
// .particle-pwe-iframe-content-dark{
//   background-color: #000 !important;
// }
// .particle-pwe-iframe-content-light{
//   background-color: #fff !important;
// }
// .particle-wallet-entry-container .particle-pwe-iframe-content .particle-pwe-iframe {
//   border: none;
//   height: 100%;
//   width: 100%;
// }

// `;
// var renderStyle = () => {
//   const className = "particle-wallet-entry-style";
//   const el = document.querySelector("." + className);
//   el && el.remove();
//   const styleEl = document.createElement("style");
//   styleEl.classList.add(className);
//   styleEl.innerHTML = style;
//   document.head.appendChild(styleEl);
// };
// var style_default = renderStyle;

// // src/index.ts
// var fullScreenClass = "particle-pwe-full-screen-iframe-content";
// var isListen = false;
// var timer = null;
// var draggie;
// var _onMessage, _onEthereumAccountsChanged, _onEthereumChainChanged;
// var _WalletEntryPlugin = class {
//   constructor() {
//     __privateAdd(this, _onMessage, (event) => {
//       var _a, _b, _c;
//       if (
//         ((_a = event.data) == null ? void 0 : _a.type) ===
//         IframeWalletMessageType
//       ) {
//         if (!this.walletCore) {
//           throw new Error("Please init wallet entry plugin first!");
//         }
//         const messageType =
//           (_c = (_b = event.data) == null ? void 0 : _b.message) == null
//             ? void 0
//             : _c.messageType;
//         if (
//           messageType === "ethereum-rpc" /* EthereumRpc */ ||
//           messageType === "solana-rpc" /* SolanaRpc */
//         ) {
//           handleRpc(event, this.walletCore);
//         } else {
//           handleCustomEvent(event, this.customEventHandler);
//         }
//       }
//     });
//     __privateAdd(this, _onEthereumAccountsChanged, (args) => {
//       sendEthereumEvent("accountsChanged", args);
//     });
//     __privateAdd(this, _onEthereumChainChanged, (args) => {
//       sendEthereumEvent("chainChanged", args);
//     });
//     if (typeof window !== "undefined") {
//       window.addEventListener("message", (event) => {
//         var _a, _b, _c;
//         if (
//           ((_a = event == null ? void 0 : event.data) == null
//             ? void 0
//             : _a.name) === "particle-network-wallet"
//         ) {
//           const type =
//             (_c =
//               (_b = event == null ? void 0 : event.data) == null
//                 ? void 0
//                 : _b.data) == null
//               ? void 0
//               : _c.type;
//           if (type === "logout") {
//             this.walletEntryDestroy();
//           }
//         }
//       });
//     }
//   }
//   init(projectConfig, options) {
//     var _a;
//     this.projectConfig = projectConfig;
//     this.walletEntryOptions = {
//       entryPosition: "bottom-right" /* BR */,
//       preload: false,
//       themeType: "light",
//       ...(options || {}),
//       visible:
//         (_a = options == null ? void 0 : options.visible) != null ? _a : true,
//     };
//     this.destroy();
//     if (typeof window !== "undefined") {
//       window.removeEventListener("message", __privateGet(this, _onMessage));
//       window.addEventListener("message", __privateGet(this, _onMessage));
//     }
//   }
//   setWalletCore(walletCore, customEventHandler) {
//     var _a, _b;
//     if (!walletCore.ethereum && !walletCore.solana) {
//       throw new Error("Please provide ethereum or solana wallet!");
//     }
//     if (this.walletCore) {
//       (_a = this.walletCore.ethereum) == null
//         ? void 0
//         : _a.removeListener(
//             "accountsChanged",
//             __privateGet(this, _onEthereumAccountsChanged)
//           );
//       (_b = this.walletCore.ethereum) == null
//         ? void 0
//         : _b.removeListener(
//             "chainChanged",
//             __privateGet(this, _onEthereumChainChanged)
//           );
//     }
//     this.walletCore = walletCore;
//     this.customEventHandler = customEventHandler;
//     if (this.walletCore.ethereum) {
//       this.walletCore.ethereum.removeListener(
//         "accountsChanged",
//         __privateGet(this, _onEthereumAccountsChanged)
//       );
//       this.walletCore.ethereum.on(
//         "accountsChanged",
//         __privateGet(this, _onEthereumAccountsChanged)
//       );
//       this.walletCore.ethereum.removeListener(
//         "chainChanged",
//         __privateGet(this, _onEthereumChainChanged)
//       );
//       this.walletCore.ethereum.on(
//         "chainChanged",
//         __privateGet(this, _onEthereumChainChanged)
//       );
//     }
//   }
//   walletEntryCreate() {
//     this.destroy();
//     this.walletEntryRander();
//   }
//   walletEntryDestroy() {
//     this.destroy();
//   }
//   getWalletUrl(options) {
//     var _a;
//     if (!this.projectConfig) {
//       throw new Error("Please init wallet entry plugin first!");
//     }
//     const { pathName = "/", query = {} } = options || {};
//     let url = `${config_default.env.walletUrl}${pathName}?iframeid=${walletIframeId}&${JSON.stringify(
//       query
//     )
//       .replace(/[{}"]/g, "")
//       .split(",")
//       .filter((value) => !!(value == null ? void 0 : value.trim()))
//       .map((keyValue) => {
//         const [key, value] = keyValue.split(":");
//         return `${encodeURIComponent(key)}=${encodeURIComponent(value.trim())}`;
//       })
//       .join("&")}`;
//     const { projectId, clientKey, appId } = this.projectConfig;
//     const { erc4337, language, themeType, customStyle } =
//       this.walletEntryOptions;
//     const topMenuType =
//       (options == null ? void 0 : options.topMenuType) ||
//       ((_a = this.walletEntryOptions) == null ? void 0 : _a.topMenuType);
//     url += `&projectConfig=${encodeURIComponent(
//       Buffer.from(JSON.stringify({ projectId, clientKey, appId })).toString(
//         "base64"
//       )
//     )}`;
//     if (themeType) {
//       url += "&theme=" + themeType;
//     }
//     if (language) {
//       url += "&language=" + language;
//     }
//     if (erc4337) {
//       url += `&erc4337=${encodeURIComponent(JSON.stringify(erc4337))}`;
//     }
//     if (topMenuType) {
//       url += `&topMenuType=${topMenuType}`;
//     }
//     if (customStyle) {
//       let supportChains = customStyle.supportChains;
//       if (supportChains) {
//         supportChains = supportChains.map((chain) => {
//           return {
//             name: chain.name,
//             id: chain.id,
//           };
//         });
//       }
//       url += `&customStyle=${encodeURIComponent(
//         Buffer.from(JSON.stringify({ ...customStyle, supportChains })).toString(
//           "base64"
//         )
//       )}`;
//     }
//     return url;
//   }
//   openWallet(params) {
//     var _a, _b, _c, _d, _e;
//     const url = this.getWalletUrl(params);
//     const walletIcon = document.querySelector(".particle-pwe-wallet-icon");
//     const downArrow = document.querySelector(".particle-pwe-down-arrow");
//     const iframeContent = document.querySelector(
//       ".particle-pwe-iframe-content"
//     );
//     if (
//       (params == null ? void 0 : params.windowSize) === "large" ||
//       window.screen.width < 600
//     ) {
//       iframeContent == null
//         ? void 0
//         : iframeContent.classList.add(fullScreenClass);
//     }
//     const modalBorderRadius =
//       ((_d =
//         (_c =
//           (_a = this.walletEntryOptions) == null ? void 0 : _a.customStyle) ==
//         null
//           ? void 0
//           : _c[
//               ((_b = this.walletEntryOptions) == null
//                 ? void 0
//                 : _b.themeType) || "light"
//             ]) == null
//         ? void 0
//         : _d.cardBorderRadius) || 18;
//     if (!isNullish(modalBorderRadius)) {
//       iframeContent.style.borderRadius = `${modalBorderRadius}px`;
//     }
//     iframeContent == null
//       ? void 0
//       : iframeContent.classList.add("particle-pwe-iframe-content-show");
//     const uiMode =
//       ((_e = this.walletEntryOptions) == null ? void 0 : _e.themeType) ||
//       "light";
//     if (uiMode == "dark") {
//       iframeContent == null
//         ? void 0
//         : iframeContent.classList.add("particle-pwe-iframe-content-dark");
//       iframeContent == null
//         ? void 0
//         : iframeContent.classList.remove("particle-pwe-iframe-content-light");
//     } else {
//       iframeContent == null
//         ? void 0
//         : iframeContent.classList.add("particle-pwe-iframe-content-light");
//       iframeContent == null
//         ? void 0
//         : iframeContent.classList.remove("particle-pwe-iframe-content-dark");
//     }
//     let iframe = document.querySelector(".particle-pwe-iframe");
//     if (
//       (iframe == null ? void 0 : iframe.src) &&
//       new URLSearchParams(iframe == null ? void 0 : iframe.src).get("theme") !==
//         uiMode
//     ) {
//       iframe.remove();
//       iframe = null;
//     }
//     if (!iframe) {
//       iframe = document.createElement("iframe");
//       iframe.className = "particle-pwe-iframe";
//       iframe.allow = "camera";
//       iframeContent == null ? void 0 : iframeContent.appendChild(iframe);
//       iframe.src = url;
//       iframe.id = walletIframeId;
//     } else if (iframe.getAttribute("src") !== url) {
//       iframe.remove();
//       iframe = document.createElement("iframe");
//       iframe.className = "particle-pwe-iframe";
//       iframe.allow = "camera";
//       iframeContent == null ? void 0 : iframeContent.appendChild(iframe);
//       iframe.src = url;
//       iframe.id = walletIframeId;
//     }
//     walletIcon == null
//       ? void 0
//       : walletIcon.classList.add("particle-pwe-wallet-icon-hide");
//     downArrow == null
//       ? void 0
//       : downArrow.classList.remove("particle-pwe-down-arrow-hide");
//     this.updateIframeContentPosition();
//   }
//   setWalletIcon() {
//     const walletIconEl = document.querySelector(".particle-pwe-wallet-icon");
//     const downArrowEl = document.querySelector(".particle-pwe-down-arrow");
//     walletIconEl && walletIconEl.setAttribute("src", walletIconDarkBase64);
//     downArrowEl && downArrowEl.setAttribute("src", downArrowDarkBase64);
//   }
//   updateIframeContentPosition() {
//     var _a, _b;
//     const iframeContent = document.querySelector(
//       ".particle-pwe-iframe-content"
//     );
//     if (
//       !iframeContent ||
//       ((_a = iframeContent == null ? void 0 : iframeContent.style) == null
//         ? void 0
//         : _a.display) === "none"
//     ) {
//       return;
//     }
//     const walletBtn = document.querySelector(".particle-pwe-btn");
//     if (!((_b = this.walletEntryOptions) == null ? void 0 : _b.visible)) {
//       walletBtn.style.display = "none";
//     }
//     const walletBtnRect = walletBtn.getBoundingClientRect();
//     const iframeContentRect = iframeContent.getBoundingClientRect();
//     const windowHeight = window.innerHeight;
//     const windowWidth = window.innerWidth;
//     const iframeContentHeight = iframeContentRect.height;
//     const iframeContentWidth = iframeContentRect.width;
//     const walletBtnHeight = walletBtnRect.height;
//     const walletBtnTop = walletBtnRect.top;
//     const walletBtnLeft = walletBtnRect.left;
//     const walletBtnBottom = walletBtnRect.bottom;
//     const walletBtnRight = walletBtnRect.right;
//     if (
//       walletBtnBottom + iframeContentHeight + 10 < windowHeight &&
//       walletBtnRight + iframeContentWidth + 10 < windowWidth
//     ) {
//       iframeContent.style.top = walletBtnBottom + 10 + "px";
//       iframeContent.style.left = walletBtnLeft + "px";
//     } else if (
//       walletBtnBottom + iframeContentHeight + 10 < windowHeight &&
//       walletBtnLeft - iframeContentWidth - 10 > 0
//     ) {
//       iframeContent.style.top = walletBtnBottom + 10 + "px";
//       iframeContent.style.left = walletBtnRight - iframeContentWidth + "px";
//     } else if (
//       walletBtnTop - iframeContentHeight - 10 > 0 &&
//       walletBtnRight + iframeContentWidth + 10 < windowWidth
//     ) {
//       iframeContent.style.top = walletBtnTop - iframeContentHeight - 10 + "px";
//       iframeContent.style.left = walletBtnLeft + "px";
//     } else if (
//       walletBtnTop - iframeContentHeight - 10 > 0 &&
//       walletBtnLeft - iframeContentWidth - 10 > 0
//     ) {
//       iframeContent.style.top = walletBtnTop - iframeContentHeight - 10 + "px";
//       iframeContent.style.left = walletBtnRight - iframeContentWidth + "px";
//     } else if (walletBtnRight + iframeContentWidth + 10 < windowWidth) {
//       const top = walletBtnTop + walletBtnHeight / 2 - iframeContentHeight / 2;
//       iframeContent.style.top =
//         top < 30
//           ? 30 + "px"
//           : top > windowHeight - iframeContentHeight - 30
//             ? windowHeight - iframeContentHeight - 30 + "px"
//             : top + "px";
//       iframeContent.style.left = walletBtnRight + 10 + "px";
//     } else if (walletBtnLeft - iframeContentWidth - 10 > 0) {
//       const top = walletBtnTop + walletBtnHeight / 2 - iframeContentHeight / 2;
//       iframeContent.style.top =
//         top < 30
//           ? 30 + "px"
//           : top > windowHeight - iframeContentHeight - 30
//             ? windowHeight - iframeContentHeight - 30 + "px"
//             : top + "px";
//       iframeContent.style.left = walletBtnLeft - iframeContentWidth - 10 + "px";
//     } else {
//     }
//   }
//   setButtonStorageData(data) {
//     const { innerWidth, innerHeight } = window;
//     const position =
//       this.walletEntryOptions.entryPosition || "bottom-right"; /* BR */
//     localStorage.setItem(
//       _WalletEntryPlugin.WALLET_BTN_POSITION,
//       `${data.x},${data.y},${data.direction},${position}`
//     );
//     localStorage.setItem(
//       _WalletEntryPlugin.WALLET_BTN_POSITION + "_window",
//       `${innerWidth},${innerHeight}`
//     );
//   }
//   getButtonStorageData() {
//     var _a, _b, _c, _d;
//     const { innerWidth, innerHeight } = window;
//     const [x, y, direction = "right", position] =
//       ((_b =
//         (_a =
//           localStorage == null
//             ? void 0
//             : localStorage.getItem(_WalletEntryPlugin.WALLET_BTN_POSITION)) ==
//         null
//           ? void 0
//           : _a.split) == null
//         ? void 0
//         : _b.call(_a, ",")) || [];
//     let [width, height] =
//       ((_d =
//         (_c = localStorage.getItem(
//           _WalletEntryPlugin.WALLET_BTN_POSITION + "_window"
//         )) == null
//           ? void 0
//           : _c.split) == null
//         ? void 0
//         : _d.call(_c, ",")) || [];
//     width = Number(width || 0);
//     height = Number(height || 0);
//     if (width && height && (width != innerWidth || height != innerHeight)) {
//       localStorage.removeItem(_WalletEntryPlugin.WALLET_BTN_POSITION);
//       localStorage.removeItem(
//         _WalletEntryPlugin.WALLET_BTN_POSITION + "_window"
//       );
//       return {
//         x: innerWidth,
//         y: innerHeight,
//         position:
//           position ||
//           this.walletEntryOptions.entryPosition ||
//           "bottom-right" /* BR */,
//         direction: "right",
//       };
//     }
//     return {
//       x: Number(x) || 0,
//       y: Number(y) || 0,
//       position:
//         position ||
//         this.walletEntryOptions.entryPosition ||
//         "bottom-right" /* BR */,
//       direction,
//     };
//   }
//   updateWalletBtnPosition(x, y, type = "") {
//     const { width } = document.body.getBoundingClientRect();
//     const { direction } = this.getButtonStorageData();
//     const isRight =
//       x > width / 2 || (type == "windowResize" && direction === "right");
//     let left = isRight ? width - 60 : 0;
//     let top = y;
//     let newDirection = "left";
//     const safeDistance = window.screen.width > 600 ? 30 : 10;
//     if (left < safeDistance) {
//       left = safeDistance;
//       newDirection = "left";
//     } else if (left > width - (60 + safeDistance)) {
//       left = width - (60 + safeDistance);
//       newDirection = "right";
//     }
//     if (top < safeDistance) {
//       top = safeDistance;
//     } else if (top > window.innerHeight - (60 + safeDistance)) {
//       top = window.innerHeight - (60 + safeDistance);
//     }
//     return {
//       left,
//       top,
//       direction: newDirection,
//     };
//   }
//   closeWallet() {
//     const iframeContent = document.querySelector(
//       ".particle-pwe-iframe-content"
//     );
//     iframeContent == null
//       ? void 0
//       : iframeContent.classList.remove("particle-pwe-iframe-content-show");
//     iframeContent == null
//       ? void 0
//       : iframeContent.classList.remove(fullScreenClass);
//     const walletIcon = document.querySelector(".particle-pwe-wallet-icon");
//     const downArrow = document.querySelector(".particle-pwe-down-arrow");
//     walletIcon == null
//       ? void 0
//       : walletIcon.classList.remove("particle-pwe-wallet-icon-hide");
//     downArrow == null
//       ? void 0
//       : downArrow.classList.add("particle-pwe-down-arrow-hide");
//   }
//   resize() {
//     const that = this;
//     return () => {
//       if (isServer()) return;
//       clearTimeout(timer);
//       timer = setTimeout(() => {
//         localStorage.removeItem(_WalletEntryPlugin.WALLET_BTN_POSITION);
//         const walletBtn = document.querySelector(".particle-pwe-btn");
//         const { x: btnX, y: btnY } = this.getButtonStorageData();
//         const x = btnX || window.innerWidth;
//         const y = btnY || window.innerHeight;
//         const { left, top, direction } = that.updateWalletBtnPosition(
//           x,
//           y,
//           "windowResize"
//         );
//         if (walletBtn) {
//           walletBtn.style.left = left + "px";
//           walletBtn.style.top = top + "px";
//         }
//         this.setButtonStorageData({
//           x,
//           y,
//           direction,
//         });
//         that.updateIframeContentPosition();
//         (async () => {
//           let count = 0;
//           do {
//             count++;
//             await this.sleep(100);
//             this.updateIframeContentPosition();
//           } while (count < 15);
//         })();
//       }, 10);
//     };
//   }
//   async sleep(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }
//   preload() {
//     const url = config_default.env.walletUrl;
//     const script = document.createElement("script");
//     script.src = `${url}/preload.js?_=${Math.floor(Date.now() / 6e4) * 6e4}`;
//     script.setAttribute("data-target", "web-wallet");
//     document.body.appendChild(script);
//   }
//   async walletEntryRander() {
//     var _a;
//     if (isServer()) return;
//     style_default();
//     html_default();
//     this.setWalletIcon();
//     if (
//       ((_a = this.walletEntryOptions) == null ? void 0 : _a.preload) !== false
//     ) {
//       this.preload();
//     }
//     const walletBtn = document.querySelector(".particle-pwe-btn");
//     const { x: btnX, y: btnY } = this.getButtonStorageData();
//     if (btnX && btnY) {
//       if (
//         (Number(btnX) || 0) < window.innerWidth &&
//         (Number(btnY) || 0) < window.innerHeight
//       ) {
//         const { left, top } = this.updateWalletBtnPosition(
//           Number(btnX) || 0,
//           Number(btnY) || 0
//         );
//         walletBtn.style.left = left + "px";
//         walletBtn.style.top = top + "px";
//         this.updateIframeContentPosition();
//       } else {
//         const { left, top } = this.updateWalletBtnPosition(
//           window.innerWidth,
//           window.innerHeight
//         );
//         walletBtn.style.left = left + "px";
//         walletBtn.style.top = top + "px";
//         this.updateIframeContentPosition();
//       }
//     } else {
//       const position =
//         this.walletEntryOptions.entryPosition || "bottom-left"; /* BL */
//       let top, left;
//       if (position === "bottom-right" /* BR */) {
//         top = window.innerHeight;
//         left = window.innerWidth;
//       } else if (position === "top-right" /* TR */) {
//         top = 0;
//         left = window.innerWidth;
//       } else if (position === "top-left" /* TL */) {
//         top = 0;
//         left = 0;
//       } else {
//         top = window.innerHeight;
//         left = 0;
//       }
//       const positionData = this.updateWalletBtnPosition(left, top);
//       walletBtn.style.left = positionData.left + "px";
//       walletBtn.style.top = positionData.top + "px";
//       this.updateIframeContentPosition();
//     }
//     let isDraggie = false;
//     const Draggabilly = (await import("draggabilly")).default;
//     draggie = new Draggabilly(walletBtn);
//     draggie.on("dragStart", () => {
//       isDraggie = true;
//       walletBtn.style.cursor = "move";
//     });
//     draggie.on("dragMove", () => {
//       this.updateIframeContentPosition();
//     });
//     draggie.on("dragEnd", (event, pointer) => {
//       event.stopPropagation();
//       walletBtn.style.cursor = "pointer";
//       const { clientX: x, clientY: y } = pointer;
//       const { left, top, direction } = this.updateWalletBtnPosition(x, y - 35);
//       walletBtn.style.left = left + "px";
//       walletBtn.style.top = top + "px";
//       this.updateIframeContentPosition();
//       (async () => {
//         let count = 0;
//         do {
//           count++;
//           await this.sleep(20);
//           this.updateIframeContentPosition();
//         } while (count < 70);
//       })();
//       this.setButtonStorageData({
//         x: left,
//         y: top,
//         direction,
//       });
//       setTimeout(() => {
//         isDraggie = false;
//       }, 50);
//     });
//     const controlIframe = debounce(() => {
//       var _a2, _b;
//       if (!isDraggie) {
//         const iframeContent = document.querySelector(
//           ".particle-pwe-iframe-content"
//         );
//         if (
//           (_b =
//             (_a2 = iframeContent == null ? void 0 : iframeContent.classList) ==
//             null
//               ? void 0
//               : _a2.contains) == null
//             ? void 0
//             : _b.call(_a2, "particle-pwe-iframe-content-show")
//         ) {
//           this.closeWallet();
//         } else {
//           this.openWallet();
//         }
//       }
//     }, 30);
//     walletBtn.addEventListener("touchend", (event) => {
//       setTimeout(() => {
//         controlIframe();
//       });
//     });
//     walletBtn.addEventListener("click", (event) => {
//       var _a2;
//       (_a2 = event == null ? void 0 : event.stopPropagation) == null
//         ? void 0
//         : _a2.call(event);
//       setTimeout(() => {
//         controlIframe();
//       });
//     });
//     window.walletEntryPlugin = this;
//     if (!isListen) {
//       isListen = true;
//       window.addEventListener(
//         "resize",
//         window.walletEntryPlugin.resize(),
//         false
//       );
//       window.addEventListener(
//         "message",
//         (events) => {
//           var _a2, _b, _c, _d, _e, _f;
//           if (
//             ((_a2 = events == null ? void 0 : events.data) == null
//               ? void 0
//               : _a2.type) === "PARTICLE_WALLET_RESIZE_IFRAME"
//           ) {
//             const walletEntryPlugin2 = window.walletEntryPlugin;
//             const iframeContent = document.querySelector(
//               ".particle-pwe-iframe-content"
//             );
//             const classList =
//               iframeContent == null ? void 0 : iframeContent.classList;
//             if (
//               (_b = classList == null ? void 0 : classList.contains) == null
//                 ? void 0
//                 : _b.call(classList, fullScreenClass)
//             ) {
//               if (
//                 !((_c = this.walletEntryOptions) == null
//                   ? void 0
//                   : _c.visible) ||
//                 window.screen.width < 600
//               ) {
//                 walletEntryPlugin2.closeWallet();
//               } else {
//                 (_d = classList == null ? void 0 : classList.remove) == null
//                   ? void 0
//                   : _d.call(classList, fullScreenClass);
//                 walletEntryPlugin2.resize();
//                 walletEntryPlugin2.updateIframeContentPosition();
//               }
//             } else {
//               (_e = classList == null ? void 0 : classList.add) == null
//                 ? void 0
//                 : _e.call(classList, fullScreenClass);
//             }
//           } else if (
//             ((_f = events == null ? void 0 : events.data) == null
//               ? void 0
//               : _f.type) === "PARTICLE_WALLET_CLOSE_IFRAME"
//           ) {
//             window.walletEntryPlugin.closeWallet();
//           }
//         },
//         false
//       );
//     }
//   }
//   destroy() {
//     var _a, _b, _c, _d;
//     if (isServer()) return;
//     (_a = draggie == null ? void 0 : draggie.destroy) == null
//       ? void 0
//       : _a.call(draggie);
//     window.removeEventListener(
//       "resize",
//       (_b = this == null ? void 0 : this.resize) == null
//         ? void 0
//         : _b.call(this),
//       false
//     );
//     (_d =
//       (_c = document.querySelector(".particle-wallet-entry-container")) == null
//         ? void 0
//         : _c.remove) == null
//       ? void 0
//       : _d.call(_c);
//   }
// };
// var WalletEntryPlugin = _WalletEntryPlugin;
// _onMessage = new WeakMap();
// _onEthereumAccountsChanged = new WeakMap();
// _onEthereumChainChanged = new WeakMap();
// WalletEntryPlugin.WALLET_BTN_POSITION = "walletBtnPosition";
// var walletEntryPlugin = new WalletEntryPlugin();
// export { EntryPosition, walletEntryPlugin };