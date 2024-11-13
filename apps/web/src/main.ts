/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.css";

// 本地包
import {
  CarvId,
  Enum_Env,
  Enum_CarvIdTheme,
  Enum_CarvIdIconPlacement,
} from "@carvid/core";

// NPM 线上包
// import {
//   CarvId,
//   Enum_Env,
//   Enum_CarvIdTheme,
//   Enum_CarvIdIconPlacement,
// } from "testcarvid";

window.onload = () => {
  const elButton = document.querySelector(
    "#btn-authorize"
  ) as HTMLButtonElement;
  const elResult = document.querySelector("#result") as HTMLButtonElement;
  console.log(CarvId, "CarvId");

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

  // 初始化 CarvId 实例
  const CarvIdInstance = new CarvId({
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
    onLoad: (data) => {
      console.log("onLoad", data);
      if (data.token) {
        elButton.innerHTML = "Authorized";
        elButton.setAttribute("disabled", "true");
        elResult.textContent = JSON.stringify(
          { code: data.token, state: "authenticate from cache" },
          null,
          2
        );
      }
    },
    onAuthSuccess: (res) => {
      console.log("onSuccess", res);
      elButton.innerHTML = "Authorized";
      elButton.setAttribute("disabled", "true");
      elResult.textContent = JSON.stringify(res, null, 2);
    },
    onAuthFailed: (res) => {
      console.log("onSuccess", res);
      elButton.innerHTML = "Authorize failed";
      elButton.setAttribute("disabled", "false");
      elResult.textContent = JSON.stringify(res, null, 2);
    },
  });

  // 点击按钮触发 authenticateUser 方法
  elButton.addEventListener("click", () => {
    console.log(CarvIdInstance, "CarvIdInstance");
    CarvIdInstance.authenticateUser();
  });

  // @ts-ignore
  const tgapp = window?.Telegram?.WebApp;
  const startParam = tgapp?.initDataUnsafe?.start_param;
  console.log("url >> ", window.location.href);
  console.log("startParam >> ", startParam);

  // 触发授权回调
  if (startParam) {
    CarvIdInstance.handleAuthCallback(startParam).then((res) => {
      console.log(res, "handleAuthCallback");
    });
  }
};

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container">
    <h1>CARV ID</h1>
    <button id="btn-authorize">Authorize</button>
    <pre id="result"></div>
  </div>
`;
