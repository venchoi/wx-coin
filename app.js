//app.js
import { getUser } from './common/js/common.js';
App({
  onPageNotFound() {
    // wx.switchTab({
    //   url: '/pages/index/index',
    // })
  },
  onShareAppMessage: function () {},
  onLaunch: function () {
  },
  globalData: {
    userSysInfo: getUser()
  }
})