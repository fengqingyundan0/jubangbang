Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: ''
  },
  bindItTap: function() {
    wx.navigateTo({
      url: '../Discount_s/Discount_s?user_id=' + this.data.user_id
    })
  },
  bindsInTap: function() {
    wx.navigateTo({
      url: '../recharge/recharge?id=' + this.data.user_id
    })
  },
  bindParTap: function() {
    wx.navigateTo({
      url: '../particulars/particulars?id=' + this.data.user_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function() {
        // var that = this;
        setTimeout(function() {
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
          url: 'https://mq.mouqukeji.com/api/Bill/billMoney',
          data: {
            user_id: user_id
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            console.log(res.data.data.total)
            var total = res.data.data.total
            that.setData(({
              total: total
            }))
          },

        })
      }
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function() {
        // var that = this;
        setTimeout(function() {
          that.setData({
            maskFlag: true,
          })
        }, 1000);

        wx.request({
          //上线接口地址要是https测试可以使用http接口方式
          url: 'https://mq.mouqukeji.com/api/Bill/billMoney',
          data: {
            user_id: that.data.user_id
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            console.log(res.data.data.total)
            var total = res.data.data.total
            that.setData(({
              total: total
            }))
          },

        })
      }
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 1000)
  }
})