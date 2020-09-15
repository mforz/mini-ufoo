const storage = require("./storage").default;

const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

const getGlobalInfo = (callback) => {
  // 获取用户信息
  wx.getSetting({
    success: (res) => {
      if (res.authSetting["scope.userInfo"]) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: (res) => {
            // , 7 * 24 * 3600 * 1000
            storage.setSessionStorage("userInfo", res.userInfo);
            callback && callback(res);
          },
        });
      }
    },
  });
  wx.getSystemInfo({
    success: (e) => {
      const capsule = wx.getMenuButtonBoundingClientRect();
      storage.setSessionStorage("custom", capsule);
      storage.setSessionStorage("statusBarH", e.statusBarHeight);
      storage.setSessionStorage("windowH", e.windowHeight);
      const customBarH = capsule.bottom + capsule.top - e.statusBarHeight;
      storage.setSessionStorage("customBarH", customBarH);
      if (!capsule) {
        storage.setSessionStorage("customBarH", e.statusBarHeight + 50);
      }
    },
  });
};

module.exports = {
  formatTime: formatTime,
  getGlobalInfo: getGlobalInfo,
};