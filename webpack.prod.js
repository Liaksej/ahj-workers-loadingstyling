const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const lightningcss = require("lightningcss");
const browserslist = require("browserslist");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.lightningCssMinify,
        minimizerOptions: {
          targets: lightningcss.browserslistToTargets(browserslist(">= 0.25%")),
        },
      }),
    ],
    usedExports: true,
  },
  plugins: [
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        { urlPattern: new RegExp(".*"), handler: "StaleWhileRevalidate" },
      ],
    }),
  ],
});
