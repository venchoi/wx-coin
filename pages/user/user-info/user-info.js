// pages/user/user-info/user-info.js
import {
  getUser
} from '../../../common/js/plugins.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: getUser(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  logout: function() {
    http.api['LOGOUT']({}, (res) => {
      if (res.error_code === '0') {
        wx.navigateBack({
          delta: 1,
        })
      }
    });
  }
})