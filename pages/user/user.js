// pages/user/user.js
import {
  getUser
} from '../../common/js/common.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoged: false,
    nickname: '',
    uuid: '',
    // todo default portrait
    portraitUrl: '',
    userSysInfo: getUser()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // if (this.data.userSysInfo.uuid) {
    //   this.setData({
    //     isLoged: true,
    //     nickname: this.data.userSysInfo.nickname,
    //     uuid: this.data.userSysInfo.uuid,
    //   });
    //   if (this.data.userSysInfo.head_pic_url.length) {
    //     this.setData({
    //       portraitUrl: this.data.userSysInfo.head_pic_url,
    //     });
    //   }
    // }
  },
  onShow: function() {
    const userSysInfo = getUser();
    if (userSysInfo.uuid) {
      this.setData({
        isLoged: true,
        nickname: userSysInfo.nickname,
        uuid: userSysInfo.uuid,
        userSysInfo: userSysInfo
      });
      if (userSysInfo.head_pic_url.length) {
        this.setData({
          portraitUrl: userSysInfo.head_pic_url,
        });
      }
    }
  },
  itemNavi: function(e) {
    const target = e.currentTarget;
    const url = this.data.isLoged ? 　target.dataset.url : '/pages/logs/logs';
    wx.navigateTo({
      url: url,
    })
  }
})