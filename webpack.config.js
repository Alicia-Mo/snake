const path = require('path'); //plugin de manip de fichier
const webpack = require('webpack'); //webpack
const HtmlWebpackPlugin = require('html-webpack-plugin'); //Plugin de création HTML

const webappPath = '/src/'; //Chemin de l'app
const distPath = '/public/'; //Chemin de destination du build

// webpack.config.js
module.exports = {
  entry: path.join(path.join(__dirname, webappPath), './index.js'), //Fichier de point d'entrée du build
  //Les plugins pour "customiser" le bundling
  plugins: [
  	//Simplifie la creation de fichiers HTML pour service les bundles webpack. C'est en particulier utile pour les bundles webpack qui incluent un hash dans le nom de fichier qui change à chaque compilation. Vous pouvez soit laisser le plugin générer un fichier HTML pour vous, fournir votre propre template en utilisant les "templates loadash" ou utiliser votre propre loader.
  	new HtmlWebpackPlugin({
      //title: 'Hot Module Replacement',
      template: path.join(path.join(__dirname, webappPath), './index.html'),
  	  filename: 'index.html',
  	  inject: 'body'
    }),
    //Remplacement automatique de la page lorsqu'un fichier est modifié même un fichier css
    new webpack.HotModuleReplacementPlugin()
  ],

  //Configuration de la sortie
  output: {
    path: path.join(__dirname, distPath),
    filename: '[name].bundle.js',
    publicPath: '',
    sourceMapFilename: '[name].map', //Generation du fichier source map (pour le debug at runtime dans le navigateur)
  },

  //Configuration du serveur de dev
  devServer: {
    port: 3000,
    host: 'localhost',
    //Pour pouvoir revenir en arriere en cliquant sur "précédant" dans Chrome
    historyApiFallback: true,
    noInfo: false, //Donner des infos aux clients
    stats: 'minimal', //Calcul de statistiques minimum
    publicPath: '', //Chemin pulique fournie
    contentBase: path.join(__dirname, distPath), //Chemin complet du contenu de base
    hot: true //Activation du plugin de remplacement à chaud
  },

  //Configration du bundling
  module: {
    rules: [
      {
       test: /\.css$/,
          use: ['style-loader', 'css-loader']
       //Suivre les instructions de https://github.com/roylee0704/react-flexbox-grid
     },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
        {
            test: /\.(ttf|eot|fon)(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            }]
        },
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
               ["@babel/plugin-proposal-decorators", {legacy:true}],
               ["@babel/plugin-proposal-class-properties", {loose:true}],
               'react-hot-loader/babel'
            ],
          }
        }
      }]
  },
};
