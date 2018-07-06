import {
  http
} from '../../common/js/http/index.js';
import {
  Base64
} from '../../utils/baseUtils.js';
import {
  updateCoins
} from '../../common/js/ppcUtil.js';
import {
  getUser
} from '../../common/js/plugins.js';
const telReg = /^1[34578]\d{9}$/;
Page({
  data: {
    logs: [],
    formError: false,
    errorTip: '错误提示',
    areaCode: '+86',
    areaCodes: ['+86', '+02'],
    account: '',
    userSysInfo: getUser()
  },
  onLoad: function() {
    if (this.data.userSysInfo.uuid) {
      wx.navigateTo({
        url: '/pages/user/user',
      })
    }
  },
  // phone 
  bindPhoneBlur: function(e) {
    const account = e.detail.value;
    if (!account) {
      this.setData({
        errorTip: '请输入手机号码',
        formError: true,
      });
    } else if (telReg.test(account)) {
      this.setData({
        errorTip: '',
        formError: false,
      });
    } else {
      this.setData({
        errorTip: '手机号码格式错误',
        formError: true,
      });
    }
  },
  bindPhoneInput: function(e) {
    this.setData({
      account: e.detail.value,
      formError: false,
    })
  },
  // end phone
  next: function() {
    if (!this.data.formError) {
      const param = {
        account: this.data.account,
        area_code: this.data.areaCode,
      };
      http.api['CHECK_ACCOUNT'](param, (res) => {
        if (res.error_code === '0' && res.data) {
          if (res.data.type === 1) {
            wx.navigateTo({
              url: `/pages/logs/login/login?account=${this.data.account}&areaCode=${this.data.areaCode}&nick=${res.data.nick}`
            })
          }
          if (res.data.type === 2) {
            wx.navigateTo({
              url: `/pages/logs/register/register?account=${this.data.account}&areaCode=${this.data.areaCode}`
            })
          }
        }
      });
    }
  }
})