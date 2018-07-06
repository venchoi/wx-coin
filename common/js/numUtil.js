const numUtil = {};
numUtil.format = (num, lan, decimal) => {
  const numStr = parseInt(Math.abs(parseFloat(num)), 10).toString();
  const numLength = numStr.length;
  let unit;
  let result;
  let fixed = 1;
  let i = 0;
  if (lan === 'en') {
    unit = ['k', 'm', 'g'];
  } else if (lan === 'cn') {
    unit = ['万', '亿'];
  }
  if (num === '-') {
    return num;
  }
  if (decimal) {
    for (i; i < decimal; i += 1) {
      fixed *= 10;
    }
  }
  if (numLength >= 5 && numLength < 9) {
    result = ((Math.round((num * fixed) / 10000)) / fixed) + unit[0];
  } else if (numLength > 8) {
    result = ((Math.round((num * fixed) / 100000000)) / fixed) + unit[1];
  } else {
    result = parseFloat(num).toFixed(decimal);
  }
  if (typeof result === 'number' && isNaN(result)) {
    result = '-';
  }
  return result;
};
numUtil.random = (min, max) => (Math.random() * (max - min)) + min;
numUtil.round = (num, decimals = 0) => Number(`${Math.round(`${num}e${decimals}`)}e-${decimals}`);

module.exports = { numUtil: numUtil };
