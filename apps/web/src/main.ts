/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.css";

// 本地包
import {
  CarvId,
  Enum_Env,
  Enum_CarvIdTheme,
  Enum_CarvIdIconPlacement,
  I_CarvIdOptions,
} from "@carvid/core";

// NPM 线上包
// import {
//   CarvId,
//   Enum_Env,
//   Enum_CarvIdTheme,
//   Enum_CarvIdIconPlacement,
// } from "testcarvid";

const initSDK = () => {
  const elBtnInitialize = document.querySelector(
    "#btn-initialize"
  ) as HTMLButtonElement;
  const elBtnAuthorize = document.querySelector(
    "#btn-authorize"
  ) as HTMLButtonElement;
  const elBtnReset = document.querySelector("#btn-reset") as HTMLButtonElement;
  const elConfig = document.querySelector("#config") as HTMLTextAreaElement;
  const elResult = document.querySelector("#result") as HTMLPreElement;

  const CONFIG_STORE_KEY = "carv_id_demo_config";

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

  const config = {
    // @ts-ignore
    env: import.meta.env.VITE_APP_ENV === "dev" ? Enum_Env.DEV : Enum_Env.PROD,
    theme: Enum_CarvIdTheme.LIGHT,
    showWidget: true,
    widgetOptions: {
      // icon: '',
      className: "my-carv-id-widget",
      size: "50px",
      placement: Enum_CarvIdIconPlacement.BOTTOM_RIGHT,
      offset: {
        bottom: 80,
      },
      // watchResize: false,
      // rememberPosition: false,
    },
    authorizeConfig,
    onLoad: (data: any) => {
      console.log(data.authCode, "authCode");
      console.log("onLoad", data);
      // elBtnInitialize.innerText = "Initialized";
      // elBtnInitialize.setAttribute("disabled", "true");

      elBtnAuthorize.innerText = "Authorize";
      elBtnAuthorize.removeAttribute("disabled");

      if (data.authCode) {
        elBtnAuthorize.innerText = "Authorized";
        elBtnAuthorize.setAttribute("disabled", "true");
        elResult.innerHTML = JSON.stringify(
          { code: data.authCode, state: "authenticate from cache" },
          null,
          2
        );
      }
    },
    onAuthSuccess: (res: any) => {
      console.log("onAuthSuccess", res);
      elBtnAuthorize.innerText = "Authorized";
      elBtnAuthorize.setAttribute("disabled", "true");
      elResult.innerHTML = JSON.stringify(res, null, 2);
    },
    onAuthFailed: (res: any) => {
      console.log("onAuthFailed", res);
      elBtnAuthorize.innerText = "Authorize failed";
      elBtnAuthorize.setAttribute("disabled", "false");
      elResult.innerHTML = JSON.stringify(res, null, 2);
    },
  };

  // 初始化 CarvId 实例
  let CarvIdInstance: CarvId;
  const init = (config: I_CarvIdOptions) => {
    // @ts-ignore
    const tgapp = window?.Telegram?.WebApp;
    const startParam = tgapp?.initDataUnsafe?.start_param;
    console.log("url >> ", window.location.href);
    console.log("startParam >> ", startParam);

    const elWidget = document.querySelector("carv-id-widget");
    if (elWidget) {
      elWidget.parentNode?.removeChild(elWidget);
    }

    CarvIdInstance = new CarvId(config);
    console.log(CarvIdInstance);

    if (CarvIdInstance.authCode) {
      elBtnAuthorize.innerText = "Authorized";
      elBtnAuthorize.setAttribute("disabled", "true");
      elResult.innerHTML = JSON.stringify(
        { code: CarvIdInstance.authCode, state: "authenticate from cache" },
        null,
        2
      );
    } else {
      elBtnAuthorize.innerText = "🔑 Authorize";
      elBtnAuthorize.removeAttribute("disabled");
    }

    localStorage.setItem(CONFIG_STORE_KEY, JSON.stringify(config)); // 保存配置

    // 点击 Authorize 按钮触发 authenticateUser 方法
    elBtnAuthorize.addEventListener("click", () => {
      console.log(CarvIdInstance, "CarvIdInstance");
      CarvIdInstance.authenticateUser();
    });

    // 触发授权回调
    if (startParam) {
      CarvIdInstance.handleAuthCallback(startParam).then((res) => {
        console.log(res, "handleAuthCallback");
      });
    }
    console.log(CarvIdInstance, "CarvIdInstance");
    return CarvIdInstance;
  };

  const reset = () => {
    elBtnAuthorize.innerText = "🔑 Authorize";
    elBtnAuthorize.setAttribute("disabled", "true");
    elResult.innerHTML = "";
    elConfig.value = JSON.stringify(config, null, 2);
    if (CarvIdInstance) {
      CarvIdInstance.destroy();
    }
    localStorage.clear();
  };

  // 从 localStorage 获取上一次的配置
  const localConfig = JSON.parse(
    localStorage.getItem(CONFIG_STORE_KEY) || "null"
  );

  elConfig.value = JSON.stringify(localConfig || config, null, 2);

  if (localConfig) {
    init(localConfig);
  }

  // 点击 Initialize 按钮触发初始化方法
  elBtnInitialize.addEventListener("click", () => {
    const config = JSON.parse(elConfig.value);

    if (!config) {
      console.log("config is not valid");
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

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container">
    <h1 class="title">CARV ID SDK <span>Demo</span></h1>
    <div class="box-col config-box">
      <h3>🟢 SDK Config&nbsp;&nbsp;<a href="https://github.com/carv-protocol/carv-id-sdk/blob/main/README.md" target="_blank">📋 Documentation</a></h3>
      <textarea id="config" rows="10"></textarea>
    </div>
    <div class="btn-col">
      <button id="btn-initialize">🕹️ Initialize SDK</button>
      <button id="btn-authorize">🔑 Authorize</button>
      <button id="btn-reset">↪️ Reset</button>
    </div>
    <div class="box-col result-box">
      <h3>🟡 Authorize Result</h3>
      <pre id="result"></pre>
    </div>
  </div>
`;
