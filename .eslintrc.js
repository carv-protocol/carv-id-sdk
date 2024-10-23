/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@carvid/eslint-config/index.js"],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
      rules: {
        "@typescript-eslint/no-unused-vars": 0,
        "@typescript-eslint/ban-ts-comment": 0,
      },
    },
  ],
};
