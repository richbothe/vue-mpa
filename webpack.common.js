// This configuration is shared between development (webpack.dev.js) and production (webpack.prod.js) environments.

// We use Node's built-in 'path module' and prefix it with '__dirname'. This prevents file path issues between OS's and allows relative paths to work as expected.
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const glob = require('glob');

// Multi-page entry
function getEntry() {
  const entry = {};
  glob.sync('./src/pages/**/index.js').forEach((file) => {
    const name = file.match(/\/pages\/(.+)\/index.js/)[1];
    entry[name] = file;
  });
  return entry;
}

// Multi-page template
function getHtmlTemplate() {
  return glob
    .sync('./src/pages/**/index.html')
    .map((file) => {
      return { name: file.match(/\/pages\/(.+)\/index.html/)[1], path: file };
    })
    .map(
      (template) =>
        new HtmlWebpackPlugin({
          template: template.path,
          favicon: './src/favicon.ico',
          title: `${template.name}`+' | MPA',
          chunks: [template.name.toString()],
          filename: `${template.name}.html`,
          inject: 'body',
          minify: false
        })
    )
}

module.exports = {
  entry: getEntry(),
  module: {
    rules: [
      {
        test: /\.vue$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.svg$/i,
        include: path.resolve(__dirname, 'src/assets/img/icons'),
        exclude: /fonts/,
        type: 'asset',
        generator: {
          filename: 'assets/img/icons/[name].[contenthash:8].svg'
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        include: path.resolve(__dirname, 'src/assets/img'),
        exclude: /icons/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[contenthash:8].[ext]'
        }
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/i,
        include: path.resolve(__dirname, 'src/assets/fonts'),
        exclude: /img/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[contenthash:8].[ext]'
        }
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    ...getHtmlTemplate()
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm-bundler.js', // In-Dom and inline
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@fonts': path.resolve(__dirname, 'src/assets/fonts/'),
      '@icons': path.resolve(__dirname, 'src/assets/img/icons/'), // For application icons
      '@img': path.resolve(__dirname, 'src/assets/img/'), // For application images
      '@scss': path.resolve(__dirname, 'src/assets/scss/'),
      '@pages': path.resolve(__dirname, 'src/pages/')
    },
    extensions: ['*', '.js', '.vue', '.scss', '.css']
  }
};
