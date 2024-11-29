import "./style.css";
import {
  CarvId,
  Enum_Env,
  Enum_CarvIdTheme,
  Enum_CarvIdIconPlacement,
  I_CarvIdOptions,
} from "@carvid/core"; //  从工作区引入（本地测试）
// } from "testcarvid"; // 从 NPM 包引入（NPM 包测试）
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const showToast = (text: string, duration = 2500) => {
  Toastify({
    text,
    duration,
    position: "center",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      borderRadius: "8px",
    },
  }).showToast();
};

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container">
    <h1 class="title">CARV ID SDK <span>Demo</span></h1>
    <div class="box-col config-box">
      <h3>🟢 SDK Config&nbsp;&nbsp;<a href="https://github.com/carv-protocol/carv-id-sdk/blob/main/README.md" target="_blank">📋 Documentation</a></h3>
      <textarea id="config" rows="10"></textarea>
    </div>
    <div class="btn-col">
      <button id="btn-initialize">🕹️ Initialize</button>
      <button disabled id="btn-authorize">🔑 Authorize</button>
      <button id="btn-reset">↪️ Reset</button>
    </div>
    <div class="box-col params-box">
      <h3>🔵 Start Params</h3>
      <pre id="start-params"></pre>
    </div>
    <div class="box-col status-box">
      <h3>🟡 SDK Status</h3>
      <div class="box-pre">
        <p id="sdk-status">❗Not active</p>
        <p id="sdk-version"></p>
      </div>
    </div>
    <div class="box-col result-box">
      <h3>🟡 Authorize Result</h3>
      <pre id="result"></pre>
    </div>
  </div>
`;

// 初始化 SDK
const initSDK = () => {
  const CONFIG_STORE_KEY = "carv_id_demo_config";
  const elBtnInitialize = document.querySelector(
    "#btn-initialize"
  ) as HTMLButtonElement;
  const elBtnAuthorize = document.querySelector(
    "#btn-authorize"
  ) as HTMLButtonElement;
  const elBtnReset = document.querySelector("#btn-reset") as HTMLButtonElement;
  const elConfig = document.querySelector("#config") as HTMLTextAreaElement;
  const elVersion = document.querySelector(
    "#sdk-version"
  ) as HTMLParagraphElement;
  const elStatus = document.querySelector(
    "#sdk-status"
  ) as HTMLParagraphElement;
  const elStartParams = document.querySelector(
    "#start-params"
  ) as HTMLPreElement;
  const elAuthorizeResult = document.querySelector("#result") as HTMLPreElement;

  // @ts-ignore
  const tgapp = window?.Telegram?.WebApp;
  const startParam = tgapp?.initDataUnsafe?.start_param;
  console.log("url >> ", window.location.href);
  console.log("startParam >> ", startParam);

  // 授权参数，接入方自行配置
  const authorizeConfig = {
    client_id: "0a17299349c4b3e57bc8c25581b01bd0ec80c279",
    client_secret:
      "871cc95ca5a54866492bb052e0d487799e21a5c5896b7cd2ecbe813876a4b286",
    response_type: "code",
    state: "test app state",
    scope: "carv_id_basic_read email_basic_read evm_address_basic_read",
    redirect_uri: "https://t.me/BabyChinBot/carv_id_demo",
  };

  const config: I_CarvIdOptions = {
    // @ts-ignore
    env: import.meta.env.VITE_APP_ENV === "dev" ? Enum_Env.DEV : Enum_Env.PROD,
    theme: Enum_CarvIdTheme.LIGHT,
    showWidget: true,
    widgetOptions: {
      size: "50px",
      rememberPosition: false,
      placement: Enum_CarvIdIconPlacement.BOTTOM_RIGHT,
      offset: {
        bottom: 80,
      },
    },
    authorizeConfig,
    // onLoad: (data) => {
    //   console.log("onLoad", data);
    //   elBtnAuthorize.innerText = "Authorize";
    //   elBtnAuthorize.removeAttribute("disabled");

    //   if (data.authCode) {
    //     elBtnAuthorize.innerText = "Authorized";
    //     elBtnAuthorize.setAttribute("disabled", "true");
    //     elAuthorizeResult.innerHTML = JSON.stringify(
    //       { code: data.authCode, state: "authenticate from cache" },
    //       null,
    //       2
    //     );
    //   }
    // },
    // onAuthSuccess: (res) => {
    //   console.log("onAuthSuccess", res);
    //   elBtnAuthorize.innerText = "Authorized";
    //   elBtnAuthorize.setAttribute("disabled", "true");
    //   elAuthorizeResult.innerHTML = JSON.stringify(res, null, 2);
    // },
    // onAuthFailed: (res) => {
    //   console.log("onAuthFailed", res);
    //   elBtnAuthorize.innerText = "Authorize failed";
    //   elBtnAuthorize.setAttribute("disabled", "false");
    //   elAuthorizeResult.innerHTML = JSON.stringify(res, null, 2);
    // },
  };

  // 初始化 CarvId 实例
  let CarvIdInstance: CarvId;
  const init = (config: I_CarvIdOptions, fromLocal = false) => {
    // 初始化前先清除旧的 widget
    const elWidget = document.querySelector("carv-id-widget");
    if (elWidget) {
      elWidget.parentNode?.removeChild(elWidget);
    }

    // 初始化 CarvId 实例
    CarvIdInstance = new CarvId(config);

    // @ts-ignore
    window.CarvIdInstance = CarvIdInstance;

    !fromLocal && showToast("👌🏻 SDK Initialized");
    console.log("CarvIdInstance >>> ", CarvIdInstance);

    // 设置 SDK 状态
    elVersion.innerText = `Version: ${CarvId.version}`;
    elStatus.innerText = CarvIdInstance
      ? `👌 Initialized${fromLocal ? " (from last configuration)" : ""}`
      : "❗Initialization Failed";

    // 保存当前配置，以便下次初始化时使用
    localStorage.setItem(CONFIG_STORE_KEY, JSON.stringify(config));

    // 检查授权状态
    if (CarvIdInstance.authCode) {
      elBtnAuthorize.innerText = "Authorized";
      elBtnAuthorize.setAttribute("disabled", "true");
      elAuthorizeResult.innerHTML = JSON.stringify(
        { code: CarvIdInstance.authCode, state: "authenticate from cache" },
        null,
        2
      );
    } else {
      elBtnAuthorize.innerText = "🔑 Authorize";
      elBtnAuthorize.removeAttribute("disabled");
    }

    // 点击 Authorize 按钮触发 authenticateUser 方法
    elBtnAuthorize.addEventListener("click", () => {
      CarvIdInstance.authenticateUser();
    });

    // 触发授权回调
    CarvIdInstance.handleAuthCallback().then((res) => {
      console.log(res, "handleAuthCallback");
      if (!res.code) return showToast("Authorization Failed");

      showToast("🎉 Authorization Success");
      elBtnAuthorize.innerText = "Authorized";
      elBtnAuthorize.setAttribute("disabled", "true");
      elAuthorizeResult.innerHTML = JSON.stringify(res, null, 2);
    });

    return CarvIdInstance;
  };

  const reset = () => {
    elBtnAuthorize.innerText = "🔑 Authorize";
    elBtnAuthorize.setAttribute("disabled", "true");
    elConfig.value = JSON.stringify(config, null, 2);
    elStatus.innerText = "❗Not active";
    elVersion.innerText = "";
    elAuthorizeResult.innerHTML = "";
    window.history.pushState(null, "", location.origin);

    if (CarvIdInstance) {
      CarvIdInstance.destroy();
      // @ts-ignore
      window.CarvIdInstance = null;
    }
    localStorage.clear();
    sessionStorage.clear();
    showToast("🔄 Reset Success");
  };

  // 设置 StartParams 参数
  elStartParams.innerHTML = startParam
    ? JSON.stringify(CarvId.utils.HexUtils.jsonDecode(startParam), null, 2)
    : "";

  // 从 localStorage 获取上一次的配置
  const localConfig = JSON.parse(
    localStorage.getItem(CONFIG_STORE_KEY) || "null"
  );
  elConfig.value = JSON.stringify(localConfig || config, null, 2);

  if (localConfig) {
    init(localConfig, true);
  }

  // 点击 Initialize 按钮触发初始化方法
  elBtnInitialize.addEventListener("click", () => {
    const config = JSON.parse(elConfig.value);

    if (!config) {
      console.log("Configuration is not valid");
      return;
    }
    init(config);
  });
  // 点击 Reset 按钮触发初始化方法
  elBtnReset.addEventListener("click", reset);
};

window.onload = () => {
  initSDK();
};
