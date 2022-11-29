module.exports = {
  plugins: ["prettier"],
  extends: ["react-app", "prettier", "plugin:storybook/recommended"],
  rules: {
    "prettier/prettier": "error"
  }
};