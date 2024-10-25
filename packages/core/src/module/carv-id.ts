/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { MapUrl } from "../config/url";
import { IconCARVID } from "../config/file";
import { throttle } from "lodash-es";
import { sleep } from "@carvid/utils/common";

export enum Enum_Env {
  DEV = "dev",
  PROD = "prod",
}
export enum Enum_CarvIdTheme {
  LIGHT = "light",
  DARK = "dark",
}
export enum Enum_CarvIdIconDirection {
  TOP = "top",
  RIGHT = "right",
  BOTTOM = "bottom",
  LEFT = "left",
}
export enum Enum_CarvIdIconPlacement {
  TOP_LEFT = "top-left",
  TOP_RIGHT = "top-right",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_RIGHT = "bottom-right",
}

export interface I_CarvIdOptions {
  env?: Enum_Env;
  theme?: Enum_CarvIdTheme;
  showWidget?: boolean;
  widgetOptions?: I_CarvIdWidgetOptions;
  onLoad?: (data: CarvId) => void;
  onSuccess?: (data: I_AuthenticateUser) => void;
}
export interface I_AuthenticateUserArgs {
  scope: string;
  state: string;
}
export interface I_AuthenticateUser {
  code: string;
  state: string;
}

export interface I_CarvIdWidgetOptions {
  env?: Enum_Env;
  theme?: Enum_CarvIdTheme;
  // icon?: string;
  size?: string;
  className?: string;
  draggable?: boolean;
  watchResize?: boolean;
  rememberPosition?: boolean;
  carvIdInstance?: CarvId;
  entryUrl?: string;
  placement?: Enum_CarvIdIconPlacement;
  offset?: { left: number; right: number; top: number; bottom: number };
}

const FLAG_CARV_ID_BTN_POSITION = "carv_id_btn_position";

const defaultCarvIdWidgetOptions = {
  env: Enum_Env.DEV,
  theme: Enum_CarvIdTheme.LIGHT,
  // icon: IconCARVID,
  size: "48px",
  className: "",
  draggable: true,
  watchResize: true,
  rememberPosition: true,
  entryUrl: MapUrl[Enum_Env.DEV].TELEGRAM_APP_URL,
  placement: Enum_CarvIdIconPlacement.BOTTOM_RIGHT,
  offset: { left: 20, right: 20, top: 40, bottom: 60 },
};

@customElement("carv-id-widget")
export class CarvIdWidget extends LitElement {
  @property({ type: Object })
  options?: I_CarvIdWidgetOptions = defaultCarvIdWidgetOptions;

  private elBtn: HTMLElement | null = null;
  private config = defaultCarvIdWidgetOptions;
  private draggie: any; // 拖拽实例
  private isDragging = false; // 是否正在拖动
  private position = { x: 0, y: 0, direction: Enum_CarvIdIconDirection.RIGHT }; // 图标当前位置信息

  static styles = css`
    :host {
      position: fixed;
      z-index: 50;
      width: var(--icon-size);
      height: var(--icon-size);
      touch-action: none; /* 禁用默认的触摸滚动行为 */
    }
    .carv-id-widget {
      cursor: pointer;
      width: var(--icon-size);
      height: var(--icon-size);
      user-select: none;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  `;

  // 记录位置信息到本地存储
  setButtonStorageData(data) {
    const { innerWidth, innerHeight } = window;
    localStorage.setItem(
      FLAG_CARV_ID_BTN_POSITION,
      `${data.x},${data.y},${data.direction},${this.config.placement}`
    );
    localStorage.setItem(
      FLAG_CARV_ID_BTN_POSITION + "_window",
      `${innerWidth},${innerHeight}`
    );
  }
  // 从本地存储中获取位置信息
  getButtonStorageData() {
    const { innerWidth, innerHeight } = window;
    // 获取本地存储的位置信息
    const localPlacement = localStorage.getItem(FLAG_CARV_ID_BTN_POSITION);
    const [x, y, direction, placement] = localPlacement
      ? localPlacement.split(",")
      : [];

    // 获取本地存储的窗口大小信息
    const localWindowSize = localStorage.getItem(
      FLAG_CARV_ID_BTN_POSITION + "_window"
    );
    let [width, height] = localWindowSize ? localWindowSize.split(",") : [];
    width = Number(width || 0);
    height = Number(height || 0);

    if (width && height && (width != innerWidth || height != innerHeight)) {
      this.clearButtonStorageData();
      return {
        x: innerWidth,
        y: innerHeight,
        direction: Enum_CarvIdIconDirection.RIGHT,
        placement,
      };
    }

    return {
      x: Number(x) || 0,
      y: Number(y) || 0,
      direction,
      placement,
    };
  }
  // 清除本地存储的位置信息
  clearButtonStorageData() {
    localStorage.removeItem(FLAG_CARV_ID_BTN_POSITION + "_window");
    localStorage.removeItem(FLAG_CARV_ID_BTN_POSITION);
  }
  // 初始化按钮位置信息
  setInitialPosition() {
    const { innerWidth, innerHeight } = window;

    const { x: btnX, y: btnY } = this.getButtonStorageData();
    // 如果有存储的位置信息，则使用存储的位置信息
    if (btnX && btnY) {
      if (
        (Number(btnX) || 0) < innerWidth &&
        (Number(btnY) || 0) < innerHeight
      ) {
        this.updatePosition(Number(btnX) || 0, Number(btnY) || 0);
      } else {
        this.updatePosition(innerWidth, innerHeight);
      }
    } else {
      // 如果没有存储的位置信息，则使用默认的位置信息
      const { top, right, bottom, left } = this.config.offset;
      let x, y;
      switch (this.config.placement) {
        case Enum_CarvIdIconPlacement.TOP_LEFT:
          x = left;
          y = top;
          break;
        case Enum_CarvIdIconPlacement.TOP_RIGHT:
          x = innerWidth - right;
          y = top;
          break;
        case Enum_CarvIdIconPlacement.BOTTOM_LEFT:
          x = left;
          y = innerHeight - bottom;
          break;
        case Enum_CarvIdIconPlacement.BOTTOM_RIGHT:
          x = innerWidth - right;
          y = innerHeight - bottom;
          break;
        default:
          x = innerWidth - right;
          y = innerHeight - bottom;
      }

      this.updatePosition(x, y);
    }
  }
  // 更新按钮位置信息
  updatePosition(x: number, y: number, type?: string) {
    const {
      left: iconLeft,
      top: iconTop,
      width: iconWidth,
      height: iconHeight,
    } = this.elBtn.getBoundingClientRect();
    const isResize = type === "windowResize"; // 是否来自 Resize 事件
    const iconOffsetLeft = isResize ? iconLeft : x; // 按钮左侧位置
    const iconOffsetTop = isResize ? iconTop : y; // 按钮左侧位置
    const maxX = window.innerWidth - iconWidth;
    const maxY = window.innerHeight - iconHeight;
    let newDirection;
    let newX;

    // 水平方向控制 - 根据拖动结束时的 x 位置判断吸附到左侧或右侧
    if (iconOffsetLeft <= maxX / 2) {
      newDirection = Enum_CarvIdIconDirection.LEFT;
      newX = this.config.offset.left;
    } else {
      newDirection = Enum_CarvIdIconDirection.RIGHT;
      newX = maxX - this.config.offset.right;
    }

    // 垂直方向控制 - 根据拖动结束时的 y 位置判断吸附到上侧或下侧
    const newY = Math.max(
      this.config.offset.top,
      Math.min(iconOffsetTop, maxY - this.config.offset.bottom)
    );

    // 更新按钮位置
    this.position = { x: newX, y: newY, direction: newDirection };
    if (this.elBtn) {
      this.elBtn.style.left = newX + "px";
      this.elBtn.style.top = newY + "px";
    }

    return {
      left: newX,
      top: newY,
      direction: newDirection,
    };
  }
  // 点击按钮
  handleClick() {
    const carvIdInstance = this.config.carvIdInstance!;
    if (carvIdInstance.token) {
      window.open(this.config.entryUrl, "_blank");
    } else {
      carvIdInstance
        .authenticateUser({
          scope: "widget-trigger-authenticateUser",
          state: "67890",
        })
        .then((res: I_AuthenticateUser) => {
          console.log("res-widget-trigger-authenticateUser", res);
        });
    }
  }
  // 销毁
  destroy() {
    this.draggie?.destroy();
    this.elBtn.parentNode.removeChild(this.elBtn);
    this.elBtn = null;
    this.resizeHander = null;
    if (this.config.watchResize) {
      window.removeEventListener("resize", this.resizeHandler);
    }
  }

  // 初始化
  async firstUpdated() {
    // 合并配置项
    this.config = Object.assign(this.config, {
      ...this.options,
      offset: Object.assign(this.config.offset, this.options?.offset || {}),
    });
    this.resizeHandler = throttle(() => {
      console.log("resize");
      const { left, top, direction } = this.updatePosition(
        0,
        0,
        "windowResize"
      );

      if (this.config.rememberPosition) {
        this.setButtonStorageData({
          x: left,
          y: top,
          direction,
        });
      }
    }, 100);

    // 是否记住位置信息
    if (!this.options.rememberPosition) {
      this.clearButtonStorageData();
    }

    this.elBtn = this.shadowRoot?.host as HTMLElement; // 缓存当前按钮元素
    this.elBtn.style.setProperty("--icon-size", this.config.size); // 设置图标大小
    this.setInitialPosition(); // 设置初始位置

    // 开启拖拽功能
    if (this.config.draggable) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const Draggabilly = (await import("draggabilly")).default;
      this.draggie = new Draggabilly(this.elBtn);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.draggie.on("dragStart", (event, pointer) => {
        // console.log(event, pointer, "dragStart");
        this.isDragging = true;
        this.elBtn.style.cursor = "move";
      });
      // this.draggie.on("dragMove", (event, pointer) => {
      // console.log(event, pointer, "dragMove");
      // this.updatePosition();
      // });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.draggie.on("dragEnd", (event, pointer) => {
        // console.log(event, pointer, "dragEnd");
        event.stopPropagation();
        this.elBtn.style.cursor = "pointer";
        const { clientX, clientY } = pointer;
        const { left, top, direction } = this.updatePosition(
          clientX,
          clientY - 35
        );

        if (this.config.rememberPosition) {
          this.setButtonStorageData({
            x: left,
            y: top,
            direction,
          });
        }
        setTimeout(() => {
          this.isDragging = false;
        }, 50);
      });
      this.draggie.on("staticClick", () => {
        event.stopPropagation();
        this.handleClick();
      });
    }

    // 是否需要监听窗口大小变化
    if (this.config.watchResize) {
      window.addEventListener("resize", this.resizeHandler);
    }

    console.log(this.config, "CarvID Widget Initialized👌🏻");
  }
  destroyed() {
    this.destroy();
  }

  render() {
    const cls = `${this.config.className ? `${this.config.className} ` : ""}${this.config.theme === Enum_CarvIdTheme.DARK ? Enum_CarvIdTheme.DARK : Enum_CarvIdTheme.LIGHT}`;

    return html`
      <div class="carv-id-widget ${cls}">
        <img src="${IconCARVID}" alt="CARV ID" />
      </div>
    `;
  }
}

export class CarvId {
  env: Enum_Env;
  token: string;
  entryUrl: string;
  onSuccess?: (data: I_AuthenticateUser) => void;

  constructor(options?: I_CarvIdOptions) {
    const env = options?.env || Enum_Env.DEV;
    this.env = env;
    this.theme = options?.theme || Enum_CarvIdTheme.LIGHT;
    this.onSuccess = options?.onSuccess;

    // this.token = "";
    // 从 sessionStorage 中获取 token
    const token = sessionStorage.getItem("carv_id_token") || "";
    this.token = token;
    this.entryUrl = `${MapUrl[this.env].TELEGRAM_APP_URL}?startapp=page=identity&user_id=${token}`;

    this.authenticateUser = this.authenticateUser.bind(this);
    this.handleAuthCallback = this.handleAuthCallback.bind(this);
    this.openIdentityPage = this.openIdentityPage.bind(this);

    if (options?.showWidget) {
      const carvId = document.createElement("carv-id-widget") as CarvIdWidget;
      carvId.options = {
        env: env,
        theme: this.theme,
        ...(options?.widgetOptions || {}),
        carvIdInstance: this,
        entryUrl: `${MapUrl[env].TELEGRAM_APP_URL}?theme=${this.theme}`,
      };
      document.body.appendChild(carvId);
    }

    if (options?.onLoad) {
      options.onLoad(this);
    }
  }

  async authenticateUser(data: I_AuthenticateUserArgs) {
    console.log(data, "authenticateUser", MapUrl[this.env].TELEGRAM_APP_URL);
    const token = sessionStorage.getItem("carv_id_token");
    if (!token) {
      window.open(
        `${MapUrl[this.env].TELEGRAM_APP_URL}?startapp=theme=${this.theme}&scope=${data.scope}&state=${data.state}`
      );
      const newToken = Date.now().toString();
      sessionStorage.setItem("carv_id_token", newToken);
      this.token = newToken;
      await sleep(2000);
      const res = { code: newToken, state: "first authenticate" };
      if (this.onSuccess) {
        this.onSuccess(res);
      }
      return res;
    } else {
      this.token = token;
      const res = { code: token, state: "authenticate from cache" };
      if (this.onSuccess) {
        this.onSuccess(res);
      }
      return res;
    }
  }
  handleAuthCallback(startParam: string): I_AuthenticateUser {
    console.log("authorize callback", startParam);
    return { code: "12345", state: "callback" };
  }
  async openIdentityPage(user_id: string) {
    if (!user_id) {
      throw new Error("user_id is required");
    }

    window.open(this.entryUrl, "_blank");
  }
}
