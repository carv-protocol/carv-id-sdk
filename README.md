# CARV ID SDK

The SDK for CARV ID ecosystem.


## Turborepo

This project generated from a [Turborepo](https://turbo.build/repo/docs) starter. Run the following command to init a new project:

```sh
npx create-turbo@latest -e with-vite
```

## Configurations

-  carv-id-demo（测试 Demo）: [https://t.me/BabyChinBot/carv_id_demo](https://t.me/BabyChinBot/carv_id_demo)
-  carv-id-dev (测试环境 App): [https://t.me/carv_identity_dev_bot/carv_id](https://t.me/carv_identity_dev_bot/carv_id)
-  carv-id（正式环境 App）: [https://t.me/carv_identity_bot/carv_id](https://t.me/carv_identity_bot/carv_id)


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

### Usage

```js
import {
  CarvId,
  Enum_Env,
  Enum_CarvIdTheme,
  Enum_CarvIdIconPlacement,
} from "@carvid/core";

window.onload =function()=>{
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
    onSuccess: (data) => {
      console.log("onSuccess", data);
    },
  });
}
```