// component/list/fast-news-list/fast-news-list.js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['fast-news-list'],
  properties: {
    fastNewsList: {
      type: Array,
      value: [],
      observer: function() {
        this.updateData();
      },
    },
    // 新闻卡片日期格式
    timeDate: {
      type: String,
      value: 'time'
    },
    noDate: {
      type: String,
      value: false,
      observer: function() {
        this.updateDate();
      },
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    renderList: {
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateData: function() {
      this.setData({
        renderList: this.properties.fastNewsList
      });
    },
    updateDate: function() {
      this.setData({
        noDate: this.properties.noDate
      });
    }
  }

})