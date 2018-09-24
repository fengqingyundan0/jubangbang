//app.js
var config = require('./utils/config.js');
App({
  onLaunch: function () {
    wx.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
        console.log("未过期")
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        console.log("失效");
      }
    })
  }
})