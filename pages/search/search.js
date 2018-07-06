// pages/search/search.js
import {
  each
} from '../../utils/baseUtils.js';
import {
  http
} from '../../common/js/http/index.js';
import {
  mergeNews
} from '../../common/js/ppcUtil.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isInit: true,
    isTyping: false,
    searchHistory: [],
    fastNewsList: [],
    coinList: [],
    keyword: '',
    keywordList: [],
    noResult: false,
    noSingleResult: false,
    activeTab: 'news',
    inputFocus: false,
    searchHistory: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let searchHistory = [];
    try {
      var value = wx.getStorageSync('searchHistory');
      if (value) {
        this.setData({
          searchHistory: value,
        });
      } else {
        this.setData({
          searchHistory: [],
        });
      }
    } catch (e) {
      // Do something when catch error
      this.setData({
        searchHistory: [],
      });
    }
  },
  onShow: function() {
    this.setData({
      isInit: true,
    });
  },
  tapTab: function(e) {
    const target = e.currentTarget;
    const tab = target.dataset.tab;
    this.setData({
      activeTab: tab
    });
  },
  // todo 标记关键词
  submitKeyword: function(e) {
    setTimeout(() => {
      const val = e.detail.value;
      this.setData({
        keyword: e.detail.value,
      });
      const param = {
        keyword: this.data.keyword,
        type: '1',
      }
      http.api['SEARCH_KEYWORD'](param, (res) => {
        if (res.error_code === '0' && res.data && res.data.length > 0) {
          const keywordList = [];
          each(res.data, (keyword) => {
            const code = keyword.split(' ')[0].toLowerCase();
            keywordList.push([keyword, code]);
          });
          this.setData({
            keywordList: keywordList,
          });
        } else {
          this.setData({
            keywordList: [],
          });
        }
      });
    }, 300);
  },
  searchInputBlur: function() {
    this.setData({
      inputFocus: false,
      // keywordList: [],
    });
    // this.setData({
    //   keywordList: [],
    // });
  },
  submitSearch: function(e) {
    this.setData({
      isInit: false,
    });
    const temp = this.data.searchHistory;
    const keyword = this.data.keyword;
    temp.unshift(keyword);
    wx.setStorage({
      key: 'searchHistory',
      data: temp,
    });
    http.api['SEARCH']({
      keyword: keyword,
    }, (res) => {
      if (res.error_code && res.data && res.data.dataList) {
        const that = this;
        const newsData = res.data;
        const setNews = () => {
          // const copyOfFastNewsList = ;
          that.setData({
            fastNewsList: newsData.dataList,
            coinList: res.data.coins
          });
        };
        mergeNews(res.data.newsIds, newsData, true, setNews);
        // todo 关键词 橙色字体
        if (res.data.coins.length <= 0) {
          this.setData({
            noSingleResult: true
          });
        }
      } else {
        this.setData({
          fastNewsList: [],
          coinList: [],
          noResult: true,
          noSingleResult: true
        });
      }
    });
    // todo save history
  },
  searchInputFocus: function() {
    this.setData({
      inputFocus: true,
    });
  },
  onReachBottom: function() {
    if (this.data.activeTab === 'news') {}
    // this.request();
  },
  cancelSearch: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  emptyHistory: function() {
    this.setData({
      searchHistory: [],
    });
    wx.setStorage({
      key: 'searchHistory',
      data: [],
    });
  },
})