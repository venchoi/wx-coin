// pages/logs/login/login.js
import {
  http
} from '../../../common/js/http/index.js';
import hexMd5 from '../../../dist/dep/md5.js';
const pswReg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,16}$/;
import { getUser } from '../../../common/js/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaCode: '+86',
    account: '',
    password: '',
    formError: false,
    errorTip: '',
    isLoginActive: false,
    nick: '',
    userSysInfo: getUser(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      account: this.options.account,
      areaCode: this.options.areaCode,
      nick: this.options.nick,
    });
  },
  bindPswInput: function(e) {
    this.setData({
      password: e.detail.value,
      formError: false,
      errorTip: '',
    });
  },
  bindPswBlur: function(e) {
    const psw = e.detail.value;
    if (!psw) {
      this.setData({
        formError: true,
        errorTip: '请输入密码',
      });
    }
    if (psw.length < 6 || psw.length > 16 || !pswReg.test(psw)) {
      this.setData({
        formError: true,
        errorTip: '密码格式不正确',
      });
    } else if (pswReg.test(psw)) {
      this.setData({
        formError: false,
        errorTip: '',
        isLoginActive: true,
      });
    }
  },
  login: function() {
    if (this.data.isLoginActive) {
      const param = {
        account: this.data.account,
        area_code: this.data.areaCode,
        password: hexMd5(this.data.password),
        type: 1,
      };
      http.api['LOGIN'](param, (res) => {
        if (res.error_code === '0' && res.data) {
          wx.showToast({
            icon: 'success',
            title: '登录成功',
            success: function() {
              wx.navigateBack({
                delta: 3
              });
            }
          });
          this.setData({
            userSysInfo: res.data
          });
          wx.setStorage({
            key: 'userSysInfo',
            data: res.data,
          }, {
            key: 'islog',
            data: true,
          });
        } else {
          wx.showToast({
            icon: 'none',
            title: res.msg
          });
        }
      });
    }
  },
})