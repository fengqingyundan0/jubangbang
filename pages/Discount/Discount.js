// pages/Wallet/Discount/Discount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskFlag: false,
    navbar: ['可用', '已使用', '已失效'],
    currentTab: 0,
    discountCan: null,
    user_id: '',
    is_use: 0,
    chosenId: '',
    _type: '',
    coupon_id: '',
    num: '',
    cate_id: '',
    server_type: ''
  },
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      is_use: e.currentTarget.dataset.idx
    });
    var that = this;
    if (this.data.currentTab == 1) {
      wx.request({
        //上线接口地址要是https测试可以使用http接口方式
        url: 'https://mq.mouqukeji.com/api/api/couponList',
        data: {
          user_id: that.data.user_id,
          is_use: that.data.is_use
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res.data.data, "已用");
          that.setData(({
            discountCan: res.data.data
          }))
        }
      })
    } else if (this.data.currentTab == 2) {
      wx.request({
        //上线接口地址要是https测试可以使用http接口方式
        url: 'https://mq.mouqukeji.com/api/api/couponList',
        data: {
          user_id: that.data.user_id,
          is_use: that.data.is_use
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res.data.data, "失效");
          that.setData(({
            discountCan: res.data.data
          }))
        }
      })
    } else if (this.data.currentTab == 0) {
      wx.request({
        //上线接口地址要是https测试可以使用http接口方式
        url: 'https://mq.mouqukeji.com/api/api/couponList',
        data: {
          user_id: that.data.user_id,
          is_use: that.data.is_use
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res.data.data, "可用");
          that.setData(({
            discountCan: res.data.data
          }))
        }
      })
    }
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
        }, 2000);
        console.log(options)
        var user_id = options.user_id;
        that.setData({
          user_id: user_id,
          cate_id: options.cate_id,
          server_type: options.server_type
        })

        wx.request({
          //上线接口地址要是https测试可以使用http接口方式
          url: 'https://mq.mouqukeji.com/api/api/couponList',
          data: {
            user_id: user_id
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            console.log(res.data.data, "可用优惠券");
            that.setData(({
              discountCan: res.data.data
            }))
          },

        })
      }
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 2000)
  },
  chosen: function(e) {
    console.log(e);
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2];
    if (this.data.cate_id > e.currentTarget.dataset.cate_id && e.currentTarget.dataset.cate_id == 26 && this.data.cate_id != 31) {
      this.setData({
        chosenId: e.currentTarget.dataset.idx,
        num: e.currentTarget.dataset.num,
        _type: e.currentTarget.dataset.type,
        coupon_id: e.currentTarget.dataset.id,
        _cate_name: e.currentTarget.dataset.cate_name,
        _server_type: e.currentTarget.dataset.server_type
      });
      prevPage.setData({
        num: e.currentTarget.dataset.num,
        coupon_id: e.currentTarget.dataset.id,
        _type: e.currentTarget.dataset.type,
        _cate_name: e.currentTarget.dataset.cate_name,
        _server_type: e.currentTarget.dataset.server_type
      });
      setTimeout(function() {
        wx.navigateBack();
      }, 500)
    } else if (this.data.cate_id == e.currentTarget.dataset.cate_id && this.data.cate_id != 31) {
      this.setData({
        chosenId: e.currentTarget.dataset.idx,
        num: e.currentTarget.dataset.num,
        _type: e.currentTarget.dataset.type,
        coupon_id: e.currentTarget.dataset.id,
        _cate_name: e.currentTarget.dataset.cate_name,
        _server_type: e.currentTarget.dataset.server_type
      });
      prevPage.setData({
        num: e.currentTarget.dataset.num,
        coupon_id: e.currentTarget.dataset.id,
        _type: e.currentTarget.dataset.type,
        _cate_name: e.currentTarget.dataset.cate_name,
        _server_type: e.currentTarget.dataset.server_type
      });
      setTimeout(function() {
        wx.navigateBack();
      }, 500)
    } else if (this.data.server_type == e.currentTarget.dataset.server_type && this.data.cate_id == e.currentTarget.dataset.cate_id) {
      this.setData({
        chosenId: e.currentTarget.dataset.idx,
        num: e.currentTarget.dataset.num,
        _type: e.currentTarget.dataset.type,
        coupon_id: e.currentTarget.dataset.id,
        _cate_name: e.currentTarget.dataset.cate_name,
        _server_type: e.currentTarget.dataset.server_type
      });
      prevPage.setData({
        num: e.currentTarget.dataset.num,
        coupon_id: e.currentTarget.dataset.id,
        _type: e.currentTarget.dataset.type,
        _cate_name: e.currentTarget.dataset.cate_name,
        _server_type: e.currentTarget.dataset.server_type
      });
      setTimeout(function() {
        wx.navigateBack();
      }, 500)
    } else {
      wx.showModal({
        title: '温馨提示：',
        content: '该业务类型不匹配',
        confirmText: '确定',
        confirmColor: '#e34545',
        showCancel: false
      })
    }
  },
  noUse: function(e) {
    console.log(e);
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2];
    this.setData({
      _type: e.currentTarget.dataset.type,
      coupon_id: e.currentTarget.dataset.id
    });
    prevPage.setData({
      coupon_id: e.currentTarget.dataset.id,
      _type: e.currentTarget.dataset.type
    });
    wx.navigateBack();
  },
  getDiscount: function() {
    wx.navigateTo({
      url: 'DiscountActivity/DiscountActivity',
    })
  }
})