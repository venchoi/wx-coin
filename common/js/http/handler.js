import { apiList } from './apiList';
import { each, merge } from '../../../utils/baseUtils.js';

const marketValFormat = (coinItem) => {
  const copyOfCoin = coinItem;
  const formartV = ['market_value', 'total_amount'];
  let price;
  if (copyOfCoin.price === '--' || typeof copyOfCoin.price === 'undefined') {
    price = '--';
  } else {
    price = copyOfCoin.price * rate;
    if (parseFloat(price) > 100) {
      price = price.toFixed(2);
    } else {
      price = price.toFixed(8);
    }
    price = `￥${price}`;
  }
  copyOfCoin.price = price;
  each(formartV, (v) => {
    if (copyOfCoin[v] !== '--') {
      copyOfCoin[v] = numUtil.format(copyOfCoin[v], 'cn', 2);
      copyOfCoin[v] = `￥${copyOfCoin[v]}`;
    }
  });
  merge(coinItem, copyOfCoin, true);
};

const specialHandler = {
  [apiList.GET_NEWS_LIST](res) {
  },
};
module.exports = {
  specialHandler: specialHandler,
};
