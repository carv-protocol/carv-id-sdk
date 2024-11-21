<p align="center">
  <img src="./stories/assets/carv_id.svg" style="width:100px;" alt="CARV ID logo" />
</p>
<h1 align="center">CARV ID SDK</h1>


The SDK for CARV ID ecosystem.

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
<script src="carv-id-sdk.umd.js" defer></script>

<script>
 window.onload = function () {
  const instance = new CarvIdSDK.CarvId({
    showWidget: true,
    authorizeConfig: {
      client_id: "0a17299349c4b3e57bc8c25581b01bd0ec80c279",
      client_secret:
        "871cc95ca5a54866492bb052e0d487799e21a5c5896b7cd2ecbe813876a4b286",
      response_type: "code",
      state: "test app state",
      scope: "carv_id_basic_read email_basic_read evm_address_basic_read",
      redirect_uri: "https://t.me/BabyChinBot/carv_id_demo",
    },
  });
  console.log(instance, "CarvID SDK initialized");
</script>
```

#### 2、ES Module
```js
import {
  CarvId,
  Enum_Env,
  Enum_CarvIdTheme,
  Enum_CarvIdIconPlacement,
} from "@carv-id-sdk";

window.onload = function() => {
   // 初始化 CarvId 实例
  const CarvIdInstance = new CarvId({
    env: Enum_Env.DEV,
    theme: Enum_CarvIdTheme.LIGHT,
    showWidget: true,
    widgetOptions: {
      size: "60px",
      placement: Enum_CarvIdIconPlacement.BOTTOM_RIGHT,
    },
    onLoad: (data) => {
      console.log("onLoad", data);
    },
    onAuthSuccess: (data) => {
      console.log("onAuthSuccess", data);
    },,
    onAuthFailed: (data) => {
      console.log("onAuthFailed", data);
    },
  });
}
```

<br/>

## 🧿 What's inside?

This project generated from a [Turborepo](https://turbo.build/repo/docs) starter. Run the following command to init a new project:

```bash
npx create-turbo@latest -e with-vite
```

And this project includes the following packages and apps:

#### Apps

- `carvId-sdk-demo`: used for testing SDK

#### Packages

- `docs`: a vanilla [vite](https://vitejs.dev) ts app
- `web`: another vanilla [vite](https://vitejs.dev) ts app
- `@carvid/core`: a CARV ID core component
- `@carvid/utils`: a stub utility library shared by all applications
- `@carvid/eslint-config`: shared `eslint` configurations
- `@carvid/typescript-config`: `tsconfig.json`s used throughout the monorepo

<br/>

### 🦴 Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

<br/>
