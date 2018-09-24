Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChecked: false,
    total: '',
    curent_id:1,
    recharge_fee:''
  },
  serviceSelection(e) {
    console.log(e)
    var that = this;
    this.setData({
      curent_id:e.currentTarget.dataset.id,
      recharge_fee: e.currentTarget.dataset.recharge_fee
    })
    wx.request({
      url: 'https://mq.mouqukeji.com/api/Bill/buyBalance',
      data: {
        user_id:that.data.user_id,
        pay_fee: e.currentTarget.dataset.recharge_fee
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        var payInfo = JSON.parse(res.data.data.payInfo);
        var pages = getCurrentPages(); // 当前页面
        var beforePage = pages[pages.length - 2];
        wx.requestPayment({
          'timeStamp': payInfo.timeStamp,
          'nonceStr': payInfo.nonceStr,
          'package': payInfo.package,
          'signType': payInfo.signType,
          'paySign': payInfo.paySign,
          success: function (res) {
            wx.navigateBack()
          },
          'fail': function (res) {
          }
        })
      }
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        // var that = this;
        setTimeout(function () {
          that.setData({
            maskFlag: true,
          })
        }, 1000);
        console.log(options)
        var user_id = options.id;
        that.setData({
          user_id: user_id
        })

        wx.request({
          //上线接口地址要是https测试可以使用http接口方式
          url: 'https://mq.mouqukeji.com/api/Bill/balancePage',
          data: { user_id: user_id },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data.data.recharge)
            var total = res.data.data.total
            that.setData(({
              total: total,
              goodList: res.data.data.recharge,
              recharge_fee: res.data.data.recharge[0].recharge_fee
            }))
          },

        })
      }
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
  }
})