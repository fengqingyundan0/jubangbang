Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskFlag: false,
    showModal: false,
    userName: '',
    telephone: '',
    ser_name: '',
    ser_telephone: '',
    ceshi: '',
    cate_id: '',
    cate_name: '',
    server_time: '',
    start_title: '',
    start_adrs: '',
    start_lat: '',
    start_lng: '',
    end_title: '',
    end_adrs: '',
    end_lat: '',
    end_lng: '',
    price: '',
    pay_fee: '',
    distance: '',
    line_time: '',
    is_carry: '',
    num: '',
    coupon_id: '',
    _cate_name: '',
    _type: '',
    server_type: '',
    _server_type: '',
    demand: '',
    bargain: '',
    pay_type: 3,
    payType: [{
        id: 3,
        value: '余额'
      },
      {
        id: 1,
        value: '微信支付'
      }
    ],
    area: '',
    is_tool: ''
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
        }, 2000)
        console.log(options);

        that.setData({
          cate_id: options.cate_id,
          cate_name: options.cate_name,
          start_title: options.origin_title,
          start_adrs: options.origin_address + options.origin_floor,
          server_time: options.server_time,
          end_adrs: options.destination_address + options.destination_floor,
          start_lat: options.origin_tude_latitude,
          start_lng: options.origin_tude_longitude,
          end_title: options.destination_title,
          end_lat: options.destination_tude_latitude,
          end_lng: options.destination_tude_longitude,
          userName: options.userName,
          telephone: options.telephone,
          ser_name: options.userNameTwo,
          ser_telephone: options.telephoneTwo,
          price: options.carriage,
          pay_fee: options.carriage,
          distance: options.distance,
          line_time: options.line_time,
          is_carry: Number(options.is_carry),
          server_type: options.server_type ? Number(options.server_type) : 0,
          demand: options.demand ? options.demand : '',
          bargain: options.bargain ? Number(options.bargain) : 0,
          area: options.area ? Number(options.area) : 0,
          is_tool: options.is_tool ? Number(options.is_tool) : 0
        })
        var userInfo = wx.getStorageSync('userInfo');
        that.setData({
          avatar_url: userInfo.avatarUrl,
          nick_name: userInfo.nickName
        })
      }
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 2000)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("返回执行", this.data.num, this.data._type, this.data._server_type);
    var that = this;
    if (that.data._type == 1) {
      if (that.data._server_type == 4 && that.data.price < Number(that.data.num) || that.data._server_type == 4 && that.data.price == Number(that.data.num)) {
        that.setData({
          pay_fee: 0
        })
      } else {
        var price = (that.data.price - Number(that.data.num)).toFixed(2);
        that.setData({
          pay_fee: price
        })
      }
    } else if (that.data._type == 2) {
      var price = (that.data.price * that.data.num / 10).toFixed(2);
      that.setData({
        pay_fee: price
      })
    } else if (that.data._type == 4) {
      that.setData({
        pay_fee: that.data.price
      })
    }
  },
  bindTextAreaBlur: function(e) {
    remarks: e.detail.value
  },
  /**
   * 弹窗
   */

  showDialogBtn: function() {
    if (this.data.pay_fee === 0) {
      this.setData({
        payType: [{
            id: 3,
            value: '余额',
            checked: true
          },
          {
            id: 1,
            value: '微信支付',
            disabled: true
          }
        ]
      })
    }
    this.setData({
      showModal: true
    })

  },

  /**
   * 弹出框蒙层截断touchmove事件
   */

  preventTouchMove: function() {

  },

  /**
   * 隐藏模态对话框
   */

  hideModal: function() {

    this.setData({

      showModal: false

    });

  },

  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },

  /**
   * 对话框确认按钮点击事件
   */

  onConfirm: function() {
    this.hideModal();
    this.toPay();
  },
  radioChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      pay_type: e.detail.value
    })
  },
  toPay: function(res) {
    var that = this;
    var thr_session = wx.getStorageSync('thr_session');
    var cartes = wx.getStorageSync('cartss');
    var name = /^[u4E00-u9FA5]+$/;
    console.log(that.data.coupon_id);
    wx.request({
      url: 'https://mq.mouqukeji.com/api/Api/transportTask',
      data: {
        user_id: thr_session.user_id,
        cate_id: that.data.cate_id,
        server_time: that.data.server_time + ":00",
        start_title: that.data.start_title,
        start_adrs: that.data.start_adrs,
        start_lat: that.data.start_lat,
        start_lng: that.data.start_lng,
        end_title: that.data.end_title,
        end_adrs: that.data.end_adrs,
        end_lat: that.data.end_lat,
        end_lng: that.data.end_lng,
        name: that.data.userName,
        telephone: that.data.telephone,
        ser_name: that.data.ser_name,
        ser_telephone: that.data.ser_telephone,
        remarks: that.data.remarks,
        coupon_id: that.data.coupon_id ? that.data.coupon_id : 0,
        task_price: that.data.price,
        pay_fee: that.data.pay_fee,
        distance: that.data.distance,
        line_time: that.data.line_time,
        is_carry: that.data.is_carry,
        server_type: that.data.server_type ? that.data.server_type : 0,
        demand: that.data.demand,
        bargain: that.data.bargain,
        area: that.data.area,
        is_tool: that.data.is_tool,
        pay_type: Number(that.data.pay_type)
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res)
        var orderInfo = res.data.data.orderInfo;
        var timeStamp = orderInfo.create_time * 1000;
        if (that.data.pay_type == 1) {
          var payInfo = JSON.parse(res.data.data.payInfo);
          wx.requestPayment({
            'timeStamp': payInfo.timeStamp,
            'nonceStr': payInfo.nonceStr,
            'package': payInfo.package,
            'signType': payInfo.signType,
            'paySign': payInfo.paySign,
            'success': function(res) {
              console.log(res);
              wx.redirectTo({
                url: '../detail/detail?task_id=' + orderInfo.task_id + '&user_id=' + thr_session.user_id + '&timeStamp=' + timeStamp + '&progress=' + 1
              })
            },
            'fail': function(res) {
              console.log(res);
              if (res.errMsg == "requestPayment:fail cancel") {
                wx.showToast({
                  title: '支付取消',
                  icon: 'none',
                  duration: 1500
                })
              }
            }
          })
        } else if (that.data.pay_type == 3) {
          if (res.data.msg == "success") {
            wx.showToast({
              title: '支付成功',
              icon: 'none',
              duration: 1500,
              success: function() {
                wx.redirectTo({
                  url: '../detail/detail?task_id=' + orderInfo.task_id + '&user_id=' + thr_session.user_id + '&timeStamp=' + timeStamp + '&progress=' + orderInfo.progress
                })
              }
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500
            })
          }
        }
      }
    })
  },
  goDiscount: function() {
    var thr_session = wx.getStorageSync('thr_session');
    wx.navigateTo({
      url: '../Discount/Discount?user_id=' + thr_session.user_id + '&cate_id=' + this.data.cate_id + '&server_type=' + this.data.server_type
    })
  },
  recycle: function() {
    var that = this;
    var thr_session = wx.getStorageSync('thr_session');
    wx.request({
      url: 'https://mq.mouqukeji.com/api/Api/transportTask',
      data: {
        user_id: thr_session.user_id,
        cate_id: that.data.cate_id,
        server_time: that.data.server_time + ":00",
        start_title: that.data.start_title,
        start_adrs: that.data.start_adrs,
        start_lat: that.data.start_lat,
        start_lng: that.data.start_lng,
        end_title: that.data.end_title,
        end_adrs: that.data.end_adrs,
        end_lat: that.data.end_lat,
        end_lng: that.data.end_lng,
        name: that.data.userName,
        telephone: that.data.telephone,
        ser_name: that.data.ser_name,
        ser_telephone: that.data.ser_telephone,
        remarks: that.data.remarks,
        coupon_id: that.data.coupon_id ? that.data.coupon_id : 0,
        task_price: that.data.price,
        pay_fee: that.data.pay_fee,
        distance: that.data.distance,
        line_time: that.data.line_time,
        is_carry: that.data.is_carry,
        server_type: that.data.server_type,
        demand: that.data.demand,
        bargain: that.data.bargain,
        area: that.data.area,
        is_tool: that.data.is_tool
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res);
        if (res.data.msg == "success") {
          var orderInfo = res.data.data.orderInfo;
          var timeStamp = orderInfo.create_time * 1000;
          wx.showToast({
            title: '下单成功',
            icon: 'none',
            duration: 1500,
            success: function() {
              wx.redirectTo({
                url: '../detail/detail?task_id=' + orderInfo.task_id + '&user_id=' + thr_session.user_id + '&timeStamp=' + timeStamp + '&progress=' + orderInfo.progress
              })
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  }
})