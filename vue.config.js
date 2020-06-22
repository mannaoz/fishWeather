const testLocalhost = `http://47.106.85.2:3389`
module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        'api/s6': {
          target: 'https://free-api.heweather.net/s6',
          changeOrigin: true,
          pathRewrite: { "^/api/s6": "" }
        },
        'api/search': {
          target: 'https://restapi.amap.com/v3/config/district',
          changeOrigin: true,
          pathRewrite: { '^/api/search': '' }
        },
        'api/ip': {
          target: 'https://restapi.amap.com/v3/ip',
          changeOrigin: true,
          pathRewrite: { "^/api/ip": "" }
        },
        'api/icon': {
          target: 'https://cdn.heweather.com/cond_icon',
          changeOrigin: true,
          pathRewrite: { '^/api/icon': '' }
        },
        'api/test': {
          target: 'http://47.106.85.2:3389/test',
          changeOrigin: true,
          pathRewrite: { '^/api/test': '' }
        },
        'api/jwd': {
          target: 'http://api.map.baidu.com/geocoding/v3/',
          changeOrigin: true,
          pathRewrite: { '^/api/jwd': '' }
        },
        "/getCode": {
          target: `${testLocalhost}/getCode`,
          pathRewrite: { "^/getCode": "" }
        },
        "/register": {
          target: `${testLocalhost}/register`,
          pathRewrite: { "^/register": "" }
        },
        "/login": {
          target: `${testLocalhost}/login`,
          pathRewrite: { "^/login": "" }
        },
        "/test": {
          target: `${testLocalhost}/test`,
          pathRewrite: { "^/test": "" }
        },
        "/addType": {
          target: `${testLocalhost}/addType`,
          pathRewrite: { "^/addType": "" }
        },
        "/getTypeList": {
          target: `${testLocalhost}/getTypeList`,
          pathRewrite: { "^/getTypeList": "" }
        },
        "/addCargo": {
          target: `${testLocalhost}/addCargo`,
          pathRewrite: { "^/addCargo": "" }
        },
        "/getCargoList": {
          target: `${testLocalhost}/getCargoList`,
          pathRewrite: { "^/getCargoList": "" }
        },
        "/getTypeOptionList": {
          target: `${testLocalhost}/getTypeOptionList`,
          pathRewrite: { "^/getTypeOptionList": "" }
        },
        "/delCargoAll": {
          target: `${testLocalhost}/delCargoAll`,
          pathRewrite: { "^/delCargoAll": "" }
        },
        "/delCargo": {
          target: `${testLocalhost}/delCargo`,
          pathRewrite: { "^/delCargo": "" }
        },
        "/changeCargo": {
          target: `${testLocalhost}/changeCargo`,
          pathRewrite: { "^/changeCargo": "" }
        },
        "/changeDestroyAll": {
          target: `${testLocalhost}/changeDestroyAll`,
          pathRewrite: { "^/changeDestroyAll": "" }
        },
        "/getSearchCargoList": {
          target: `${testLocalhost}/getSearchCargoList`,
          pathRewrite: { "^/getSearchCargoList": "" }
        },
        "/getSearchTextList": {
          target: `${testLocalhost}/getSearchTextList`,
          pathRewrite: { "^/getSearchTextList": "" }
        },
        "/delTypeAll": {
          target: `${testLocalhost}/delTypeAll`,
          pathRewrite: { "^/delTypeAll": "" }
        },
        "/changeTypeDestroyAll": {
          target: `${testLocalhost}/changeTypeDestroyAll`,
          pathRewrite: { "^/changeTypeDestroyAll": "" }
        },
        "/changeType": {
          target: `${testLocalhost}/changeType`,
          pathRewrite: { "^/changeType": "" }
        },
        "/delType": {
          target: `${testLocalhost}/delType`,
          pathRewrite: { "^/delType": "" }
        },
        "/getSearchTypeList": {
          target: `${testLocalhost}/getSearchTypeList`,
          pathRewrite: { "^/getSearchTypeList": "" }
        },
        "/getLoginPerson": {
          target: `${testLocalhost}/getLoginPerson`,
          pathRewrite: { "^/getLoginPerson": "" }
        },
      }
    }
  }
}