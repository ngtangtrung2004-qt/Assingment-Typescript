module.exports = {
    mode: "development", //chế độ đang phát triển

    entry: {
        main: "./src/frontend/App.ts", //xử lý cho phần chơi
        user: "./src/frontend/UserApp.ts" //xử lý đc tên dăng nhập người chơi
    },

    output: {
        filename: "[name].bundle.js", //được lưu tên tại bundle.js
        chunkFilename: '[name].chunk.js',
        path: __dirname + "/dist/frontend", //đặt các thư mục trong đường dẫn này
        publicPath: "/assets/"
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".js", ".tsx"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                },
                {
                    loader: "css-loader"
                }]
            }
        ]
    },

    optimization: {
        splitChunks: {
            chunks: "all"
        },
        usedExports: true
    }
}