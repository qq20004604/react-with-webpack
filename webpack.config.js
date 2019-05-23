// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path')
const fs = require('fs')

const getEntries = function () {
    // 获取page目录
    let root = path.join(`${__dirname}/src/page`)
    let list = [];
    // 读取该目录下所有文件和目录
    let allfiles = fs.readdirSync(root)
    // 遍历
    allfiles.forEach(filename => {
        let pname = path.join(`${root}/${filename}`)
        let info = fs.statSync(pname)
        // 查看该文件是不是目录
        if (info.isDirectory()) {
            // 是，则将该文件目录加入到dirs里
            list.push({
                filename,
                path: path.join(`${pname}/app.jsx`)
            })
        }
    })
    let entry = {}
    // 配置入口
    list.forEach(item => {
        entry[item.filename] = item.path;
    })
    // 配置 HtmlWebpackPlugin
    let plugins = list.map(item => {
        return new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, `./dist/${item.filename}.html`),
            template: `./index.html`,
            chunks: item.filename, // 实现多入口的核心，决定自己加载哪个js文件，这里的 page.url 指的是 entry 对象的 key 所对应的入口打包出来的js文件
            xhtml: true,    // 自闭标签
        })
    })

    let result = {
        entry,
        plugins
    }
    return result;
}
const entries = getEntries()

const config = {
    // 入口文件
    entry: entries.entry,
    // 出口文件
    output: {
        path: __dirname + '/dist',
        // 文件名，将打包好的导出为bundle.js
        filename: '[name].js'
    },
    // webpack-dev-server
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module: {
        // loader放在rules这个数组里面
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                // 写法一
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            minimize: true,
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            root: path.resolve(__dirname, './src/static'),   // url里，以 / 开头的路径，去找src/static文件夹
                            minimize: true, // 压缩css代码
                            // sourceMap: true,    // sourceMap，默认关闭
                            alias: {
                                '@': path.resolve(__dirname, './src/img') // '~@/logo.png' 这种写法，会去找src/img/logo.png这个文件
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './'
                            },
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',   // compiles Less to CSS
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            name: '[hash].[ext]',
                            outputPath: function (fileName) {
                                return 'img/' + fileName    // 后面要拼上这个 fileName 才行
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-withimg-loader',
                    }
                ]
            }
        ]
    },
    // 将插件添加到webpack中
    // 如果还有其他插件，将两个数组合到一起就行了
    plugins: ([
        ...[
            // HMR 需要的两个插件
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
        ],
        ...entries.plugins
    ]),
    resolve: {
        // 省略后缀名
        extensions: ['.js', '.jsx']
    }
}

if (process.env.npm_lifecycle_event === 'build') {
    console.log('building..............')
    config.plugins = config.plugins.concat([
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        }),
        new UglifyJSPlugin()
    ])
} else {
    config.entry.vendor = [
        'react',
        'react-dom',
    ]
}
console.log('\033[;31m 你可以通过以下链接来打开页面！')
Object.keys(entries.entry).forEach(key => {
    if (key !== 'vendor') {
        console.log(`http://localhost:8080/${key}.html`)
    }
})

module.exports = config
