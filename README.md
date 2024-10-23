# `Turborepo` Vite starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e with-vite
```

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

### Demo

```html
<carv-id theme="light" placement="top-left" offset=${JSON.stringify({ top: 100, right: 54 })}></carv-id>
```