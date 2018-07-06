const {
  Base64,
  each,
  merge
} = require('../../../utils/baseUtils.js');
import {
  systemInfo,
  getUser
} from '../plugins.js';
import {
  apiList
} from './apiList.js';
import {
  specialHandler
} from './handler.js';

let system = systemInfo.system;
let device = '';
if (String(system).indexOf('ios')) {
  device = 'ios';
} else {
  device = 'android';
}
const http = {
  api: {}
};
each(apiList, (url, name) => {
  http.api[name] = function(options, cb) {
    let defaultData = {};
    let userSysInfo = getUser();
    if (userSysInfo.token) {
      defaultData = {
        uuid: userSysInfo.uuid,
        token: userSysInfo.token,
        version: "1.0.0",
        device: device,
        device_unique_identifier: "XIAOMI_2723",
      };
    } else {
      defaultData = {
        uuid: "0",
        token: "popapp",
        version: "1.0.0",
        device: device,
        device_unique_identifier: "XIAOMI_2723",
      };
    }
    const fullUrl = 'http://api.popcoin.live' + url;
    const data = defaultData;
    merge(data, options, true);
    const requestData = Base64.encode(JSON.stringify(data));
    wx.request({
      url: fullUrl,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8;' // 默认值
      },
      data: {
        "data": requestData
      },
      success: function(res) {
        const code = res.data.error_code;
        // todo 像快讯这样的接口，返回400之类的接口的同时也应该把快讯列表的data返回回来
        if (code == '400' || code == '401' || code == '403') {
          wx.setStorage({
            key: 'userSysInfo',
            data: {},
          });
          wx.showToast({
            icon: 'none',
            title: '请先登录',
            // success: function() {
            //   setTimeout(() => {
            //     wx.navigateTo({
            //       url: '/pages/logs/logs',
            //     });
            //   }, 1500);
            // }
          })
        }
        if (specialHandler[url]) {
          specialHandler[url](res.data);
        }
        if (typeof cb === 'function') {
          cb(res.data);
        }
      }
    })
  };
});
module.exports = {
  http: http,
}