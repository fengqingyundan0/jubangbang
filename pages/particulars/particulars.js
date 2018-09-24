Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1
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
          url: 'https://mq.mouqukeji.com/api/Bill/billList',
          data: { user_id: user_id },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data.data)
            // var total = res.data.data.total
            that.setData(({
              goodLists: res.data.data
            }))
          },

        })
      }
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var page = that.data.page + 1;
    wx.showLoading({
      title: '加载更多...',
      success: function () {
        wx.request({
          url: 'https://mq.mouqukeji.com/api/Bill/billList',
          method: 'GET',
          data: {
            user_id: that.data.user_id,
            page: page
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res, "加载")
            var goodLists = that.data.goodLists;
            for (var i = 0; i < res.data.data.length; i++) {
              goodLists.push(res.data.data[i]);
            }
            that.setData({
              goodLists: goodLists,
              page: page
            })
            if (res.data.data == '') {
              wx.showToast({
                title: '没有更多了',
                icon: 'none'
              })
            }
          }
        })
      }
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },
})