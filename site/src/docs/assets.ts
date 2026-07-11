import { basePath } from "./catalog";

const documentationAssets = {
  stylesheet: {
    fileName: "dragonglass.css",
    path: `${basePath}/dragonglass.css`,
  },
  script: {
    fileName: "dragonglass.js",
    path: `${basePath}/dragonglass.js`,
  },
} as const;

export { documentationAssets };
