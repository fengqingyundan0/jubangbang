Page({
  data: {
    maskFlag: false,
    user_id: '',
    task_id: '',
    server_id: '',
    order: '',
    progress: '',
    interval: '',
    interval_b: '',
    timeStamp: '',
    Minute: '05',
    Second: '00',
    animationData: {},
    stars: [0, 1, 2, 3, 4],
    normalSrc: 'http://mq.mouqukeji.com/static/image/wjx4.png',
    selectedSrc: 'http://mq.mouqukeji.com/static/image/wjx1.png',
    halfSrc: 'http://mq.mouqukeji.com/static/image/wjx.png',
    key: 0, //评分
    content: '',
    showModal: false,
    reasons_a: [{
        name: 1,
        value: '长时间未被接单',
        checked: 'true'
      },
      {
        name: 2,
        value: '填错信息'
      },
      {
        name: 3,
        value: '其他'
      }
    ],
    reasons: [{
        name: 4,
        value: '服务人员超时',
        checked: 'true'
      },
      {
        name: 5,
        value: '服务人员态度差'
      },
      {
        name: 6,
        value: '下错单'
      },
      {
        name: 3,
        value: '其他'
      }
    ],
    cause: '',
    others: '',
    plength: 0,
    anonymous: '',
    bgimgA: "https://mq.mouqukeji.com/static/image/specialist.png",
    bgimgB: "https://mq.mouqukeji.com/static/image/takeorder.jpg",
    pay_type: 3,
    pay_fee: '',
    payType: [{
        id: 3,
        value: '余额'
      },
      {
        id: 1,
        value: '微信支付'
      }
    ]
  },

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
        }, 1500);
        var userInfo = wx.getStorageSync('userInfo');
        if (userInfo) {
          that.setData({
            avatar_url: userInfo.avatarUrl,
            nick_name: userInfo.nickName,
            userInfo: userInfo
          })
        }
        var coupon = wx.getStorageSync("thr_session").coupon;
        that.setData({
          maskq: coupon
        })
        console.log(options)
        that.setData({
          user_id: options.user_id,
          task_id: options.task_id,
          progress: options.progress,
          timeStamp: options.timeStamp ? Number(options.timeStamp) : ''
        });
        if (that.data.progress == 1 || that.data.progress == 5) {
          if (options.timeStamp && Number(options.timeStamp) <= new Date().getTime()) {
            var starttime = Number(options.timeStamp);
          } else {
            var starttime = new Date().getTime();
          }
          // var that = this;
          var interval = setInterval(function() {
            var nowtime = new Date().getTime();
            console.log(nowtime)
            var time = starttime + 300000 - nowtime;
            console.log(time);
            var day = parseInt(time / 1000 / 60 / 60 / 24);
            var hour = parseInt(time / 1000 / 60 / 60 % 24);
            var minute = parseInt(time / 1000 / 60 % 60);
            var seconds = parseInt(time / 1000 % 60);
            that.setData({
              Minute: minute,
              Second: seconds
            })
            var animation = wx.createAnimation({
              duration: 1000,
              timingFunction: 'ease',
            });

            animation.scale(1.5, 1.5).step(animation);
            animation.scale(1, 1).step(animation);
            that.setData({
              animationData: animation.export()
            });

            // 请求订单状态
            wx.request({
              //上线接口地址要是https测试可以使用http接口方式
              url: 'https://mq.mouqukeji.com/api/api/detailsInfo?',
              data: {
                task_id: options.task_id
              },
              method: 'GET',
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                that.setData({
                  order: res.data.data,
                  progress: res.data.data.progress,
                  server_id: res.data.data.server_id
                });
                console.log(res, "订单详情");
              }
            })
            if (that.data.progress == 7) {
              clearInterval(interval);
            }
            if (time < 0 || that.data.progress == 6) {
              clearInterval(interval);
              that.setData({
                Minute: '05',
                Second: '00'
              });
            }
          }, 1000);
          that.setData({
            interval: interval
          })
        } else if (that.data.progress == 2 || that.data.progress == 9) {
          clearInterval(that.data.interval);
          var interval_b = setInterval(function() {
            // 请求订单状态
            wx.request({
              //上线接口地址要是https测试可以使用http接口方式
              url: 'https://mq.mouqukeji.com/api/api/detailsInfo?',
              data: {
                task_id: options.task_id
              },
              method: 'GET',
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                that.setData({
                  order: res.data.data,
                  progress: res.data.data.progress,
                });
                console.log(res, "状态9、其他");

                if (res.data.data.progress == 8 || res.data.data.progress == 3) {
                  clearInterval(interval_b);
                  that.setData({
                    maskFlag: false
                  })
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
                    }
                  })
                  setTimeout(function() {
                    wx.hideLoading()
                  }, 1000)
                }
              }
            })
          }, 1000)
          that.setData({
            interval_b: interval_b
          })
        } else {
          wx.request({
            //上线接口地址要是https测试可以使用http接口方式
            url: 'https://mq.mouqukeji.com/api/api/detailsInfo?',
            data: {
              task_id: options.task_id
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              that.setData({
                order: res.data.data,
                pay_fee: res.data.data.pay_fee,
                progress: res.data.data.progress,
              });
              console.log(res, "状态不为1，2，9");
            }
          })
        }
      }
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 1500)
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
    this.cancleOrder();
  },
  radioChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      casue: e.detail.value
    })
  },
  /**
   * 对话框确认按钮点击事件
   */

  onConfirms: function() {
    this.hideModal();
    this.toPay();
  },
  radioChanges: function(e) {
    console.log(e.detail.value)
    this.setData({
      pay_type: e.detail.value
    })
  },
  inputChange: function(e) {
    if (e.value == '') {
      this.setData({
        others: ''
      })
    } else {
      this.setData({
        others: e.detail.value
      })
    }
  },
  cancleOrder: function() {
    var that = this;
    if (that.data.cause == '') {
      if (that.data.progress == 1) {
        that.setData({
          cause: 1
        })
      } else if (that.data.progress == 2) {
        that.setData({
          cause: 4
        })
      }
    }
    wx.request({
      url: 'https://mq.mouqukeji.com/api/api/cancelTask',
      data: {
        user_id: that.data.user_id,
        task_id: that.data.task_id,
        cause: that.data.cause,
        others: that.data.others
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res, "取消订单");
        clearInterval(that.data.interval);
        clearInterval(that.data.interval_b);
        that.setData({
          Minute: '05',
          Second: '00'
        });
        if (res.data.msg == "success") {
          wx.reLaunch({
            url: '../Index/Index?coupon=' + that.data.maskq + '&user_id=' + that.data.user_id,
          })
        }
      }
    })

  },
  toPay: function() {
    var task_id = this.data.task_id;
    var thr_session = wx.getStorageSync('thr_session');
    console.log(task_id);
    // console.log(thr_session.user_id)
    var that = this;
    wx.request({
      url: 'https://mq.mouqukeji.com/api/Api/payTask',
      data: {
        user_id: that.data.user_id,
        task_id: task_id,
        pay_type: Number(that.data.pay_type)
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
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
      },
    })
  },
  sureEnd: function() {
    var that = this;
    wx.request({
      url: 'https://mq.mouqukeji.com/api/api/confirm',
      method: 'GET',
      data: {
        task_id: that.data.task_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res);
        if (res.data.msg == 'success') {
          that.setData({
            maskFlag: false
          })
          wx.showLoading({
            title: '加载中',
            mask: true,
            success: function() {
              wx.request({
                //上线接口地址要是https测试可以使用http接口方式
                url: 'https://mq.mouqukeji.com/api/api/detailsInfo?',
                data: {
                  task_id: that.data.task_id
                },
                method: 'GET',
                header: {
                  'content-type': 'application/json'
                },
                success: function(res) {
                  that.setData({
                    order: res.data.data,
                    progress: res.data.data.progress,
                  });
                  console.log(res, "确认完成");
                }
              })
              setTimeout(function() {
                that.setData({
                  maskFlag: true,
                })
              }, 2000);
            }
          })
          setTimeout(function() {
            wx.hideLoading()
          }, 2000)
        }
      }
    })
  },
  showPhone: function() {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.order.telephone,
      success: function() {
        console.log("调取拨打电话成功");
      }
    })
  },
  checkboxChange: function(e) {
    var value = e.detail.value;
    if (value.length == 1) {
      this.setData({
        anonymous: e.detail.value
      })
    } else {
      this.setData({
        anonymous: 0
      })
    }
  },
  bindevaluate: function(e) {
    this.setData({
      content: e.detail.value,
      plength: e.detail.value.length
    })
  },
  selectLeft: function(e) {
    var key = e.currentTarget.dataset.key
    if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
      //只有一颗星的时候,再次点击,变为0颗
      key = 0;
    }
    this.setData({
      key: key
    })
  },
  //点击右边,整颗星
  selectRight: function(e) {
    var key = e.currentTarget.dataset.key
    this.setData({
      key: key
    })
  },
  startRating: function() {

    var that = this;
    var server_id = that.data.server_id;
    var task_id = that.data.task_id;
    var user_id = that.data.user_id;
    var content = that.data.content + '';
    wx.request({
      //上线接口地址要是https测试可以使用http接口方式
      url: 'https://mq.mouqukeji.com/api/api/evaluate',
      data: {
        server_id: server_id,
        user_id: user_id,
        task_id: task_id,
        score: that.data.key,
        content: content,
        anonymous: that.data.anonymous
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        // that.setData({ goodlist: res.data.data });
        console.log(res.data, "评价信息");
        if (res.data.msg == "success") {
          wx.showToast({
            title: '评价完成！',
            icon: 'success',
            duration: 5000,
            success: function() {
              wx.reLaunch({
                url: '../Index/Index?coupon=' + that.data.maskq + '&user_id=' + that.data.user_id,
              })
            }
          })
        }
      },
    })
  },
  govalueList: function() {
    wx.navigateTo({
      url: '../valueList/valueList?server_id=' + this.data.order.server_id,
    })
  },
  govalueDetail: function() {
    wx.navigateTo({
      url: '../valueDetail/valueDetail?orders_id=' + this.data.order.orders_id,
    })
  },
  copyText: function(e) {　　　　　　　　
    wx.setClipboardData({　　　　　　
      data: e.currentTarget.dataset.text,
      success: function(res) {　　　　　　　　
        wx.getClipboardData({　　　　　　　　　　
          success: function(res) {　　　　　　　　　　　　
            wx.showToast({　　　　　　　　　　　　　　
              title: '复制成功',
              icon: 'success',
              duration: 1000,
              mask: true　　　　　　　　　　　　
            })　　　　　　　　　　
          }　　　　　　　　
        })　　　　　　
      }　　　　
    })　　
  }
})