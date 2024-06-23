import { join } from "node:path";
import { buildSync } from "esbuild";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      apply: "build",
      enforce: "post",
      transformIndexHtml() {
        buildSync({
          minify: true,
          bundle: true,
          entryPoints: [join(process.cwd(), "sw.js")],
          outfile: join(process.cwd(), "dist", "sw.js"),
        });
      },
    },
  ],
});
