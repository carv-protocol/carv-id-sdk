declare class HexUtils {
    static jsonEncode(params: {
        [k: string]: string;
    }): string;
    static jsonDecode(str: string): any;
    static stringToHex(str: string): string;
    static hexToString(hex: string): string;
}

type Utils_HexUtils = HexUtils;
declare const Utils_HexUtils: typeof HexUtils;
declare namespace Utils {
  export { Utils_HexUtils as HexUtils };
}

declare enum Enum_Env {
    DEV = "dev",
    PROD = "prod"
}
declare enum Enum_CarvIdTheme {
    LIGHT = "light",
    DARK = "dark"
}
declare enum Enum_CarvIdIconDirection {
    TOP = "top",
    RIGHT = "right",
    BOTTOM = "bottom",
    LEFT = "left"
}
declare enum Enum_CarvIdIconPlacement {
    TOP_LEFT = "top-left",
    TOP_RIGHT = "top-right",
    BOTTOM_LEFT = "bottom-left",
    BOTTOM_RIGHT = "bottom-right"
}
declare enum Enum_CarvIdIntent {
    AUTHORIZE = "authorize",
    IDENTITY = "identity"
}
interface I_CarvIdAuthorizeConfig {
    client_id: string;
    client_secret: string;
    response_type: string;
    state: string;
    scope: string;
    redirect_uri: string;
}
interface I_AuthenticateResponse {
    code: string;
    state: string;
    message?: string;
}
interface I_CarvIdIconPlacementOffset {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
}
interface I_CarvIdOptions {
    env?: Enum_Env;
    theme?: Enum_CarvIdTheme;
    showWidget?: boolean;
    widgetOptions?: I_CarvIdWidgetOptions;
    authorizeConfig: I_CarvIdAuthorizeConfig;
    onLoad?: (data: CarvId) => void;
    onAuthSuccess?: (data: I_AuthenticateResponse) => void;
    onAuthFailed?: (data: I_AuthenticateResponse) => void;
}
interface I_CarvIdWidgetOptions {
    env?: Enum_Env;
    theme?: Enum_CarvIdTheme;
    size?: string;
    className?: string;
    draggable?: boolean;
    watchResize?: boolean;
    rememberPosition?: boolean;
    carvIdInstance?: CarvId;
    entryUrl?: string;
    placement?: Enum_CarvIdIconPlacement;
    offset?: I_CarvIdIconPlacementOffset;
}
interface I_PositionInfo {
    x: number;
    y: number;
    direction: Enum_CarvIdIconDirection;
}
declare class CarvId {
    env: Enum_Env;
    theme: Enum_CarvIdTheme;
    authCode: string;
    entryUrl: string;
    authorizeConfig: I_CarvIdAuthorizeConfig;
    onAuthSuccess?: (data: I_AuthenticateResponse) => void;
    onAuthFailed?: (data: I_AuthenticateResponse) => void;
    static utils: typeof Utils;
    static version: string;
    constructor(options: I_CarvIdOptions);
    private getAuthCode;
    authenticateUser(): Promise<void>;
    handleAuthCallback(): Promise<I_AuthenticateResponse>;
    openIdentityPage(user_id: string): Promise<void>;
    destroy(): void;
}

export { CarvId, Enum_CarvIdIconDirection, Enum_CarvIdIconPlacement, Enum_CarvIdIntent, Enum_CarvIdTheme, Enum_Env, type I_AuthenticateResponse, type I_CarvIdAuthorizeConfig, type I_CarvIdIconPlacementOffset, type I_CarvIdOptions, type I_CarvIdWidgetOptions, type I_PositionInfo };
