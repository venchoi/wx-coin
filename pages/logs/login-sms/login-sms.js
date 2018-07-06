// pages/logs/login-sms/login-sms.js
import {
  http
} from '../../../common/js/http/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaCode: '+86',
    account: '15818225381',
    formError: false,
    errorTip: '错误提示',
    smsRequestTip: '获取短信验证码',
    isSmsActive: false,
    verifyId: '',
    verifyCode: '',
    smsCode: '',
    isNextActive: false,
    isLoginActive: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.requestVerifyId();
    // this.setData({
    //   account: this.options.account,
    //   areaCode: this.options.areaCode,
    // });
  },
  requestVerifyId: function() {
    http.api['GET_VERIFY_ID']({}, (res) => {
      if (res.error_code === '0' && res.data) {
        this.setData({
          verifyId: res.data.id
        });
      }
    });
  },
  // img-validate
  bindImgInput: function(e) {
    const verifyCode = e.detail.value;
    this.setData({
      verifyCode: e.detail.value,
      formError: false,
    })
    if (verifyCode.length === 4) {
      this.setData({
        isSmsActive: true,
        formError: false,
      });
    }
  },
  bindImgBlur: function(e) {
    const verifyCode = e.detail.value;
    if (verifyCode.length !== 4) {
      this.setData({
        errorTip: '图片验证码错误',
        formError: true,
      });
    } else {
      this.setData({
        isSmsActive: true,
        formError: false,
      });
    }
  },
  requestVerifyId: function() {
    http.api['GET_VERIFY_ID']({}, (res) => {
      if (res.error_code === '0' && res.data) {
        this.setData({
          verifyId: res.data.id
        });
      }
    });
  },
  // end img-validate
  // sms-validate
  bindSmsInput: function(e) {
    this.setData({
      smsCode: e.detail.value,
      formError: false,
      errorTip: '',
    });
    if (e.detail.value.length === 6) {
      this.setData({
        isNextActive: true,
      });
    }
  },
  bindSmsBlur: function(e) {
    const smsCode = e.detail.value;
    if (smsCode.length !== 6) {
      this.setData({
        errorTip: '短信验证码长度错误',
        formError: true,
      });
    } else {
      this.setData({
        isLoginActive: true,
        formError: false,
      });
    }
  },
  countDown: function() {
    let i = 60;
    const that = this;

    function count() {
      that.setData({
        isSmsActive: false,
        smsRequestTip: `已发送${i}s`,
      });
      i -= 1;
      if (i < 0) {
        that.setData({
          isSmsActive: true,
          smsRequestTip: '获取短信验证码',
        });
        return;
      }
      setTimeout(() => {
        count();
      }, 1000);
    }
    count();
  },
  requestSmsCode: function() {
    if (this.data.isSmsActive) {
      const param = {
        area_code: this.data.areaCode,
        phone: this.data.account,
        type: 'log',
        verify_code: this.data.verifyCode,
        verify_id: this.data.verifyId
      };
      http.api['GET_SMS_CODE'](param, (res) => {
        if (res.error_code === '0') {
          this.countDown();
        } else {
          this.setData({
            errorTip: res.msg,
            formError: true,
          });
        }
      });
    }
  },
  // end sms-validate
  login: function() {
    if (this.data.isLoginActive) {
      const param = {
        account: this.data.account,
        area_code: this.data.areaCode,
        password: this.data.smsCode,
        type: 2,
      };
      http.api['LOGIN'](param, (res) => {
        wx.hideLoading();
        if (res.error_code === '0' && res.data) {
          wx.showToast({
            icon: 'success',
            title: '登录成功'
          });
          wx.setStorage({
            key: 'userSysInfo',
            data: res.data,
          }, {
            key: 'islog',
            data: true,
          });
          wx.navigateBack({
            delta: 2
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