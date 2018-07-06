import {
  http
} from '../../../common/js/http/index.js';
import {
  mergeNews
} from '../../../common/js/ppcUtil.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minTime: '',
    type: 'news',
    fastNewsList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.requestNewsList();
  },
  // todo bottom
  requestNewsList: function() {
    const param = {
      min_time: this.data.minTime,
      type: 'news',
    };
    http.api['GET_USER_COLLECT'](param, (res) => {
      if (res.error_code === '0' && res.data && res.data.dataList) {
        const that = this;
        const newsData = res.data;
        const setNews = () => {
          that.setData({
            fastNewsList: newsData.dataList,
          });
        };
        mergeNews(res.data.newsIds, newsData, false, setNews);
      }
    });
  }
})