import { basePath } from "./catalog";
import type { ThemeName } from "../themes";

const documentationAssets = {
  stylesheet: {
    fileName: "dragonglass.css",
    path: `${basePath}/dragonglass.css`,
  },
  themeStylesheet: (themeName: ThemeName) => ({
    fileName: `dragonglass-theme-${themeName}.css`,
    path: `${basePath}/dragonglass-theme-${themeName}.css`,
  }),
  script: {
    fileName: "dragonglass.js",
    path: `${basePath}/dragonglass.js`,
  },
} as const;

export { documentationAssets };
