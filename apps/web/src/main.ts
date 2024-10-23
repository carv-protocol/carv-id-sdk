import "./style.css";

import {
  CarvId,
  Enum_Env,
  Enum_CarvIdTheme,
  Enum_CarvIdIconPlacement,
} from "@carvid/core/carv-id";
// import {
//   CarvId,
//   Enum_Env,
//   Enum_CarvIdTheme,
//   Enum_CarvIdIconPlacement,
// } from "@carvid/core";

window.onload = () => {
  const elButton = document.querySelector(
    "#btn-authorize"
  ) as HTMLButtonElement;
  const elResult = document.querySelector("#result") as HTMLButtonElement;
  console.log(CarvId, "CarvId");

  // 初始化 CarvId 实例
  const CarvIdInstance = new CarvId({
    env: import.meta.env.VITE_APP_ENV === "dev" ? Enum_Env.DEV : Enum_Env.PROD,
    theme: Enum_CarvIdTheme.LIGHT,
    showWidget: true,
    widgetOptions: {
      // icon: '',
      className: "my-carv-id-widget",
      size: "60px",
      placement: Enum_CarvIdIconPlacement.BOTTOM_RIGHT,
    },
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
    onSuccess: (data) => {
      console.log("onSuccess", data);
      elButton.innerHTML = "Authorized";
      elButton.setAttribute("disabled", "true");
      elResult.textContent = JSON.stringify(data, null, 2);
    },
  });

  // 点击按钮触发 authenticateUser 方法
  elButton.addEventListener("click", () => {
    console.log(CarvIdInstance, "CarvIdInstance");
    CarvIdInstance.authenticateUser({ scope: "profile", state: "1234" }).then(
      (res) => {
        console.log(res, "res-authenticateUser");
        elButton.innerHTML = "Authorized";
        elButton.setAttribute("disabled", "true");
        elResult.textContent = JSON.stringify(res, null, 2);
      }
    );
  });
};

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container">
    <h1>CARV ID</h1>
    <button id="btn-authorize">Authorize</button>
    <pre id="result"></div>
  </div>
`;
