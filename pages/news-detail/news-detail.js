// pages/news-detail/news-detail.js
import {
  http
} from '../../common/js/http/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsId: {
      type: String,
      value: '',
    },
    newsUuid: {
      type: String,
      value: '',
    },
    newsData: {
      type: Object,
      value: {
        channel_icon: '',
        coin: [],
        content: '',
        news_id: '',
        news_uuid: '',
        source_name: '',
        title: '',
        update_time: '',
      }
    },
    stringContent: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.updateNewsData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({
      newsUuid: this.options.uuid,
      newsId: this.options.id
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  updateNewsData: function() {
    const options = {
      news_uuid: this.options.uuid
    };
    http.api['GET_NEWS_DETAIL'](options, (res) => {
      if (res.error_code === '0') {
        const copyOfResContent = String(res.data.content).replace("&ldquo;", "\'").replace("&rdquo;", "\'");
        this.setData({
          newsData: res.data,
          stringContent: copyOfResContent,
        });
        wx.setNavigationBarTitle({
          title: res.data.title
        })
      }
    });
  },
})