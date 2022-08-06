const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    data: './packages/lambdas/DataService/src/main/Handler/index.ts',
    email: './packages/lambdas/EmailService/src/main/Handler/index.ts',
  },
  externals: ['aws-sdk', 'aws-lambda'],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [],
};
