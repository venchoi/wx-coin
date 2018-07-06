let systemInfomation = {};

wx.getSystemInfo({
  success: function(res) {
    systemInfomation = res;
  }
})
const getUser = function() {
  let userSysInfo = {};
  try {
    var value = wx.getStorageSync('userSysInfo');
    if (value) {
      userSysInfo = value;
    }
  } catch (e) {
    // Do something when catch error
  }
  return userSysInfo;
};

module.exports = {
  systemInfo: systemInfomation,
  // userSysInfo: userSysInfo,
  getUser: getUser,
};