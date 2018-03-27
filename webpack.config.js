const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
// 引擎
var plugins = [
	new webpack.BannerPlugin('版权所有，翻版必究'),
	new HtmlWebpackPlugin({
		title:"主页",
		template: __dirname + "/app/index.html", //new 一个这个插件的实例，并传入相关的参数
		filename:'index.html',
		favicon: 'favicon.ico',
		chunks: ['bundle'],//chunks 选项的作用主要是针对多入口(entry)文件。当你有多个入口文件的时候，对应就会生成多个编译后的 js 文件。那么 chunks 选项就可以决定是否都使用这些生成的 js 文件。
		excludeChunks:[],//排除掉某些 js 文件
		minify: {//压缩html
			removeAttributeQuotes: true // 移除属性的引号
		},
		hash: true,//是否生成hash值
		xhtml:false,//一个布尔值，默认值是 false ，如果为 true ,则以兼容 xhtml 的模式引用文件。
		showErrors:true,//showErrors 的作用是，如果 webpack 编译出现错误，webpack会将错误信息包裹在一个 pre 标签内，属性的默认值为 true ，也就是显示错误信息。
	}),
	// new HtmlWebpackPlugin({
	// 	template: __dirname + "/app/index1.tmpl.html", //new 一个这个插件的实例，并传入相关的参数
	// 	filename:'index1.html',
	// 	chunks: ['path/main']
	// }),
	new webpack.HotModuleReplacementPlugin(), //热加载插件
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.optimize.UglifyJsPlugin(),
	new ExtractTextPlugin("style.css"),
	new CleanWebpackPlugin(
		['./public/*.json'],　 //匹配删除的文件
		{
			root:path.resolve(__dirname),       　　　　　　　　　　//根目录
			verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
			dry:      false        　　　　　　　　　　//启用删除文件
		}
	)
]
// 入口
var entry = {
	'bundle':path.resolve(__dirname + "/app/index.js"),
	//'path/main':path.resolve(__dirname + "/app/main1.js"),
}
// 出口
var output = {
	path: __dirname + "/public",
	filename: "[name].js"
}
// 加载
var loaders = [{
	test: /\.json$/,
	loader: "json-loader"
}, {
	test: /\.js$/,
	exclude: /node_modules/,
	loader: 'babel'
}]
//引入的解析规则
var rules = [{
	test: /(\.jsx|\.js)$/,
	use: {
		loader: "babel-loader"
	},
	exclude: /node_modules/
}, {
	test: /\.css$/,
	use: [{
			loader: "style-loader"
		}, {
			loader: "css-loader",
			options: {
				modules: true
			}
		}, {
			loader: "postcss-loader"
		}

	]
}]
// 启动服务
var devServer = {
	contentBase: "./public",
	historyApiFallback: true,
	inline: true,
	hot: true
}

module.exports = {
	devtool: 'eval-source-map',
	entry:entry,
	output: output,
	module: {
		loaders: loaders,
		rules: rules
	},
	plugins: plugins,
	devServer: devServer,

}