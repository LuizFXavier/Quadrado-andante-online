const path = require("path")

module.exports = {
    mode: "production",
    entry: './src/public/ts/main.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'games.js',
      path: path.resolve("./build/public/js/"),
    },
  };
