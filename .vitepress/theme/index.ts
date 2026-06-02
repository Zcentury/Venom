import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { NImage } from "naive-ui";
// @ts-ignore: allow importing CSS in VitePress theme without a dedicated declaration file
import "./style.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {});
  },
  enhanceApp({ app, router, siteData }) {
    app.component("n-image", NImage);
  },
} satisfies Theme;
