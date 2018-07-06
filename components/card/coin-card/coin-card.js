// component/coin-card/coin-card.js
import {
  http
} from '../../../common/js/http/index.js';
import {
  baseUtils
} from '../../../utils/index.js';
import {
  addListenCoin,
  listenList,
} from '../../../common/js/ppcUtil.js';
// todo 头像
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    coin: {
      type: Object,
      value: {},
      observer: function() {
        this.updateRenderCoin();
      }
    },
  },
  data: {
    renderCoin: {
      type: Object
    },
    code: '',
    timer: {
      type: Object
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    updateRenderCoin: function() {
      const copyOfCoin = this.properties.coin;
      copyOfCoin.code = copyOfCoin.code.toLowerCase();
      this.setData({
        code: copyOfCoin.code
      });
      if (!copyOfCoin.big_logo_url && !copyOfCoin.small_logo_url) {
        copyOfCoin.small_logo_url = 'dist/images/concern.png';
      }
      if (parseFloat(copyOfCoin.ratio) > 0) {
        copyOfCoin.class = 'good';
      } else if (parseFloat(copyOfCoin.ratio) < 0) {
        copyOfCoin.class = 'bad';
      }
      this.setData({
        renderCoin: copyOfCoin
      });
      addListenCoin(copyOfCoin.code, copyOfCoin);
      this.updateCoin();
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
          const copyOfCoin = this.properties.coin;
          copyOfCoin.is_collect = isCollect;
          this.setData({
            renderCoin: copyOfCoin
          });
        }
      });
    },
    updateCoin: function() {
      const that = this;
      const timer = setInterval(() => {
        const copyOfCoins = that.data.renderCoin;
        const code = copyOfCoins.code.toUpperCase();
        const coinCp = listenList[code];
        baseUtils.merge(copyOfCoins, coinCp, true);
        that.setData({
          renderCoin: copyOfCoins
        });
      }, 10000);
      this.setData({
        timer: timer
      });
    }
  }
})