const path = require("path");

/** @type {import('webpack').Configuration} */
const config = {
    entry: "./src/browser.ts",
    module: {
        rules: [
            { use: ["ts-loader"] }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist/browser"),
    },
    mode: "production",
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".js"]
    }
};

module.exports = config;