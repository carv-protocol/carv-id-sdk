import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "./index.css";
import {
  CarvId,
  Enum_Env,
  Enum_CarvIdTheme,
  Enum_CarvIdIconPlacement,
  I_CarvIdOptions,
  // } from "@carvid/carv-id-tg-sdk"; // 从工作区引入（本地测试）
} from "@carv_admin/carv-id-tg-sdk"; // 从 NPM 包引入（NPM 包测试）

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

const defaultConfig: I_CarvIdOptions = {
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

const CarvID = () => {
  const [sdkInfo, setSdkInfo] = useState<{
    status: string;
    version: string;
  } | null>(null);
  const [config, setConfig] = useState(defaultConfig);
  const refTextarea = useRef<HTMLTextAreaElement | null>(null);
  const [startParams, setStartParams] = useState("");
  const [authRes, setAuthRes] = useState("");
  const [isInited, setIsInited] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const CarvIdInstance = useRef<CarvId | null>(null);

  // 初始化 SDK
  const initSDK = (config: I_CarvIdOptions, fromLocal = false) => {
    // 初始化前先清除旧的 widget
    const elWidget = document.querySelector("carv-id-widget");
    if (elWidget) {
      elWidget.parentNode?.removeChild(elWidget);
    }

    // 初始化 CarvId 实例
    CarvIdInstance.current = new CarvId(config);

    // @ts-ignore
    window.CarvIdInstance = CarvIdInstance;

    if (!fromLocal) {
      toast.success("👌🏻 SDK Initialized");
    }
    console.log("CarvIdInstance >>> ", CarvIdInstance);

    // 设置 SDK 状态
    setSdkInfo((prev) => ({
      ...prev,
      version: CarvId.version,
      status: CarvIdInstance
        ? `👌 Initialized${fromLocal ? " (from last configuration)" : ""}`
        : "❗Initialization Failed",
    }));

    // 保存当前配置，以便下次初始化时使用
    localStorage.setItem(CONFIG_STORE_KEY, JSON.stringify(config));

    // 检查授权状态
    if (CarvIdInstance.current?.authCode) {
      setIsAuthorized(true);
      setAuthRes(
        JSON.stringify(
          {
            code: CarvIdInstance.current.authCode,
            state: "authenticate from cache",
          },
          null,
          2
        )
      );
    } else {
      setIsAuthorized(false);
    }

    // 触发授权回调
    CarvIdInstance.current?.handleAuthCallback().then((res) => {
      console.log(res, "handleAuthCallback");
      if (!res.code) return;

      toast.success("🎉 Authorization Success");
      setAuthRes(JSON.stringify(res, null, 2));
      setIsAuthorized(true);
    });

    setIsInited(true);

    return CarvIdInstance;
  };

  const handleInit = () => {
    if (!config) {
      console.log("Configuration is not valid");
      return;
    }

    initSDK(config);
  };

  // 点击 Authorize 按钮触发 authenticateUser 方法
  const handleAuthorize = () => {
    CarvIdInstance.current?.authenticateUser();
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleConfigChange = (e: any) => {
    try {
      const data = JSON.parse(e.target.value || "null");
      setConfig(data);
      refTextarea.current!.value = e.target.value;
    } catch (error) {
      console.error(error);
    }
  };
  // 点击 Reset 按钮触发初始化方法
  const handleReset = () => {
    setConfig(defaultConfig);
    refTextarea.current!.value = JSON.stringify(defaultConfig, null, 2);
    setSdkInfo(null);
    setStartParams("");
    setAuthRes("");
    setIsAuthorized(false);
    setIsInited(false);

    if (CarvIdInstance.current) {
      CarvIdInstance.current.destroy();
      CarvIdInstance.current = null;
    }
    // @ts-ignore
    window.CarvIdInstance = null;

    localStorage.clear();
    sessionStorage.clear();
    window.history.pushState(null, "", location.origin);
    toast.success("Reset Successfully");
  };

  useEffect(() => {
    // @ts-ignore
    const tgapp = window?.Telegram?.WebApp;
    tgapp?.expand(); // 将应用尺寸拉到全屏
    tgapp?.disableVerticalSwipes(); // 禁用垂直拖动，仅 7.7+ 支持
    tgapp?.disableClosingConfirmation(); // 禁用关闭提示
    tgapp?.lockOrientation(); // 锁定屏幕方向
    tgapp?.ready();

    // @ts-ignore
    const startParam = tgapp?.initDataUnsafe?.start_param;
    console.log("url >> ", window.location.href);
    console.log("startParam >> ", startParam);

    // 设置 Config 参数
    refTextarea.current!.value = JSON.stringify(config, null, 2);

    // 设置 StartParams 参数
    setStartParams(
      startParam
        ? JSON.stringify(CarvId.utils.HexUtils.jsonDecode(startParam), null, 2)
        : ""
    );

    // 从 localStorage 获取上一次的配置
    const localConfig = JSON.parse(
      localStorage.getItem(CONFIG_STORE_KEY) || "null"
    );
    setConfig(localConfig || config);

    if (localConfig) {
      initSDK(localConfig, true);
    }

    // 处理 Telegram WebApp 安全区滚动问题
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", () => {
        // @ts-ignore
        document.body.style.height = window.visualViewport.height + "px";
      });
    }
    // 禁止页面滚动
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) window.scrollTo(0, 0);
    });
  }, []);

  return (
    <div className="container">
      <h1 className="title">
        CARV ID SDK <span>Demo{config?.env === "dev" ? "@dev" : ""}</span>
      </h1>
      <div className="box-col config-box">
        <h3>
          🟢 SDK Config&nbsp;&nbsp;
          <a
            href="https://github.com/carv-protocol/carv-id-sdk/blob/main/README.md"
            target="_blank"
          >
            📋 Documentation
          </a>
        </h3>
        <textarea ref={refTextarea} rows={10} onChange={handleConfigChange} />
      </div>
      <div className="btn-col">
        <button id="btn-initialize" disabled={isInited} onClick={handleInit}>
          {isInited ? "Initialized" : "🕹️ Initialize"}
        </button>
        <button
          id="btn-authorize"
          disabled={!isInited || isAuthorized}
          onClick={handleAuthorize}
        >
          {isAuthorized ? "Authorized" : "🔑 Authorize"}
        </button>
        <button id="btn-reset" onClick={handleReset}>
          ↪️ Reset
        </button>
      </div>
      <div className="box-col params-box">
        <h3>🔵 Start Params</h3>
        <pre id="start-params">{startParams}</pre>
      </div>
      <div className="box-col status-box">
        <h3>🟡 SDK Status</h3>
        <div className="box-pre">
          <p id="sdk-status">{sdkInfo?.status || "❗Not active"}</p>
          {sdkInfo && <p id="sdk-version">Version: {sdkInfo.version}</p>}
        </div>
      </div>
      <div className="box-col result-box">
        <h3>🟡 Authorize Result</h3>
        <pre id="result">{authRes}</pre>
      </div>
    </div>
  );
};

export default CarvID;
