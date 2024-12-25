<p align="center">
  <img src="data:image/svg+xml,%3csvg%20width='64'%20height='64'%20viewBox='0%200%2064%2064'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='64'%20height='64'%20rx='32'%20fill='%23713FFE'/%3e%3crect%20x='1'%20y='1'%20width='62'%20height='62'%20rx='31'%20stroke='black'%20stroke-opacity='0.1'%20stroke-width='2'/%3e%3cpath%20d='M38.9118%2042.0725L49%2032.0743L38.9626%2021.9833L29.0324%2012L19.0158%2022.0701L28.9461%2032.0534L19%2042.0526L28.8945%2052L38.9118%2042.0725Z'%20fill='white'/%3e%3c/svg%3e" style="width:100px;" alt="CARV ID logo" />
</p>
<h1 align="center">CARV ID SDK</h1>


The SDK for CARV ID ecosystem. (Only Telegram is supported.)

- CARV ID SDK
- CARV ID SDK Widget

## 🎾 Demo

 - [CARV ID SDK Demo](https://carv-id-test.carv.io/)

<br/>

## 📒 Memo

-  carv-id-demo（Telegram demo）: [https://t.me/BabyChinBot/carv_id_demo](https://t.me/BabyChinBot/carv_id_demo)
-  carv-id-dev (carv-id-app@dev): [https://t.me/carv_identity_dev_bot/carv_id](https://t.me/carv_identity_dev_bot/carv_id)
-  carv-id（carv-id-app@prod）: [https://t.me/carv_identity_bot/carv_id](https://t.me/carv_identity_bot/carv_id)

<br/>

## 💊 Usage

#### 1、UMD

```html
<script src="https://cdn.jsdelivr.net/npm/@carv_admin/carv-id-tg-sdk@latest/dist/carv-id-tg-sdk.umd.js" defer></script>

<script>
 window.onload = function () {
  const CarvIdInstance = new CarvIdSDK.CarvId({
    showWidget: true,
    authorizeConfig: {
      client_id: "0a17299349c4b3e57bc8c25581b01bd0ec80c279",
      client_secret:
        "871cc95ca5a54866492bb052e0d487799e21a5c5896b7cd2ecbe813876a4b286",
      response_type: "code",
      state: "test app state",
      scope: "carv_id_basic_read email_basic_read evm_address_basic_read",
      redirect_uri: "https://t.me/BabyChinBot/carv_id_demo"
    }
  });
  console.log(CarvIdInstance, "CARV ID SDK initialized");
}
</script>
```

#### 2、ES Module

```bash
pnpm add @carv_admin/carv-id-tg-sdk
```

```typescript
import {
  CarvId,
  Enum_Env,
  Enum_CarvIdTheme,
  Enum_CarvIdIconPlacement,
} from "@carv_admin/carv-id-tg-sdk";

window.onload = function() => {
  const CarvIdInstance = new CarvId({
    env: Enum_Env.DEV,
    theme: Enum_CarvIdTheme.LIGHT,
    showWidget: true,
    widgetOptions: {
      size: "60px",
      placement: Enum_CarvIdIconPlacement.BOTTOM_RIGHT
    },
    onLoad: (data) => {
      console.log("onLoad", data);
    },
    onAuthSuccess: (data) => {
      console.log("onAuthSuccess", data);
    },
    onAuthFailed: (data) => {
      console.log("onAuthFailed", data);
    }
  });
  console.log(CarvIdInstance, "CARV ID SDK initialized");
}
```

<br/>

## 🧩 Methods

```typescript
// Initialize
const carvIdInstance = new CarvId(Options: I_CarvIdOptions)
```

#### 🔹 authenticateUser: () => void

```ts
// Start authorization process
carvIdInstance.authenticateUser();
```

#### 🔹 openIdentityPage: () => void

```ts
// Open CARV ID identity page
carvIdInstance.openIdentityPage();
```
#### 🔹 handleAuthCallback: Promise<I_AuthenticateResponse>

```ts
// Callback triggered after authorization
CarvIdInstance.handleAuthCallback().then((res: I_AuthenticateResponse) => {
  // {code: string, state: string}
  console.log(res, "handleAuthCallback");
  if (res.code) {
    console.log("Authorize success", res.code);
  }
});
```

<br/>

## 🛠️ Options

#### 🔸 I_CarvIdOptions

```typescript
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
```

| Field            | Description                                            | Type                                   | Default                |
| ---------------- | ------------------------------------------------------ | -------------------------------------- | ---------------------- |
| env              | Environment                                            | Enum_Env                               | Enum_Env.PROD           |
| theme            | Theme mode                                             | Enum_CarvIdTheme                       | Enum_CarvIdTheme.LIGHT |
| showWidget       | Show widget icon                                       | Boolean                                | false                  |
| widgetOptions    | Widget options                                         | I_CarvIdWidgetOptions                  | undefined              |
| authorizeConfig  | Configuration for authorization                        | I_CarvIdAuthorizeConfig                | undefined              |
| onLoad           | Callback that triggered after SDK initialized          | (data: CarvId) => void                 | undefined              |
| onAuthSuccess    | Callback that triggered after authorization successful | (data: I_AuthenticateResponse) => void | undefined              |
| onAuthFailed     | Callback that triggered after authorization failed     | (data: I_AuthenticateResponse) => void | undefined              |

#### 🔸 I_CarvIdWidgetOptions

``` typescript
interface I_CarvIdWidgetOptions {
  theme?: Enum_CarvIdTheme;
  size?: string;
  className?: string;
  draggable?: boolean;
  watchResize?: boolean;
  rememberPosition?: boolean;
  placement?: Enum_CarvIdIconPlacement;
  offset?: I_CarvIdIconPlacementOffset;
}
```

| Field            | Description                     | Type                        | Default                                      |
| ---------------- | ------------------------------- | --------------------------- | -------------------------------------------- |
| theme            | Theme mode                      | Enum_CarvIdTheme            | Enum_CarvIdTheme.LIGHT                       |
| size             | Icon size                       | String                      | "48px"                                       |
| placement        | Icon placement                  | Enum_CarvIdIconPlacement    | Enum_CarvIdIconPlacement.BOTTOM_RIGHT        |
| offset           | The offset config for placement | I_CarvIdIconPlacementOffset | { left: 20, right: 20, top: 40, bottom: 60 } |
| className        | The class name of widget        | String                      | ""                                           |
| draggable        | Enable drag interaction         | Boolean                     | true                                         |
| watchResize      | Watch the resize event          | Boolean                     | true                                         |
| rememberPosition | Remember icon position          | Boolean                     | true                                         |

<br/>

## 🧿 Turborepo

This project generated from a [Turborepo](https://turbo.build/repo/docs) starter. Run the following command to init a new project:

```bash
npx create-turbo@latest -e with-vite
```

And this project includes the following packages and apps:

#### - Apps

- `carv-id-sdk-demo`: used for testing SDK

#### - Packages

- `docs`: a vanilla [vite](https://vitejs.dev) ts app
- `web`: another vanilla [vite](https://vitejs.dev) ts app
- `@carvid/carv-id-tg-sdk`: a CARV ID core component
- `@carvid/utils`: a stub utility library shared by all applications
- `@carvid/eslint-config`: shared `eslint` configurations
- `@carvid/typescript-config`: `tsconfig.json`s used throughout the monorepo

<br/>

## 🦴 Utils

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

<br/>
