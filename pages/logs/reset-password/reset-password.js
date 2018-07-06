// pages/logs/reset-password/reset-password.js
import {
  http
} from '../../../common/js/http/index.js'
import hexMd5 from '../../../dist/dep/md5.js';
const pswReg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,16}$/;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: '',
    checkPassword: '',
    areaCode: '+86',
    account: '',
    smsCode: '',
    isFinishActive: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      account: this.options.account,
      areaCode: this.options.areaCode,
      smsCode: this.options.smsCode,
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
      });
    }
  },
  bindConfirmInput: function(e) {
    this.setData({
      checkPassword: e.detail.value,
      formError: false,
      errorTip: '',
    });
  },
  bindConfirmBlur: function(e) {
    const checkPsw = e.detail.value;
    if (checkPsw !== this.data.password) {
      this.setData({
        formError: true,
        errorTip: '密码不一致',
      });
    } else {
      // todo back to login page
      this.setData({
        formError: false,
        errorTip: '',
        isFinishActive: true,
      });
    }
  },
  finish: function() {
    if (this.data.isFinishActive) {
      const param = {
        area_code: this.data.areaCode,
        phone: this.data.account,
        sms_code: this.data.smsCode,
        password: hexMd5(this.data.password),
        repassword: hexMd5(this.data.checkPassword),
      };
      http.api['RESET_PASSWORD'](param, (res) => {
        if (res.error_code === '0' && res.data) {
          wx.showToast({
            icon: 'success',
            title: res.msg
          });
          wx.navigateTo({
            url: `/pages/logs/logs`
          })
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