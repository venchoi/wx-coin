import {
  http
} from './http/index';
import {
  each,
  merge
} from '../../utils/baseUtils.js';

const listenList = {};
const listenIndex = {};
const addListenCoin = function(code, coinP) {
  const coinCode = String(code).toUpperCase();
  if (!listenIndex[coinCode]) {
    listenList[coinCode] = coinP;
    listenIndex[coinCode] = 1;
    if (!coinP.code) {
      coinP.lowerCode = coinCode.toLowerCase();
    }
  } else {
    listenIndex[coinCode] += 1;
  }
};
const removeListenCoin = function (code) {
  const coinCode = String(code).toUpperCase();
  if (!listenIndex[coinCode]) {
    return;
  }
  if (listenIndex[coinCode] === 1) {
    delete listenIndex[coinCode];
    delete listenList[coinCode];
  } else {
    listenIndex[coinCode] -= 1;
  }
}
const updateCoins = () => {
  setInterval(() => {
    const coins = [];
    each(listenList, (coinP, code) => {
      coins.push(code);
    });
    const options = {
      type: '1',
      codes: coins,
      source_type: '1',
    };
    if (coins.length) {
      http.api['GET_REALTIME_QUOTATIONS'](options, (res) => {
        if (res.error_code == 0 && res.data && res.data.length) {
          const coinsData = res.data;
          each(coinsData, (coinData) => {
            const copyOfCoin = coinData;
            const code = copyOfCoin.code;
            for (let i = 1; i < coins.length; i += 1) {
              const coinCode = coins[i];
              if (code == coinCode) {
                listenList[coinCode] = coinData;
              }
            }
          });
        }
      });
    }
  }, 10000);
};
const mergeNews = function(newsIds, newsData, isIndex, cb) {
  const userNewsListOptions = {
    type: 'news',
    favorite_types: ['collect', 'attitude_up', 'attitude_down'],
    source_ids: newsIds,
  };
  // 将这一步提到handler?
  http.api['GET_USER_FAVORITE'](userNewsListOptions, (response) => {
    if (isIndex) {
      each(newsData.dataList, (list) => {
        each(list.news_list, (news) => {
          each(response.data, (value) => {
            if (news.news_id == value.news_id) {
              merge(news, value, true);
            }
          });
        });
      });
    } else {
      each(newsData, (list) => {
        each(list, (news) => {
          each(response.data, (value) => {
            if (news.news_id == value.news_id) {
              merge(news, value, true);
            }
          });
        });
      });
    }
    if (typeof cb === 'function') {
      cb();
    }
    // todo 将用户喜好的数据同步到渲染列表里
  });
};
const rate = function() {

};
module.exports = {
  updateCoins: updateCoins,
  mergeNews: mergeNews,
  addListenCoin: addListenCoin,
  listenList: listenList,
}