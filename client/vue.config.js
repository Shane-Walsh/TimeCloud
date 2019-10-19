module.exports = {
    devServer: {
      port: 8080,
      proxy: 'http://localhost:5500'
    },
    configureWebpack: {
      module: {
        rules: [
          {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader'
          }
        ]
      }
    },
    css: {
      loaderOptions: {
        sass: {
          prependData: "@import '@/assets/css/variables.scss';"
        }
      }
    }
  }