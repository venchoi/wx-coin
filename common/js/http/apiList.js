const apiList = {
  /**
 * 工具类相关
 */
  // 获取短信验证码      
  GET_SMS_CODE: '/tool/get_sms_code/wapi/api.html',
  // 校验短信验证码
  CHECK_SMS_CODE: '/tool/check_sms_code/wapi/api.html',
  // 图像验证码标识ID
  GET_VERIFY_ID: '/tool/get_verify_id/wapi/api.html',
  // 获取图像验证码
  GET_CHECK_IMG: ' /tool/verify/wapi/api.html',
  // 汇率
  USDT_EXCHANGE_RATE: '/coin/usdt_exchange_rate_by_code/wapi/api.html',
  /**
   * 新闻相关
   */
  // 新闻内页
  GET_NEWS_DETAIL: '/news/news_info/wapi/api.html',
  // 快讯列表
  GET_NEWS_LIST: '/news/news_list/wapi/api.html',
  GET_LASTEST_NEWS: '/news/latest_news_list/wapi/api.html',
  /**
 * 账号相关
 */
  // 注册
  CHECK_ACCOUNT: '/account/check_account/wapi/api.html',
  REGISTER: '/account/register/wapi/api.html',
  CHECK_ACCOUNT: '/account/check_account/wapi/api.html',
  // 登录
  LOGIN: '/account/login/wapi/api.html',
  // 获取用户信息
  GET_USER_INFO: '/account/get_user_info/wapi/api.html',
  // 退出登录
  LOGOUT: '/account/logout/wapi/api.html',
  // 重设密码 (未登录状态下)
  RESET_PASSWORD: '/account/reset_password/wapi/api.html',
  // 修改呢称
  CHANGE_NICK: '/account/change_user_nick/wapi/api.html',
  // 更换头像
  CHANGE_PORTRAIT: ' /account/change_head_pic/wapi/api.html',
  // 重置密码 （个人中心重置密码）
  UPDATE_PASSWORD: ' /account/update_password/wapi/api.html',
  // 修改简介
  CHANGE_USER_INFO: '/account/change_user_info/wapi/api.html',
  /**
 * 搜索相关
 */
  // 搜索
  SEARCH: '/search/s/wapi/api.html',
  // 搜索联想
  SEARCH_KEYWORD: '/search/keyword/wapi/api.html',
  /**
   * 币相关
   */
  /**
 * 行情相关
 */
  /**
 * 用户喜好相关
 */
  // 操作用户喜好
  OPERATE_USER_FAVORITE: '/user/do_user_favorite/wapi/api.html',
  // 获取用户喜好
  GET_USER_FAVORITE: '/user/get_user_own_favorite/wapi/api.html',
  // 获取用户收藏
  GET_USER_COLLECT: '/user/get_user_own_collect/wapi/api.html',
  GET_REALTIME_QUOTATIONS: '/market/get_realtime_quotation/wapi/api.html',

  // 获取最新新闻条数接口
  GET_NEWS_NUM: '/news/latest_news_num/wapi/api.html',

  // 币基础信息
  COIN_INFO: '/coin/coin_info/wapi/api.html',
  GET_COIN_NEWS: '/coin/coin_news/wapi/api.html',


  // 币相关新闻
  // SEARCH_COIN_NEWS: '/search/get_coin_news/wapi/ajax.html',
  // 首页行情列表
  // GET_QUOTATIONS: '/market/get_quotations/wapi/ajax.html',
  // 行情列表主页
  // GET_QUOTATIONS_LIST: '/market/quotations_list/wapi/ajax.html',
  // 币主页行情
  // GET_MIN_QUOTATION: '/market/get_min_quotation/wapi/ajax.html',
  // 设置密码
  // CREATE_PASSWORD: '/account/create_password/wapi/ajax.html',
  // 更新用户基本信息
  // UPDATE_INFO: '/account/update_user_basic_info/wapi/ajax.html',
  // 绑定手机号
  // BIND_PHONE: '/account/account_bind_phone/wapi/ajax.html',
  // 校验原手机号
  // CHECK_CURRENT_PHONE: '/account/check_user_current_phone/wapi/ajax.html',
};
module.exports = {
  apiList: apiList
};