/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import IconCARVID from "../assets/icon/carv_id.svg";
import { MapUrl } from "../config/url";
import { throttle } from "lodash-es";
// import { sleep } from "@carvid/utils";

const sleep = (ms = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export enum Enum_Env {
  DEV = "dev",
  PROD = "prod",
}
export enum Enum_CarvIdTheme {
  LIGHT = "light",
  DARK = "dark",
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
  icon?: string;
  size?: string;
  carvIdInstance?: CarvId;
  entryUrl?: string;
  className?: string;
  placement?: Enum_CarvIdIconPlacement;
  offset?: { left: number; right: number; top: number; bottom: number };
}

const defaultCarvIdWidgetOptions = {
  env: Enum_Env.DEV,
  theme: Enum_CarvIdTheme.LIGHT,
  icon: IconCARVID,
  size: "48px",
  className: "",
  entryUrl: MapUrl[Enum_Env.DEV].TELEGRAM_APP_URL,
  placement: Enum_CarvIdIconPlacement.BOTTOM_RIGHT,
  offset: { left: 20, right: 20, top: 40, bottom: 60 },
};

@customElement("carv-id-widget")
export class CarvIdWidget extends LitElement {
  @property({ type: Object })
  options?: I_CarvIdWidgetOptions = defaultCarvIdWidgetOptions;

  private config = defaultCarvIdWidgetOptions;

  // private authorized = false;
  private isDragging = false;
  private position = { x: 0, y: 0 };
  private showModal = false;

  static styles = css`
    :host {
      position: fixed;
      z-index: 50;
      --icon-size: 48px;
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
      /* box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); */
    }
    .dark {
      background-color: #333;
    }
    .light {
      background-color: #fff;
    }
  `;

  setInitialPosition() {
    const host = this.shadowRoot?.host as HTMLElement;
    const { top, right, bottom, left } = this.config.offset;

    switch (this.config.placement) {
      case Enum_CarvIdIconPlacement.TOP_LEFT:
        host.style.top = `${top}px`;
        host.style.left = `${left}px`;
        break;
      case Enum_CarvIdIconPlacement.TOP_RIGHT:
        host.style.top = `${top}px`;
        host.style.right = `${right}px`;
        break;
      case Enum_CarvIdIconPlacement.BOTTOM_LEFT:
        host.style.bottom = `${bottom}px`;
        host.style.left = `${left}px`;
        break;
      case Enum_CarvIdIconPlacement.BOTTOM_RIGHT:
        host.style.bottom = `${bottom}px`;
        host.style.right = `${right}px`;
        break;
      default:
        host.style.bottom = `${bottom}px`;
        host.style.right = `${right}px`;
    }
  }
  updatePosition() {
    const iconRect = this.getBoundingClientRect();
    const iconWidth = iconRect.width;
    const iconHeight = iconRect.height;
    const maxX = window.innerWidth - iconWidth;
    const maxY = window.innerHeight - iconHeight;
    // console.log(maxY, this.position.y, maxY / 2);

    this.position.x =
      this.position.x <= maxX / 2
        ? this.config.offset.left
        : maxX - this.config.offset.right;
    this.position.y =
      this.position.y <= maxY
        ? this.position.y
        : maxY - this.config.offset.bottom;

    this.style.left = `${this.position.x}px`;
    this.style.top = `${this.position.y}px`;
    this.style.right = "auto";
    this.style.bottom = "auto";
  }

  handleResize() {
    return throttle(this.updatePosition, 1000).bind(this)();
  }
  handleClick() {
    // @ts-ignore
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
    // this.showModal = true;
    // (document.getElementById("carv-id-modal") as any)?.open();
  }
  handleCloseModal() {
    console.log(3344);
    this.showModal = false;
  }
  handleStartDrag(event: MouseEvent | TouchEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.isDragging = true;

    const clientX =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const clientY =
      event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    this.position.x = clientX - (this.getBoundingClientRect().left || 0);
    this.position.y = clientY - (this.getBoundingClientRect().top || 0);

    window.addEventListener("mousemove", this.handleOnDrag.bind(this));
    window.addEventListener("mouseup", this.handleStopDrag.bind(this));
    window.addEventListener("touchmove", this.handleOnDrag.bind(this), {
      passive: false,
    });
    window.addEventListener("touchend", this.handleStopDrag.bind(this));
  }
  handleOnDrag(event: MouseEvent | TouchEvent) {
    event.stopPropagation();
    event.preventDefault();

    if (!this.isDragging) return;

    const clientX =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const clientY =
      event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;

    // const iconRect = this.getBoundingClientRect();
    // const iconWidth = iconRect.width;
    // const iconHeight = iconRect.height;
    // const maxX = window.innerWidth - iconWidth;
    // const maxY = window.innerHeight - iconHeight;
    const x = clientX - this.position.x;
    const y = clientY - this.position.y;

    // this.position.x = x;
    // this.position.y = y;
    // const limitedX = Math.max(0, Math.min(x, maxX));
    // const limitedY = Math.max(0, Math.min(y, maxY));

    // this.style.left = `${limitedX}px`;
    // this.style.top = `${limitedY}px`;

    this.style.left = `${x}px`;
    this.style.top = `${y}px`;
    this.style.right = "auto";
    this.style.bottom = "auto";
  }
  handleStopDrag(event: MouseEvent | TouchEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.isDragging = false;

    // 获取当前图标的位置信息
    const iconRect = this.getBoundingClientRect();
    const iconWidth = iconRect.width;
    const iconHeight = iconRect.height;
    const maxX = window.innerWidth - iconWidth;
    const maxY = window.innerHeight - iconHeight;

    const offsetLeft = iconRect.left;
    const offsetTop = iconRect.top;

    // 水平方向控制 - 根据拖动结束时的 x 位置判断吸附到左侧或右侧
    if (offsetLeft <= maxX / 2) {
      this.position.x = this.config.offset.left;
    } else {
      this.position.x = maxX - this.config.offset.right;
    }

    // 垂直方向保持当前位置，只要在可视区域内
    // if (offsetTop < this.config.offset.top) {
    //   // 吸附到顶部
    //   this.position.y = this.config.offset.top;
    // } else if (offsetTop > maxY) {
    //   // 吸附到底部
    //   this.position.y = maxY - this.config.offset.bottom;
    // } else {
    //   this.position.y = offsetTop;
    // }
    this.position.y = Math.max(
      this.config.offset.top,
      Math.min(offsetTop, maxY - this.config.offset.bottom)
    );

    // console.log(
    //   JSON.stringify(
    //     {
    //       position: this.position,
    //       offset: this.config.offset,
    //     },
    //     null,
    //     2
    //   )
    // );

    this.style.left = `${this.position.x}px`;
    this.style.top = `${this.position.y}px`;
    this.style.right = "auto";
    this.style.bottom = "auto";

    window.removeEventListener("mousemove", this.handleOnDrag.bind(this));
    window.removeEventListener("mouseup", this.handleStopDrag.bind(this));
    window.removeEventListener("touchmove", this.handleOnDrag.bind(this));
    window.removeEventListener("touchend", this.handleStopDrag.bind(this));
    // this.removeEventListener("mousemove", this.handleOnDrag.bind(this));
    // this.removeEventListener("mouseup", this.handleStopDrag.bind(this));
    // this.removeEventListener("touchmove", this.handleOnDrag.bind(this));
    // this.removeEventListener("touchend", this.handleStopDrag.bind(this));
  }
  handleOnMouseLeave(event: MouseEvent | TouchEvent) {
    event.stopPropagation();
    event.preventDefault();

    window.removeEventListener("touchmove", this.handleOnDrag.bind(this));
    window.removeEventListener("touchend", this.handleStopDrag.bind(this));
  }

  firstUpdated() {
    this.config = Object.assign(this.config, {
      ...this.options,
      offset: Object.assign(this.config.offset, this.options?.offset || {}),
    });
    this.setInitialPosition();
    this.style.setProperty("--icon-size", this.config.size);

    window.addEventListener("resize", this.handleResize.bind(this));
    console.log(this.config, "Initialized👌🏻");
  }
  destroyed() {
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  render() {
    const cls = `${this.config.className ? `${this.config.className} ` : ""}${this.config.theme === Enum_CarvIdTheme.DARK ? Enum_CarvIdTheme.DARK : Enum_CarvIdTheme.LIGHT}`;

    return html`
      <div
        class="carv-id-widget ${cls}"
        @mousedown=${this.handleStartDrag}
        @touchstart=${this.handleStartDrag}
        @click=${this.handleClick}
      >
        <img
          src="${this.config.icon}"
          alt="CARV ID"
          style="width: 100%; height: 100%;"
        />
        <!-- <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style="width: 100%; height: 100%;"
        >
          <rect
            width="64"
            height="64"
            rx="32"
            fill="${this.config.theme === Enum_CarvIdTheme.LIGHT
          ? "#fff"
          : "#000"}"
          />
          <rect
            x="1"
            y="1"
            width="62"
            height="62"
            rx="31"
            stroke="black"
            stroke-opacity="0.1"
            stroke-width="2"
          />
          <path
            d="M38.9118 42.0725L49 32.0743L38.9626 21.9833L29.0324 12L19.0158 22.0701L28.9461 32.0534L19 42.0526L28.8945 52L38.9118 42.0725Z"
            fill="${this.config.theme === Enum_CarvIdTheme.LIGHT
          ? "#713FFE"
          : "#fff"}"
          />
        </svg> -->

        <!-- <dile-modal
          id="carv-id-modal"
          showCloseIcon="true"
          blocking="true"
          opened=${this.showModal}
          @dile-modal-closed=${this.handleCloseModal}
        >
          <p style="color:#333">老司机分离焦虑大开杀戒过啦盛大国际</p>
        </dile-modal> -->
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
        theme: options?.theme || Enum_CarvIdTheme.LIGHT,
        ...(options?.widgetOptions || {}),
        carvIdInstance: this,
        entryUrl: MapUrl[env].TELEGRAM_APP_URL,
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
        `${MapUrl[this.env].TELEGRAM_APP_URL}?startapp=scope=${data.scope}&state=${data.state}`
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
