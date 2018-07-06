// pages/coin/coin.js
import {
  http
} from '../../common/js/http/index.js';
import {
  mergeNews
} from '../../common/js/ppcUtil.js';
// todo 触底加载更多
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coin: {
      type: Object,
      value: {},
    },
    fastNewsList: [],
    code: '',
    activeTab: 'news',
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      code: this.options.code,
    });
    this.requestCoinInfo();

  },
  requestCoinInfo: function() {
    const param = {
      code: this.data.code
    };
    http.api['COIN_INFO'](param, (res) => {
      if (res.error_code === '0') {
        const copyOfRes = res.data;
        let copyOfResContent = String(res.data.content).replace("&ldquo;", "\'").replace("&rdquo;", "\'");
        let copyOfResDescription = String(res.data.description).replace("&ldquo;", "\'").replace("&rdquo;", "\'");
        const headReg = /<h[1-6]+>/gi;
        const endHeadReg = /<\/h[1-6]+>/gi;
        copyOfRes.content = copyOfResContent.replace(headReg, '<view class="head">').replace(endHeadReg, '</view>');
        copyOfRes.description = copyOfResDescription.replace(headReg, '<view class="head">').replace(endHeadReg, '</view>');
        if (parseFloat(copyOfRes.ratio) > 0) {
          copyOfRes.class = 'good';
        } else if (parseFloat(copyOfRes.ratio) < 0) {
          copyOfRes.class = 'bad';
        }
        this.setData({
          coin: copyOfRes
        });
      }
    });
    const newsParam = {
      code: this.data.code,
      page: this.data.page,
    };
    // todo tio coin是没有快讯的
    http.api['GET_COIN_NEWS'](newsParam, (res) => {
      if (res.error_code === '0' && res.data && res.data.dataList) {
        const that = this;
        const newsData = res.data;
        const setNews = () => {
          // const copyOfFastNewsList = ;
          that.setData({
            fastNewsList: newsData.dataList,
            page: this.data.page + 1
          });
        };
        mergeNews(res.data.newsIds, newsData, true, setNews);
      }
    });
  },
  tapTab: function(e) {
    const target = e.currentTarget;
    const tab = target.dataset.tab;
    this.setData({
      activeTab: tab
    });
  },
  operateCoin: function() {
    const coin = this.data.coin;
    const isCollect = coin.is_collect == '1' ? 0 : 1;
    const userCoinOptions = {
      source_id: coin.coin_id,
      source_type: 'coin', // 新闻或者是币
      is_favorite: isCollect,
    };
    http.api['OPERATE_USER_FAVORITE'](userCoinOptions, (res) => {
      if (res.error_code == 0) {
        const copyOfCoin = this.data.coin;
        copyOfCoin.is_collect = isCollect;
        this.setData({
          coin: copyOfCoin
        });
      }
    });
  },
  onPageScroll: function (options) {
    console.log(options);
  // wx.setNavigationBarColor({
  //   frontColor: '#ffffff',
  //   backgroundColor: '#ff0000',
  //   animation: {
  //     duration: 400,
  //     timingFunc: 'easeIn'
  //   }
  // })
  },
})