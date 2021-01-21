module.exports = {
  "context": "D:\\private\\cli",
  "mode": "development",
  "entry": "D:\\private\\cli\\src\\index.js",
  "output": {
    "path": "D:\\private\\cli\\packages\\cli-plugin-default\\src\\dist",
    "filename": "[name].[fullhash:8].js"
  },
  "module": {
    "rules": [
      {
        "test": {},
        "use": [
          "D:\\private\\cli\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
          "css-loader"
        ]
      },
      {
        "test": {},
        "use": [
          {
            "loader": "url-loader",
            "options": {
              "limit": 4096,
              "quality": 80,
              "name": "[name].[hash:8].[ext]",
              "outputPath": "assets/img"
            }
          }
        ]
      },
      {
        "test": {},
        "use": [
          "file-loader"
        ]
      },
      {
        "test": {},
        "loader": "file-loader"
      },
      {
        "test": {},
        "use": [
          {
            "loader": "eslint-loader"
          },
          "babel-loader"
        ]
      },
      {
        "test": {},
        "use": [
          {
            "loader": "eslint-loader"
          },
          "ts-loader"
        ]
      },
      {
        "test": {},
        "loader": "vue-loader"
      }
    ]
  },
  "resolve": {
    "extensions": [
      ".js",
      ".ts",
      ".vue"
    ],
    "alias": {
      "@": "D:\\private\\cli\\src",
      "~": "D:\\private\\cli\\src\\assets"
    }
  },
  "optimization": {
    "minimize": true,
    "minimizer": [
      {
        "options": {
          "test": {},
          "extractComments": true,
          "parallel": true,
          "terserOptions": {
            "compress": {
              "drop_console": false,
              "drop_debugger": true
            }
          }
        }
      }
    ]
  },
  "devtool": "hidden-source-map",
  "plugins": [
    {
      "definitions": {}
    },
    {
      "options": {
        "filename": "assets/css/[name].[contentHash:8].css",
        "ignoreOrder": false,
        "chunkFilename": "assets/css/[name].[contentHash:8].css"
      },
      "runtimeOptions": {
        "insert": "document.head.appendChild(linkTag);",
        "linkType": "text/css",
        "attributes": ""
      }
    },
    {
      "dangerouslyAllowCleanPatternsOutsideProject": false,
      "dry": false,
      "verbose": false,
      "cleanStaleWebpackAssets": true,
      "protectWebpackAssets": true,
      "cleanAfterEveryBuildPatterns": [],
      "cleanOnceBeforeBuildPatterns": [
        "**/*"
      ],
      "currentAssets": [],
      "initialClean": false,
      "outputPath": ""
    },
    {
      "userOptions": {
        "filename": "index.html",
        "inject": true,
        "template": "D:\\private\\cli\\src\\page\\index.html"
      },
      "version": 5
    },
    {}
  ]
}