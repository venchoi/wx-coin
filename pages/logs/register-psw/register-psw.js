// pages/logs/register-psw/register-psw.js
import {
  http
} from '../../../common/js/http/index.js';
const pswReg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,16}$/;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaCode: '+86',
    inviteCode: '',
    password: '12345678',
    account: '15818225381',
    smsCode: '',
    formError: false,
    errorTip: '错误提示',
    isRegisterActive: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // todo 删掉注释
    // this.setData({
    //   areaCode: this.options.areaCode,
    //   account: this.options.account,
    //   smsCode: this.options.phsmsCodeone,
    // });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  register: function() {
    if (this.data.isRegisterActive) {
      const param = {
        area_code: this.data.areaCode,
        invite_code: this.data.inviteCode,
        password: this.data.password,
        phone: this.data.account,
        sms_code: this.data.smsCode,
      };
      http.api['REGISTER'](param, (res) => {
        if (res.error_code === '0') {
          // todo 注册成功
        } else {
          this.setData({
            errorTip: res.msg,
            formError: true,
          });
        }
      });
    }
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
        isRegisterActive: true,
      });
    }
  },
  bindInviteInput: function(e) {
    this.setData({
      inviteCode: e.detail.value,
    });
  }
})