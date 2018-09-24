// pages/Launch/Launch.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var config = require('../../utils/config.js');
var qmap = new QQMapWX({
  key: 'VBNBZ-FYPCG-BSQQ5-IAXIQ-ZMIG2-MNFBC'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    thr_session: null,
    currentCity: '',
    click: false,
    time: 3,
    interval: null,
    animationData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var thr_session = wx.getStorageSync("thr_session");
    console.log(thr_session);
    this.setData({
      thr_session: thr_session
    });
    console.log(this.data.thr_session);
    // 获取当前位置所在城市
    // var that = this;
    // wx.getLocation({
    //   type: "wgs84",
    //   success: function(res) {
    //     console.log(res);
    //     qmap.reverseGeocoder({
    //       location: {
    //         latitude: res.latitude,
    //         longitude: res.longitude
    //       },
    //       success: function(res) {
    //         wx.setStorageSync("city", res.result.address_component.city)
    //         that.setData({
    //           currentCity: res.result.address_component.city
    //         });
    //       },
    //     })

    //   },
    // });

  },
  bindload(e) {
    console.log(e.detail.userInfo);
    var that = this;
    var userInfo = e.detail.userInfo;
    this.setData({
      userInfo: userInfo
    });
    console.log(this.data.userInfo);
    wx.setStorageSync("userInfo", e.detail.userInfo);
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.login({
            success: function(res) {
              var code = res.code;
              console.log(code);
              wx.getUserInfo({
                withCredentials: "true",
                success: function(res) {
                  console.log(res);
                  wx.request({
                    url: config.URL + '/getSess',
                    method: "POST",
                    data: {
                      code: code,
                      encryptedData: res.encryptedData,
                      iv: res.iv
                    },
                    success: function(res) {
                      wx.setStorageSync('thr_session', res.data.data)
                      console.log(res);
                      wx.redirectTo({
                        url: '../Index/Index' + '?coupon=' + res.data.data.coupon +
                        //  '&currentCity=' + that.data.currentCity + 
                         '&user_id=' + res.data.data.user_id
                      })
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  goIndex() {
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    this.animation = animation;
    animation.scale(0.6).scale(1).step();
    this.setData({
      animationData: animation.export()
    })
    var that = this;
    setTimeout(function() {
      wx.redirectTo({
        url: '../Index/Index' + '?coupon=' + that.data.thr_session.coupon + 
        // '&currentCity=' + that.data.currentCity + 
        '&user_id=' + that.data.thr_session.user_id
      })

    }, 300)

  },
  goAgreement() {
    wx.navigateTo({
      url: '../Agreement/Agreement',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // onReady: function() {
  //   var that = this;
  //   setTimeout(function() {
  //     that.setData({
  //       click: !that.data.click
  //     })
  //     clearInterval(that.data.interval);
  //     that.setData({
  //       time: 0
  //     })
  //   }, 3000)

  //   if (that.data.click) {
  //     var interval = setInterval(function() {

  //       var seconds = that.data.time - 1;
  //       that.setData({
  //         time: seconds,
  //         interval: interval
  //       })
  //     }, 1000)
  //   }
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '居帮帮-搬运取送',
      path: 'pages/Launch/Launch?user_id=' + this.data.thr_session.user_id
    }
  }

})