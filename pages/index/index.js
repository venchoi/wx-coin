//index.js
//获取应用实例
import {
  http
} from '../../common/js/http/index.js';
import {
  each,
  merge
} from '../../utils/baseUtils.js';
import {
  mergeNews,
  updateCoins
} from '../../common/js/ppcUtil.js';
Page({
  data: {
    hasData: true,
    isLogin: false,
    pressMinId: '',
    pressMaxTime: '',
    fastNewsList: [],
    newsIds: [],
    lastestCache: {},
    lastestNum: 0,
    onTop: true,
    scrollLimit: true,
    coinIds: []
  },
  onPageScroll: function(options) {
    setTimeout(() => {
      if (this.data.scrollLimit) {
        this.setData({
          scrollLimit: false
        });
        // todo compute and set limit true
      }
    }, 300);
  },
  onPullDownRefresh: function() {
    // 下拉刷新是指刷新页面，所有数据重置
    this.setData({
      hasData: true,
      pressMinId: '',
      pressMaxTime: '',
      // fastNewsList: [],
      newsIds: [],
      lastestCache: {},
      lastestNum: 0,
      onTop: true,
    });
    this.request(true);
  },
  onReachBottom: function() {
    this.request();
  },
  onLoad: function() {
    // todo showLoading
    this.request();
    setInterval(() => {
      this.requestLastestNum();
    }, 60000);
    updateCoins();
  },
  request: function(isRefresh) {
    const options = {
      type: 'fast',
      min_id: this.data.pressMinId,
    };
    http.api['GET_NEWS_LIST'](options, (res) => {
      if (res.error_code === '0' && res.data) {
        const newsData = res.data;
        // todo
        this.setData({
          newsIds: newsData.newsIds,
        });
        if (newsData.dataList && newsData.dataList.length > 0) {
          const that = this;
          const setNews = () => {
            const copyOfFastNewsList = that.data.fastNewsList;
            each(newsData.dataList, (newsList) => {
              if (isRefresh) {
                const otherDate = [];
                each(copyOfFastNewsList, (list, index) => {
                  console.log(list, newsList);
                  const copyDate = list.date
                  if (newsList.date == copyDate) {
                    merge(list, newsList, true);
                  }
                });
              } else {
                if (!copyOfFastNewsList.length) {
                  copyOfFastNewsList.push(...newsData.dataList);
                } else {
                  each(copyOfFastNewsList, (list) => {
                    if (list.date === newsList.date) {
                      list.news_list.push(...newsList.news_list);
                    } else {
                      copyOfFastNewsList.push(newsList);
                    }
                  });
                }
              }
            });
            that.setData({
              fastNewsList: copyOfFastNewsList
            });
          };
          mergeNews(that.data.newsIds, newsData, true, setNews);
          that.setData({
            pressMinId: newsData.min_id
          });
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.msg,
          duration: 2000
        });
      }
    });
  },
  requestLastestNews: function() {
    const lastesNewsOptions = {
      type: 'fast',
      max_time: this.data.pressMaxTime,
    };
    http.api['GET_LASTEST_NEWS'](lastesNewsOptions, (res) => {
      const data = res.data;
      if (data.dataList && data.dataList.length > 0) {
        const dataList = data.dataList;
        const firstDate = dataList[0];
        const firstNews = firstDate.news_list[0];
        this.setData({
          pressMaxTime: firstNews.update_time,
          // lastestNum: true
        });
        const copyOfCache = this.data.lastestCache;
        each(dataList, (list) => {
          const date = list.date;
          if (!copyOfCache[date]) {
            copyOfCache[date] = [];
          }
          copyOfCache[date].unshift(...list.news_list);
        });
        this.setData({
          lastestCache: copyOfCache
        });
      }
    });
  },
  requestLastestNum: function() {
    const options = {
      max_time: this.data.pressMaxTime,
      type: 'fast',
    };
    http.api['GET_NEWS_NUM'](options, (res) => {
      if (res.error_code === '0' && res.data.num > 0) {
        this.setData({
          lastestNum: res.data.num
        });
      }
    });
  },
  mergePressInterest: function(source_ids, srcNews) {},
  scrollTop: function() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
    wx.startPullDownRefresh();
  }
})