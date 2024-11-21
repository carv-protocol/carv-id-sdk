<p align="center">
  <img src="./stories/assets/carv_id.svg" style="width:100px;" alt="CARV ID logo" />
</p>
<h1 align="center">CARV ID SDK</h1>


The SDK for CARV ID ecosystem.

- CARV ID SDK
- CARV ID SDK Widget

## Demo

 - <a href="https://carv-id-test.carv.io/">CARV ID SDK Demo</a>

<br/>


## Turborepo

This project generated from a [Turborepo](https://turbo.build/repo/docs) starter. Run the following command to init a new project:

```sh
npx create-turbo@latest -e with-vite
```
<br/>

## Configurations

-  carv-id-demo（测试 Demo）: [https://t.me/BabyChinBot/carv_id_demo](https://t.me/BabyChinBot/carv_id_demo)
-  carv-id-dev (测试环境 App): [https://t.me/carv_identity_dev_bot/carv_id](https://t.me/carv_identity_dev_bot/carv_id)
-  carv-id（正式环境 App）: [https://t.me/carv_identity_bot/carv_id](https://t.me/carv_identity_bot/carv_id)

<br/>

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `docs`: a vanilla [vite](https://vitejs.dev) ts app
- `web`: another vanilla [vite](https://vitejs.dev) ts app
- `@carvid/core`: a CARV ID core component
- `@carvid/utils`: a stub utility library shared by all applications
- `@carvid/eslint-config`: shared `eslint` configurations
- `@carvid/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

<br/>

## Usage

### UMD
```html
<script src="./src/dist/index.umd.js" defer></script>

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

### ES Module
```js
import {
  CarvId,
  Enum_Env,
  Enum_CarvIdTheme,
  Enum_CarvIdIconPlacement,
} from "@carvid/core";

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