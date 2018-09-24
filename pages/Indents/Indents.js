//获取应用实例
var app = getApp();
var time = require('../../utils/util.js');
var postsData = require('../../data/posts.js');
var user_id = wx.getStorageSync('thr_session').user_id;
Page({
  data: {
    /**
        * 页面配置
        */
    maskFlag: false,
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    shows: '',
    showView: true,
    page: 1
  },
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
        }, 1500)

        console.log(options)
        showView: (options.showView == "true" ? true : false)
        /**
         * 获取系统信息
         */
        wx.getSystemInfo({

          success: function (res) {
            that.setData({
              winWidth: res.windowWidth,
              winHeight: res.windowHeight
            });
          }

        });

        wx.request({
          //上线接口地址要是https测试可以使用http接口方式
          url: 'https://mq.mouqukeji.com/api/api/taskList?id=' + user_id,
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            that.setData({ goodlist: res.data.data });
            console.log(res.data.data, "订单列表");

          },

        })
      }
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1500)

  },
  onPostTap: function (e) {
    var that = this;
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var idx = e.currentTarget.dataset.idx;
    console.log(id, idx);
    wx.navigateTo({
      url: '../detail/detail?task_id=' + id + '&user_id=' + user_id + '&progress=' + that.data.goodlist[idx].progress + '&server_id=' + that.data.goodlist[idx].server_id + '&timeStamp=""'
    })
  },
  /**
     * 点击切换tab   res.data.data[that.data.indexSize].id
     */
  bindChange: function (e) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        that.setData({
          currentTab: e.currentTarget.dataset.current
        });
      }
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 500)
  },
  /**
   * 滑动切换
   */
  swichNav: function (e) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        console.log(e);
        that.setData({
          currentTab: e.detail.currentItemId,
          page: 1
        })
        wx.request({
          //上线接口地址要是https测试可以使用http接口方式
          url: 'https://mq.mouqukeji.com/api/api/taskList',
          data: {
            progress: e.detail.currentItemId,
            id: user_id
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            // console.log(res)
            that.setData({ goodlist: res.data.data });
            console.log(res.data.data, "状态切换");
          },

        })
      }
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)

  },
  searchScrollLower: function (e) {
    var that = this;
    // 显示加载图标
    var page = that.data.page + 1;
    wx.showLoading({
      title: '加载更多...',
      success: function () {
        wx.request({
          url: 'https://mq.mouqukeji.com/api/api/taskList',
          method: 'GET',
          data: {
            id: user_id,
            progress: e.currentTarget.dataset.current,
            page: page
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res,"加载")
            var goodlist = that.data.goodlist;
            for (var i = 0; i < res.data.data.length; i++) {
              goodlist.push(res.data.data[i]);
            }
            // 设置数据
            that.setData({
              goodlist: goodlist,
              page: page
            })
            if(res.data.data == ''){
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
  }
})
