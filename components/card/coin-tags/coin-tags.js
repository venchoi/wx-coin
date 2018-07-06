// component/card/coin-tags/coin-tags.js
import {
  baseUtils
} from '../../../utils/index.js';
import {
  addListenCoin,
  listenList,
} from '../../../common/js/ppcUtil.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    coins: {
      type: Array,
      value: [],
      observer: function() {
        this.updateCoins();
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    renderCoins: {
      type: Array,
      value: []
    },
    timer: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateData: function(that) {
      const copyOfCoins = that.data.coins;
      baseUtils.each(copyOfCoins, (coin) => {
        const coinCp = coin;
        if (parseFloat(coin.ratio) > 0) {
          coinCp.class = 'good';
        } else if (parseFloat(coin.ratio) < 0) {
          coinCp.class = 'bad';
        }
        coinCp.lowerCode = coinCp.code.toLowerCase();
        baseUtils.merge(coin, coinCp, true);
        addListenCoin(coin.code, coin);
      });
      that.setData({
        renderCoins: copyOfCoins
      });
    },
    updateCoins: function() {
      const that = this;
      that.updateData(that);
      const timer= setInterval(() => {
        const copyOfCoins = that.data.coins;
        baseUtils.each(copyOfCoins, (coin) => {
          const code = coin.code;
          const coinCp = listenList[code];
          baseUtils.merge(coin, coinCp, true);
        });
        that.setData({
          renderCoins: copyOfCoins
        });
      }, 10000);
      this.setData({
        timer: timer
      });
    }
  },
  // todo clearTimer
})