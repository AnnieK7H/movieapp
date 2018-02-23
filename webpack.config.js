const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var randomColor = require('randomcolor');

var webpack = require('webpack'); //for JQuery

//for two separate css files:
var bootstrap = new ExtractTextPlugin("bootstrap.css");
var styles = new ExtractTextPlugin("style.css");

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/scripts/index.js',
    output: {
        filename: 'bundle.js',
        publicPath: 'http://localhost:8080/',
        path: path.resolve(__dirname, 'distr')
    },
	devServer: {
	  contentBase: "./distr"
	},
      module: {
        rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
            { 
                test: /\.css$/,
                use: bootstrap.extract({
                   fallback: 'style-loader',
                   publicPath: '/distr',
                   use: ['css-loader']
                })
            },
			{
                test: /\.scss$/, 
                use: styles.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                    publicPath: '/distr'
                })
            },
            { //for bootstrap fonts and icons
                test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                exclude: /node_modules/,
                loader: "file-loader?name=fonts/[name].[ext]"
            },
			{ //???
				test: /\.html$/,
				use: [
				  {
					loader: "html-loader"
				  }
				]
			},
            {
            test: /\.(jpg|jpeg|gif|png)$/,
            exclude: /node_modules/,
            loader:'url-loader?limit=1024&name=images/[name].[ext]'
            }
 ]
    },
    plugins: [
    bootstrap,
    styles,
	new HtmlWebpackPlugin({
        template:'./src/index.html',
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }),
  ]
}