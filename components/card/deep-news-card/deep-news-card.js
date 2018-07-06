// component/deep-news-card/deep-news-card.js
import {
  baseUtils
} from '../../../utils/index.js';
import {
  http
} from '../../../common/js/http/index.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    news: {
      type: Object,
      value: {},
      observer: function() {
        this.updateRenderNews();
      }
    },
    // 新闻卡片日期格式
    timeDate: {
      type: String,
      value: 'time'
    },
    newsId: {
      type: 'String',
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    renderNews: {
      type: Object
    },
    thisYear: {
      type: 'String',
      value: String((new Date()).getFullYear())
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateRenderNews: function() {
      const copyOfNews = this.properties.news;
      const time = baseUtils.formatTime((new Date(Number(copyOfNews.update_time) * 1000)), 'hh:mm');
      const date = baseUtils.formatTime((new Date(Number(copyOfNews.update_time) * 1000)), 'MM-dd');
      const year = baseUtils.formatTime((new Date(Number(copyOfNews.update_time) * 1000)), 'yyyy');
      copyOfNews['time'] = time;
      copyOfNews['date'] = date;
      copyOfNews['year'] = year;
      this.setData({
        renderNews: copyOfNews,
        newsId: copyOfNews.news_id,
      });
    },
    operateNews: function (e) {
      const dataset = e.currentTarget.dataset;
      const attitude = dataset.attitude;
      const renderNews = this.data.renderNews;
      let param = {};
      if (attitude === 'is_collect') {
        const is_collect = renderNews.is_collect == 0 ? 1 : 0;
        param = {
          is_favorite: is_collect,
          source_id: this.data.newsId,
          source_type: 'news',
        };
        http.api['OPERATE_USER_FAVORITE'](param, (res) => {
          if (res.error_code == '0') {
            const copyOfNews = renderNews;
            copyOfNews.is_collect = is_collect;
            this.setData({
              renderNews: copyOfNews
            });
          }
        });
      } else {
        const source_type = dataset.source_type;
        param = {
          is_favorite: 1,
          source_id: this.data.newsId,
          source_type: source_type,
        };
        if (renderNews.user_attitude === attitude) {
          param.is_favorite = 0;
        }
        http.api['OPERATE_USER_FAVORITE'](param, (res) => {
          if (res.error_code == '0') {
            const copyOfNews = renderNews;
            if (!copyOfNews.user_attitude || copyOfNews.user_attitude != attitude) {
              copyOfNews[source_type] = Number(copyOfNews[source_type]) + 1;
              if (copyOfNews.user_attitude == 'up') {
                copyOfNews.attitude_up = Number(copyOfNews.attitude_up) - 1;
              }
              if (copyOfNews.user_attitude == 'down') {
                copyOfNews.attitude_down = Number(copyOfNews.attitude_down) - 1;
              }
              copyOfNews.user_attitude = attitude;
            } else {
              copyOfNews[source_type] = Number(copyOfNews[source_type]) - 1;
              copyOfNews.user_attitude = '';
            }
            this.setData({
              renderNews: copyOfNews
            });
          }
        });
      }
    }
  }
})