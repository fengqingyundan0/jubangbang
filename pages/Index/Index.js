var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var dateTimePicker = require('../../utils/dateTimePicker.js');
var getArrValue = require('../../utils/util.js');
// var coors;
var qmap = new QQMapWX({
  key: 'VBNBZ-FYPCG-BSQQ5-IAXIQ-ZMIG2-MNFBC'
})

Page({

  data: {
    maskFlag: false,
    user_id: '',
    polyline: [],
    markers: [{
      iconPath: "../../img/marker_red.png",
      id: 0,
      latitude: 39.989643,
      longitude: 116.480125,
      width: 23,
      height: 33
    }, {
      iconPath: "../../img/marker_yellow.png",
      id: 0,
      latitude: 39.90816,
      longitude: 116.434446,
      width: 24,
      height: 34
    }],
    avatar_url: "https://mq.mouqukeji.com/static/image/noheadimg.jpg",
    userInfo: '',
    menus: null,
    tabWidth: 0,
    windowHeight: '',
    currentTab: 27,
    sliderOffset: 0,
    currentCity: '',
    origin_title: '',
    placeholders: '',
    origin_address: '',
    origin_floor: '',
    origin_detail: '',
    origin_contact: '',
    origin_phone: '',
    origin_tude: null,
    destination_title: '',
    destination_floor: '',
    destination_address: '',
    destination_detail: '',
    destination_contact: '',
    destination_phone: '',
    destination_tude: null,
    // date: '2018-04-27',
    // time: '06:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2015,
    endYear: 2050,
    useCarTime: '',

    cate_name: '',
    price: '',
    base_price: '',
    base_km: '',
    distance: '',
    distance_t: -1,
    line_time: '',
    carriage: 0,
    fee: 0,
    userName: '',
    telephone: '',
    userNameTwo: '',
    telephoneTwo: '',
    same: false,
    showModal: false,
    hideInput: true,
    hideInput_b: true,
    hideInput_c: false,
    height_a: 120,
    height_b: 120,
    height_da: 120,
    height_db: 120,
    lineheight_da: 120,
    lineheight_db: 120,
    top: 120,
    top_b: 120,
    marginTop: 50,
    marginTop_b: 50,
    user_id: '',
    discountCan: null,
    is_use: 0,
    maskq: false,
    animationData: {},
    demand: '',
    server_address: '',
    server_title: '',
    server_floor: '',
    server_tude: null,
    serName: '',
    serPhone: '',
    bargain: 0,
    openmsg: '',
    serverType: [{
        id: 4,
        type_name: "保洁",
        price: 99
      }, {
        id: 6,
        type_name: "回收换钱",
        price: 0
      }, {
        id: 1,
        type_name: "跑腿",
        price: 5
      },
      {
        id: 2,
        type_name: "搬东西",
        price: 10
      },
      {
        id: 3,
        type_name: "日常修理",
        price: 30
      },
      {
        id: 5,
        type_name: "其他",
        price: 5
      },
    ],
    newsboardA: '请留下您的需求,居帮帮-江湖高手为您提供服务。例如：代买、代取送、保洁、修理等帮助需求。*注：用户提出的服务需求必须在法律允许范围内，居帮帮平台工作人员会进行审核。',
    newsboardB: '留言框：闲置纸板、塑料瓶不要丢! 一键上门回收！来居帮帮换些零花钱吧!',
    serFee: 0,
    type_id: 4,
    type_name: "保洁",
    cleanPrice: 99,
    lowest_price: 99,
    area: '',
    is_tool: 0,
  },
  /**
   * 新用户授权登录，查看优惠券
   */
  goDiscount: function() {
    wx.navigateTo({
      url: '../Discount_s/Discount_s?user_id=' + this.data.user_id
    })
  },
  /**
   * 地址选择推荐
   */
  goSuggestion: function(e) {
    console.log(e);

    var placeholder = e.currentTarget.dataset.placeholder
    var that = this;
    wx.navigateTo({
      url: '../suggestion/suggestion' + '?placeholder=' + placeholder + '&currentCity=' + that.data.currentCity,
    })
  },
  /**
   * 车型类目点击变更
   */
  navbarTap: function(e) {
    // 车型更换、搬货服务、总价改变
    console.log(e)
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function() {
        that.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          currentTab: e.currentTarget.id,
          cate_name: e.currentTarget.dataset.cate_name,
          price: Number(e.currentTarget.dataset.price),
          base_price: Number(e.currentTarget.dataset.base_price),
          base_km: e.currentTarget.dataset.base_km,
        });
      }
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 500)
  },
  /**
   * 车型滑动变更
   */
  switchtab: function(e) {
    console.log(e);
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function() {
        var menus = that.data.menus;
        var current = e.detail.current;
        var offsetW = current * 80;

        that.setData({
          currentTab: e.detail.currentItemId,
          slideOffset: offsetW,
          cate_name: menus[current].cate_name,
          price: Number(menus[current].price),
          base_price: Number(menus[current].base_price),
          base_km: menus[current].base_km,
        });
        console.log(that.data.base_price, that.data.price)
        console.log(that.data.distance_t)
        if (that.data.distance_t >= 0 && that.data.fee === 0) {
          var carriage = that.data.base_price;
          if (that.data.distance_t <= that.data.base_km) {
            that.setData({
              carriage: carriage.toFixed(2)
            })
            console.log(that.data.carriage)
          } else {
            var carriage = that.data.base_price + (that.data.distance_t - that.data.base_km) * that.data.price;
            that.setData({
              carriage: Number(carriage.toFixed(2)).toFixed(2)
            })
            console.log(that.data.carriage)
          }
        }

        if (that.data.distance_t >= 0 && that.data.fee == 100) {

          if (that.data.distance_t <= that.data.base_km) {
            var carriage = that.data.base_price;
            that.setData({
              carriage: carriage.toFixed(2)
            })
            console.log(that.data.carriage)
          } else {
            var carriage = that.data.base_price + (that.data.distance_t - that.data.base_km) * that.data.price;
            that.setData({
              carriage: Number(carriage.toFixed(2)).toFixed(2)
            })
          }
        }
      }
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 500)

  },
  /**
   * 请求当前所在位置信息
   */
  gotlocation: function() {
    var that = this;
    wx.getLocation({
      type: "wgs84",
      success: function(res) {
        console.log(res);
        qmap.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(res) {
            console.log(res);
            that.setData({
              currentCity: res.result.address_component.city
            });
          },
        })
      },
    })
  },
  /**
   * 联系人输入事件
   */
  userNameInput: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  serNameInput: function(e) {
    console.log(e)
    this.setData({
      serName: e.detail.value
    })
  },
  /**
   * 联系人电话输入事件
   */
  passWdInput: function(e) {
    this.setData({
      telephone: e.detail.value
    })
  },
  userNameInputT: function(e) {
    this.setData({
      userNameTwo: e.detail.value
    })
  },
  passWdInputT: function(e) {
    this.setData({
      telephoneTwo: e.detail.value
    })
  },
  serPhoneInput: function(e) {
    console.log(e)
    this.setData({
      serPhone: e.detail.value
    })
  },
  /**
   * 江湖高手服务大类tab
   */
  serverTypeTab: function(e) {
    console.log(e)
    this.setData({
      type_id: e.currentTarget.dataset.id,
      type_name: e.currentTarget.dataset.type_name,
      lowest_price: Number(e.currentTarget.dataset.price),
      serFee: Number(e.currentTarget.dataset.serfee ? e.currentTarget.dataset.serfee : 0),
      demand: e.currentTarget.dataset.id == 4 ? '' : this.data.demand
    });
    console.log(e.currentTarget.dataset.serfee)
  },
  /**
   * 高手服务地址输入事件
   */
  serverAdrInput: function(e) {
    this.setData({
      server_address: e.detail.value,
    })
    var that = this;
    qmap.geocoder({
      address: e.detail.value,
      success: function(res) {
        console.log(res);
        that.setData({
          server_title: res.result.title,
          server_tude: {
            latitude: res.result.location.lat,
            longitude: res.result.location.lng
          }
        })
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        console.log(res);
      }
    });
  },
  /**
   * 送达联系人同上复选框事件
   */
  checkboxChangeT: function(e) {
    var value = e.detail.value;
    if (value.length == 1) {
      this.setData({
        same: true,
        userNameTwo: this.data.userName,
        telephoneTwo: this.data.telephone
      })
    } else {
      this.setData({
        same: false
      })
    }
  },
  /**
   * 高手需求输入事件
   */
  newsboardInput: function(e) {
    this.setData({
      demand: e.detail.value
    })
  },
  /**
   * 高手自报价输入事件
   */
  bangPriceInput: function(e) {
    this.setData({
      serFee: Number(e.detail.value)
    })
    console.log(this.data.serFee)
  },
  /**
   * 高手服务议价复选框事件
   */
  checkboxChangeS: function(e) {
    console.log('可议价发生change事件，携带value值为：', e.detail.value);
    var value = e.detail.value;
    if (value.length == 1) {
      this.setData({
        bargain: Number(value[0])
      })
    } else {
      this.setData({
        bargain: 0
      })
    }
  },
  /**
   * 高手保洁需带工具复选框
   */
  checkboxChangeClean: function(e) {
    var value = e.detail.value;
    if (value.length == 1) {
      this.setData({
        is_tool: Number(value[0])
      })
    } else {
      this.setData({
        is_tool: 0
      })
    }
  },
  /**
   * 高手保洁打扫面积输入事件
   */
  bangAreaInput: function(e) {
    this.setData({
      area: Number(e.detail.value)
    })
  },
  /**
   * 立即用车按钮处理事件
   */
  goPayment: function(e) {
    var that = this;
    console.log(e);
    console.log(that.data.maskq, that.data.openmsg)
    if (that.data.maskq && that.data.openmsg === '该城市尚未开通') {
      wx.showModal({
        title: '温馨提示',
        content: that.data.openmsg,
        confirmText: '确定',
        confirmColor: '#e34545',
        showCancel: false,
        success: function() {

        }
      })
      return false;
    }
    if (this.data.origin_address && this.data.destination_address) {
      var userName = e.currentTarget.dataset.name;
      var telephone = e.currentTarget.dataset.telephone;
      var userNameTwo = e.currentTarget.dataset.usernametwo;
      var telephoneTwo = e.currentTarget.dataset.telephonetwo;
      if (userName == '' || userNameTwo == '') {
        wx.showToast({
          title: '请输入联系人姓名',
          icon: 'none',
          duration: 1000,
          mask: true
        })

        return false
      } else if (telephone == '' || telephoneTwo == '') {
        wx.showToast({
          title: '手机号不能为空',
          icon: 'none',
          duration: 1500
        })

        return false
      } else if (telephone.length != 11 || telephoneTwo.length != 11) {
        wx.showToast({
          title: '手机号长度有误！',
          icon: 'none',
          duration: 1500
        })
        return false;
      }

      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (!myreg.test(telephone) || !myreg.test(telephoneTwo)) {
        wx.showToast({
          title: '手机号有误，请检查！',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      wx.navigateTo({
        url: '../payment/payment' + '?cate_id=' + that.data.currentTab + '&cate_name=' + that.data.cate_name + '&origin_title=' + that.data.origin_title + '&origin_address=' + that.data.origin_address + '&origin_floor=' + that.data.origin_floor + '&origin_tude_latitude=' + that.data.origin_tude.latitude + '&origin_tude_longitude=' + that.data.origin_tude.longitude + '&destination_title=' + that.data.destination_title + '&destination_address=' + that.data.destination_address + '&destination_floor=' + that.data.destination_floor + '&destination_tude_latitude=' + that.data.destination_tude.latitude + '&destination_tude_longitude=' + that.data.destination_tude.longitude + '&server_time=' + that.data.useCarTime + '&carriage=' + that.data.carriage + '&is_carry=' + that.data.fee + '&distance=' + that.data.distance + '&line_time=' + that.data.line_time + '&userName=' + that.data.userName + '&telephone=' + that.data.telephone + '&userNameTwo=' + that.data.userNameTwo + '&telephoneTwo=' + that.data.telephoneTwo
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '请选择起点、终点',
        confirmText: '确定',
        confirmColor: '#e34545',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            var that = this;
            console.log(e)
            var userName = e.currentTarget.dataset.name;
            var telephone = e.currentTarget.dataset.telephone;
            var userNameTwo = e.currentTarget.dataset.usernametwo;
            var telephoneTwo = e.currentTarget.dataset.telephonetwo;
            if (userName == '' || userNameTwo == '') {
              wx.showToast({
                title: '请输入联系人姓名',
                icon: 'none',
                duration: 1000,
                mask: true
              })

              return false
            } else if (telephone == '' || telephoneTwo == '') {
              wx.showToast({
                title: '手机号不能为空',
                icon: 'none',
                duration: 1500
              })

              return false
            } else if (telephone.length != 11 || telephoneTwo.length != 11) {
              wx.showToast({
                title: '手机号长度有误！',
                icon: 'none',
                duration: 1500
              })
              return false;
            }

            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
            if (!myreg.test(telephone) || !myreg.test(telephoneTwo)) {
              wx.showToast({
                title: '手机号有误！',
                icon: 'none',
                duration: 1500
              })
              return false;
            }

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  /**
   * 立即服务按钮处理事件
   */
  goPayments: function(e) {
    var that = this;
    console.log(e)
    if (that.data.maskq && that.data.openmsg === '该城市尚未开通') {
      wx.showModal({
        title: '温馨提示',
        content: that.data.openmsg,
        confirmText: '确定',
        confirmColor: '#e34545',
        showCancel: false,
        success: function() {}
      })
      return false;
    }
    if (that.data.demand) {
      var userName = e.currentTarget.dataset.name;
      var telephone = e.currentTarget.dataset.telephone;
      var address = e.currentTarget.dataset.address;
      if (userName == '') {
        wx.showToast({
          title: '请输入联系人称呼',
          icon: 'none',
          duration: 1000,
          mask: true
        })

        return false
      } else if (telephone == '') {
        wx.showToast({
          title: '手机号不能为空',
          icon: 'none',
          duration: 1500
        })

        return false
      } else if (telephone.length != 11) {
        wx.showToast({
          title: '手机号长度有误！',
          icon: 'none',
          duration: 1500
        })
        return false;
      } else if (address == '' || !that.data.server_tude) {
        wx.showToast({
          title: '服务地址有误请检查',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      if (that.data.serFee && that.data.type_name != "换钱" || that.data.serFee == 0 && that.data.type_name != "回收换钱") {
        if (that.data.serFee < that.data.lowest_price) {
          wx.showToast({
            title: '愿报价少于最低报价',
            icon: 'none',
            duration: 2000
          })
          return false;
        }
      }

      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (!myreg.test(telephone)) {
        wx.showToast({
          title: '手机号有误，请检查！',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      /*
      wx.navigateTo({
        url: '../payment/payment' + '?cate_id=' + that.data.currentTab + '&cate_name=' + that.data.cate_name + '&origin_title=' + that.data.server_title + '&origin_address=' + that.data.server_address + '&origin_floor=' + that.data.server_floor + '&origin_tude_latitude=' + that.data.server_tude.latitude + '&origin_tude_longitude=' + that.data.server_tude.longitude + '&destination_title=' + that.data.destination_title + '&destination_address=' + that.data.destination_address + '&destination_floor=' + that.data.destination_floor + '&destination_tude_latitude=' + "" + '&destination_tude_longitude=' + "" + '&server_time=' + that.data.useCarTime + '&carriage=' + that.data.serFee + '&is_carry=' + that.data.fee + '&distance=' + that.data.distance + '&line_time=' + that.data.line_time + '&userName=' + that.data.serName + '&telephone=' + that.data.serPhone + '&userNameTwo=' + "" + '&telephoneTwo=' + "" + '&server_type=' + that.data.type_id + '&demand=' + that.data.demand + '&bargain=' + that.data.bargain
      })
      */
      wx.showModal({
        title: '温馨提示',
        content: '该类业务暂未开通，支持加速开通',
        confirmText: '确定',
        confirmColor: '#e34545',
        showCancel: true,
        success: function() {
          wx.request({
            url: 'https://mq.mouqukeji.com/api/api/serverTypeNum',
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            data: {
              user_id: that.data.user_id,
              server_type: that.data.type_id,
              ensure: 1
            },
            success: function(res) {
              console.log(res);
            }
          });
        },
        fail: function() {
          wx.request({
            url: 'https://mq.mouqukeji.com/api/api/serverTypeNum',
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            data: {
              user_id: that.data.user_id,
              server_type: that.data.type_id,
              ensure: 0
            },
            success: function(res) {
              console.log(res);
            }
          });
        }
      })
    } else if (that.data.type_name != "保洁") {
      wx.showModal({
        title: '温馨提示',
        content: '请输入需求/留言',
        confirmText: '确定',
        confirmColor: '#e34545',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log(e)
            var userName = e.currentTarget.dataset.name;
            var telephone = e.currentTarget.dataset.telephone;
            if (userName == '') {
              wx.showToast({
                title: '请输入联系人称呼',
                icon: 'none',
                duration: 1000,
                mask: true
              })

              return false
            } else if (telephone == '') {
              wx.showToast({
                title: '手机号不能为空',
                icon: 'none',
                duration: 1500
              })

              return false
            } else if (telephone.length != 11) {
              wx.showToast({
                title: '手机号长度有误！',
                icon: 'none',
                duration: 1500
              })
              return false;
            } else if (address == '' || !that.data.server_tude) {
              wx.showToast({
                title: '服务地址有误请检查',
                icon: 'none',
                duration: 1500
              })
              return false;
            }

            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
            if (!myreg.test(telephone)) {
              wx.showToast({
                title: '手机号有误，请检查！',
                icon: 'none',
                duration: 1500
              })
              return false;
            }
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      var userName = e.currentTarget.dataset.name;
      var telephone = e.currentTarget.dataset.telephone;
      if (userName == '') {
        wx.showToast({
          title: '请输入联系人称呼',
          icon: 'none',
          duration: 1000,
          mask: true
        })

        return false
      } else if (telephone == '') {
        wx.showToast({
          title: '手机号不能为空',
          icon: 'none',
          duration: 1500
        })

        return false
      } else if (telephone.length != 11) {
        wx.showToast({
          title: '手机号长度有误！',
          icon: 'none',
          duration: 1500
        })
        return false;
      } else if (address == '' || !that.data.server_tude) {
        wx.showToast({
          title: '服务地址有误请检查',
          icon: 'none',
          duration: 1500
        })
        return false;
      } else if (!that.data.area) {
        wx.showToast({
          title: '请输入打扫面积',
          icon: 'none',
          duration: 1500
        })
        return false;
      }

      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (!myreg.test(telephone)) {
        wx.showToast({
          title: '手机号有误，请检查！',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      wx.navigateTo({
        url: '../payment/payment' + '?cate_id=' + that.data.currentTab + '&cate_name=' + that.data.cate_name + '&origin_title=' + that.data.server_title + '&origin_address=' + that.data.server_address + '&origin_floor=' + that.data.server_floor + '&origin_tude_latitude=' + that.data.server_tude.latitude + '&origin_tude_longitude=' + that.data.server_tude.longitude + '&destination_title=' + that.data.destination_title + '&destination_address=' + that.data.destination_address + '&destination_floor=' + that.data.destination_floor + '&destination_tude_latitude=' + "" + '&destination_tude_longitude=' + "" + '&server_time=' + that.data.useCarTime + '&carriage=' + that.data.cleanPrice + '&is_carry=' + that.data.fee + '&distance=' + that.data.distance + '&line_time=' + that.data.line_time + '&userName=' + that.data.serName + '&telephone=' + that.data.serPhone + '&userNameTwo=' + "" + '&telephoneTwo=' + "" + '&server_type=' + that.data.type_id + '&demand=' + that.data.demand + '&bargain=' + that.data.bargain + '&area=' + that.data.area + '&is_tool=' + that.data.is_tool
      })
    }
  },
  /**
   * 点击头像前往个人中心
   */
  onIndentTap: function() {
    wx.navigateTo({
      url: '../personages/personages?avatar_url=' + this.data.avatar_url + '&nick_name=' + this.data.nick_name,
    })
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
        }, 2000);
        wx.getLocation({
          type: "wgs84",
          success: function(res) {
            console.log(res);
            qmap.reverseGeocoder({
              location: {
                latitude: res.latitude,
                longitude: res.longitude
              },
              success: function(res) {
                wx.setStorageSync("city", res.result.address_component.city)
                that.setData({
                  currentCity: res.result.address_component.city
                });
              },
            })

          },
        });
        var userInfo = wx.getStorageSync('userInfo');
        // console.log(userInfo);
        if (userInfo) {
          that.setData({
            avatar_url: userInfo.avatarUrl,
            nick_name: userInfo.nickName,
            userInfo: userInfo
          })
        }
        console.log(options)
        var coupon = options.coupon;
        var animation = wx.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        })
        that.animation = animation;
        animation.rotate(45).step();
        that.setData({
          maskq: coupon === "false" ? false : true,
          user_id: options.user_id,
          animationData: animation.export()
        })
        // if (options.currentCity) {
        //   var currentCity = options.currentCity;
        //   that.setData({
        //     currentCity: currentCity
        //   })
        // } else {
        //   var currentCity = wx.getStorageSync("city");
        //   that.setData({
        //     currentCity: currentCity
        //   })
        // }
        //请求车辆信息
        wx.request({
          url: 'https://mq.mouqukeji.com/api/Category/freightCate?cate_id=26&city=' + that.data.currentCity,
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            var res = res.data;
            console.log(res);
            var car = [];
            for (var i = 0; i < res.data.length; i++) {
              car.push('car' + res.data[i].id)
            }
            that.setData({
              openmsg: res.msg,
              menus: res.data,
              cate_name: res.data[0].cate_name,
              price: Number(res.data[0].price),
              base_price: Number(res.data[0].base_price),
              base_km: res.data[0].base_km,
            });
            wx.getSystemInfo({
              success: function(res) {
                that.setData({
                  windowHeight: res.windowHeight,
                  tabWidth: parseInt(res.windowWidth / 5.5),
                  tabWidths: parseInt(res.windowWidth * 0.9 / 6)
                });
              }
            })
          }
        });
        // 获取完整的年月日 时分秒，以及默认显示的数组
        var obj = dateTimePicker.dateTimePicker(that.data.startYear, that.data.endYear);
        // 精确到分的处理，将数组的秒去掉
        var lastArray = obj.dateTimeArray.pop();
        var lastTime = obj.dateTime.pop();
        console.log(obj)
        that.setData({
          dateTime: obj.dateTime,
          dateTimeArray: obj.dateTimeArray,
        });
        var useCarTime = getArrValue.getArrValue(that.data.dateTime, that.data.dateTimeArray);
        that.setData({
          useCarTime: useCarTime
        })
        console.log("onLoad执行")
      }
    })

    setTimeout(function() {
      wx.hideLoading();
      if (that.data.maskq && that.data.openmsg === '该城市尚未开通') {
        wx.showModal({
          title: '温馨提示',
          content: that.data.openmsg,
          confirmText: '确定',
          confirmColor: '#e34545',
          showCancel: false,
          success: function() {

          }
        })
      }
    }, 2000)

    /* polyline路线规划
      that = this
  
      wx.request({
  
        url: 'https://apis.map.qq.com/ws/direction/v1/driving/?from=39.989643,116.480125&to=39.90816,116.434446&output=json&callback=cb&key=T7EBZ-WN2R4-23ZUZ-DJSJQ-U5JI7-FFFT4',
  
  
        success: function (res) {
  
          console.log(res.data.result.routes[0].distance)
  
          coors = res.data.result.routes[0].polyline
  
          console.log(coors)
          for (var i = 2; i < coors.length; i++)
  
          { coors[i] = coors[i - 2] + coors[i] / 1000000 }
  
          console.log(coors)
  
          var b = []
  
          for (var i = 0; i < coors.length; i = i + 2) {
  
            b[i / 2] = {
  
              latitude: coors[i], longitude: coors[i + 1]
            }
  
          }
          console.log(b)
  
          that.setData({
            polyline: [{
              points: b,
              color: "#0091ff",
              width: 6,
              dottedLine: false
            }],
          })
        }
  
      })
      */
  },
  onShow: function() {
    console.log("onshow执行");
    var that = this;
    that.setData({
      hideInput_c: false
    })
    if (that.data.origin_address !== '') {
      that.setData({
        hideInput: false,
        height_a: 160,
        height_da: 80,
        lineheight_da: 80
      })
      if (that.data.destination_address == '') {

        that.setData({
          hideInput_b: true,
          height_b: 120,
          height_db: 120,
          lineheight_db: 120,
          top: 160,
          top_b: 60,
          marginTop_b: 50
        })
      }
    } else if (that.data.origin_address == '') {
      that.setData({
        hideInput: true,
        height_a: 120,
        height_da: 120,
        lineheight_da: 120,
        top: 120,
        marginTop: 50
      })
    }
    if (that.data.destination_address !== '') {
      that.setData({
        hideInput_b: false,
        height_b: 160,
        height_db: 80,
        lineheight_db: 80,
        top: 120,
        marginTop_b: 70,
        top_b: 90
      })
      if (that.data.origin_address == '') {
        that.setData({
          hideInput: true,
          height_a: 120,
          height_da: 120,
          lineheight_da: 120,
          marginTop: 50
        })
      }
    }
    if (that.data.destination_address !== '' && that.data.origin_address !== '') {
      that.setData({
        hideInput_b: false,
        height_b: 160,
        height_db: 80,
        lineheight_db: 80,
        top: 160,
        marginTop_b: 70,
        top_b: 110
      })
    }

    if (that.data.origin_address && that.data.destination_address) {

      wx.request({

        url: 'https://apis.map.qq.com/ws/direction/v1/driving/?from=' + that.data.origin_tude.latitude + ',' + that.data.origin_tude.longitude + '&to=' + that.data.destination_tude.latitude + ',' + that.data.destination_tude.longitude + '&output=json&callback=cb&key=VBNBZ-FYPCG-BSQQ5-IAXIQ-ZMIG2-MNFBC' + '&policy=LEAST_FEE',


        success: function(res) {
          console.log(res.data);
          var _distance = res.data.result.routes[0].distance;
          var line_time = res.data.result.routes[0].duration;
          // 选择完起点、终点 距离计算、总价计算
          var distance = Math.floor(Number(_distance) / 1000);
          console.log(distance);
          if (distance <= that.data.base_km) {
            var carriage1 = that.data.base_price;
            var carriage = carriage1;
            console.log(carriage1)
          } else {
            var carriage2 = Number(that.data.base_price) + (distance - that.data.base_km) * Number(that.data.price);
            console.log(carriage2);
            var carriage = carriage2;
          }
          if (that.data.fee) {
            var carriage = Number(carriage);
            console.log(carriage)
          }
          that.setData({
            distance: _distance,
            distance_t: distance,
            line_time: line_time,
            carriage: Number(carriage).toFixed(2)
          })
        }
      })
    } else {
      that.setData({
        carriage: ''
      })
    }
  },
  /*
  end: function() {

    var b = []

    for (var i = 0; i < coors.length; i = i + 2) {

      b[i / 2] = {

        latitude: coors[i],
        longitude: coors[i + 1]
      }

      console.log(b[i / 2])

    }

    console.log(b.length)

    that.setData({
      polyline: [{
        points: b,
        color: "#0091ff",
        width: 4,
        dottedLine: false
      }],
    })

  },
  */
  changeDate(e) {
    this.setData({
      date: e.detail.value
    });
  },
  changeTime(e) {
    this.setData({
      time: e.detail.value
    });
  },
  changeDateTime(e) {
    console.log(e)
    this.setData({
      dateTime: e.detail.value
    });
    var useCarTime = getArrValue.getArrValue(this.data.dateTime, this.data.dateTimeArray);
    this.setData({
      useCarTime: useCarTime
    })
  },
  changeDateTimeColumn(e) {

    var arr = this.data.dateTime,
      dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  checkboxChange: function(e) {
    console.log('是否搬货发生change事件，携带value值为：', e.detail.value);
    var value = e.detail.value;
    if (value.length == 0 && this.data.carriage != 0) {
      this.setData({
        carriage: Number((Number(this.data.carriage)).toFixed(2)),
        fee: 0
      })
    } else {
      this.setData({
        carriage: (Number(this.data.carriage)).toFixed(2),
        fee: Number(value[0])
      })
    }
  },
  originFloor: function(e) {
    console.log(e.detail.value);
    if (e.detail.value !== '') {
      this.setData({
        origin_floor: e.detail.value
      })
    } else {
      this.setData({
        origin_floor: ''
      })
    }
  },
  destinationFloor: function(e) {
    console.log(e.detail.value)
    if (e.detail.value !== '') {
      this.setData({
        destination_floor: e.detail.value
      })
    } else {
      this.setData({
        destination_floor: ''
      })
    }
  },
  /**
   * 弹窗
   */

  showDialogBtn: function() {

    this.setData({
      hideInput: true,
      hideInput_b: true,
      showModal: true,
      hideInput_c: true
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
    this.setData({
      hideInput: true,
      hideInput_b: true
    })
    if (this.data.origin_address !== '') {
      this.setData({
        hideInput: false,
      })
    }
    if (this.data.destination_address !== '' && this.data.origin_address !== '') {
      this.setData({
        hideInput_b: false
      })
    }
    this.hideModal();

  },
  onCancels: function() {
    this.setData({
      hideInput_c: false
    })
    this.hideModal();

  },
  /**
   * 对话框确认按钮点击事件
   */

  onConfirm: function(e) {
    var that = this;
    if (that.data.maskq && that.data.openmsg === '该城市尚未开通') {
      wx.showModal({
        title: '温馨提示',
        content: that.data.openmsg,
        confirmText: '确定',
        confirmColor: '#e34545',
        showCancel: false,
        success: function() {
          return false;
        }
      })
    }
    if (this.data.origin_address && this.data.destination_address) {
      var userName = e.currentTarget.dataset.name;
      var telephone = e.currentTarget.dataset.telephone;
      var userNameTwo = e.currentTarget.dataset.usernametwo;
      var telephoneTwo = e.currentTarget.dataset.telephonetwo;
      if (userName == '' || userNameTwo == '') {
        wx.showToast({
          title: '请输入联系人姓名',
          icon: 'none',
          duration: 1000,
          mask: true
        })

        return false
      } else if (telephone == '' || telephoneTwo == '') {
        wx.showToast({
          title: '手机号不能为空',
          icon: 'none',
          duration: 1000,
        })

        return false
      } else if (telephone.length != 11 || telephoneTwo.length != 11) {
        wx.showToast({
          title: '手机号长度有误！',
          icon: 'none',
          duration: 1500
        })
        return false;
      }

      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (!myreg.test(telephone) || !myreg.test(telephoneTwo)) {
        wx.showToast({
          title: '手机号有误，请检查！',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      wx.navigateTo({
        url: '../payment/payment' + '?cate_id=' + that.data.currentTab + '&cate_name=' + that.data.cate_name + '&origin_title=' + that.data.origin_title + '&origin_address=' + that.data.origin_address + '&origin_floor=' + that.data.origin_floor + '&origin_tude_latitude=' + that.data.origin_tude.latitude + '&origin_tude_longitude=' + that.data.origin_tude.longitude + '&destination_title=' + that.data.destination_title + '&destination_address=' + that.data.destination_address + '&destination_floor=' + that.data.destination_floor + '&destination_tude_latitude=' + that.data.destination_tude.latitude + '&destination_tude_longitude=' + that.data.destination_tude.longitude + '&server_time=' + that.data.useCarTime + '&carriage=' + that.data.carriage + '&is_carry=' + that.data.fee + '&distance=' + that.data.distance + '&line_time=' + that.data.line_time + '&userName=' + that.data.userName + '&telephone=' + that.data.telephone + '&userNameTwo=' + that.data.userNameTwo + '&telephoneTwo=' + that.data.telephoneTwo
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '请选择起点、终点',
        confirmText: '确定',
        confirmColor: '#e34545',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {

            console.log(e)
            var userName = e.currentTarget.dataset.name;
            var telephone = e.currentTarget.dataset.telephone;
            var userNameTwo = e.currentTarget.dataset.usernametwo;
            var telephoneTwo = e.currentTarget.dataset.telephonetwo;
            if (userName == '' || userNameTwo == '') {
              wx.showToast({
                title: '请输入联系人姓名',
                icon: 'none',
                duration: 1000,
                mask: true
              })

              return false
            } else if (telephone == '' || telephoneTwo == '') {
              wx.showToast({
                title: '手机号不能为空',
                icon: 'none',
                duration: 1500
              })

              return false
            } else if (telephone.length != 11 || telephoneTwo.length != 11) {
              wx.showToast({
                title: '手机号长度有误！',
                icon: 'none',
                duration: 1500
              })
              return false;
            }

            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
            if (!myreg.test(telephone) || !myreg.test(telephoneTwo)) {
              wx.showToast({
                title: '手机号有误，请检查！',
                icon: 'none',
                duration: 1500
              })
              return false;
            }

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    this.setData({
      hideInput: false,
      hideInpu_b: false
    })
    if (this.data.origin_address == '') {
      this.setData({
        hideInput: true,
      })
    }
    if (this.data.destination_address == '' && this.data.origin_address == '') {
      this.setData({
        hideInput_b: true
      })
    }
    this.hideModal();
  },
  onConfirms: function(e) {
    console.log(e)
    var that = this;
    if (that.data.maskq && that.data.openmsg === '该城市尚未开通') {
      wx.showModal({
        title: '温馨提示',
        content: that.data.openmsg,
        confirmText: '确定',
        confirmColor: '#e34545',
        showCancel: false,
        success: function() {
          return false;
        }
      })
    }
    if (that.data.demand) {
      var userName = e.currentTarget.dataset.name;
      var telephone = e.currentTarget.dataset.telephone;
      var address = e.currentTarget.dataset.address;
      if (userName == '') {
        wx.showToast({
          title: '请输入联系人称呼',
          icon: 'none',
          duration: 1000,
          mask: true
        })

        return false
      } else if (telephone == '') {
        wx.showToast({
          title: '手机号不能为空',
          icon: 'none',
          duration: 1500
        })

        return false
      } else if (telephone.length != 11) {
        wx.showToast({
          title: '手机号长度有误！',
          icon: 'none',
          duration: 1500
        })
        return false;
      } else if (address == '' || !that.data.server_tude) {
        wx.showToast({
          title: '服务地址有误请检查',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      if (that.data.serFee && that.data.type_name != "换钱" || that.data.serFee == 0 && that.data.type_name != "回收换钱") {
        if (that.data.serFee < that.data.lowest_price) {
          wx.showToast({
            title: '愿报价少于最低报价',
            icon: 'none',
            duration: 2000
          })
          return false;
        }
      }

      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (!myreg.test(telephone)) {
        wx.showToast({
          title: '手机号有误，请检查！',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      /*
      wx.navigateTo({
        url: '../payment/payment' + '?cate_id=' + that.data.currentTab + '&cate_name=' + that.data.cate_name + '&origin_title=' + that.data.server_title + '&origin_address=' + that.data.server_address + '&origin_floor=' + that.data.server_floor + '&origin_tude_latitude=' + that.data.server_tude.latitude + '&origin_tude_longitude=' + that.data.server_tude.longitude + '&destination_title=' + that.data.destination_title + '&destination_address=' + that.data.destination_address + '&destination_floor=' + that.data.destination_floor + '&destination_tude_latitude=' + "" + '&destination_tude_longitude=' + "" + '&server_time=' + that.data.useCarTime + '&carriage=' + that.data.serFee + '&is_carry=' + that.data.fee + '&distance=' + that.data.distance + '&line_time=' + that.data.line_time + '&userName=' + that.data.serName + '&telephone=' + that.data.serPhone + '&userNameTwo=' + "" + '&telephoneTwo=' + "" + '&server_type=' + that.data.type_id + '&demand=' + that.data.demand + '&bargain=' + that.data.bargain
      })
  */
      wx.showModal({
        title: '温馨提示',
        content: '该类业务暂未开通，支持加速开通',
        confirmText: '确定',
        confirmColor: '#e34545',
        showCancel: true,
        success: function() {
          wx.request({
            url: 'https://mq.mouqukeji.com/api/api/serverTypeNum',
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            data: {
              user_id: that.data.user_id,
              server_type: that.data.type_id,
              ensure: 1
            },
            success: function(res) {
              console.log(res);
            }
          });
        },
        fail: function() {
          wx.request({
            url: 'https://mq.mouqukeji.com/api/api/serverTypeNum',
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            data: {
              user_id: that.data.user_id,
              server_type: that.data.type_id,
              ensure: 0
            },
            success: function(res) {
              console.log(res);
            }
          });
        }
      })
    } else if (that.data.type_name != "保洁") {
      wx.showModal({
        title: '温馨提示',
        content: '请输入需求/留言',
        confirmText: '确定',
        confirmColor: '#e34545',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log(e)
            var userName = e.currentTarget.dataset.name;
            var telephone = e.currentTarget.dataset.telephone;
            if (userName == '') {
              wx.showToast({
                title: '请输入联系人称呼',
                icon: 'none',
                duration: 1000,
                mask: true
              })

              return false
            } else if (telephone == '') {
              wx.showToast({
                title: '手机号不能为空',
                icon: 'none',
                duration: 1500
              })

              return false
            } else if (telephone.length != 11) {
              wx.showToast({
                title: '手机号长度有误！',
                icon: 'none',
                duration: 1500
              })
              return false;
            } else if (address == '' || !that.data.server_tude) {
              wx.showToast({
                title: '服务地址有误请检查',
                icon: 'none',
                duration: 1500
              })
              return false;
            }

            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
            if (!myreg.test(telephone)) {
              wx.showToast({
                title: '手机号有误，请检查！',
                icon: 'none',
                duration: 1500
              })
              return false;
            }
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      var userName = e.currentTarget.dataset.name;
      var telephone = e.currentTarget.dataset.telephone;
      if (userName == '') {
        wx.showToast({
          title: '请输入联系人称呼',
          icon: 'none',
          duration: 1000,
          mask: true
        })

        return false
      } else if (telephone == '') {
        wx.showToast({
          title: '手机号不能为空',
          icon: 'none',
          duration: 1500
        })

        return false
      } else if (telephone.length != 11) {
        wx.showToast({
          title: '手机号长度有误！',
          icon: 'none',
          duration: 1500
        })
        return false;
      } else if (address == '' || !that.data.server_tude) {
        wx.showToast({
          title: '服务地址有误请检查',
          icon: 'none',
          duration: 1500
        })
        return false;
      } else if (!that.data.area) {
        wx.showToast({
          title: '请输入打扫面积',
          icon: 'none',
          duration: 1500
        })
        return false;
      }

      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (!myreg.test(telephone)) {
        wx.showToast({
          title: '手机号有误，请检查！',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      wx.navigateTo({
        url: '../payment/payment' + '?cate_id=' + that.data.currentTab + '&cate_name=' + that.data.cate_name + '&origin_title=' + that.data.server_title + '&origin_address=' + that.data.server_address + '&origin_floor=' + that.data.server_floor + '&origin_tude_latitude=' + that.data.server_tude.latitude + '&origin_tude_longitude=' + that.data.server_tude.longitude + '&destination_title=' + that.data.destination_title + '&destination_address=' + that.data.destination_address + '&destination_floor=' + that.data.destination_floor + '&destination_tude_latitude=' + "" + '&destination_tude_longitude=' + "" + '&server_time=' + that.data.useCarTime + '&carriage=' + that.data.cleanPrice + '&is_carry=' + that.data.fee + '&distance=' + that.data.distance + '&line_time=' + that.data.line_time + '&userName=' + that.data.serName + '&telephone=' + that.data.serPhone + '&userNameTwo=' + "" + '&telephoneTwo=' + "" + '&server_type=' + that.data.type_id + '&demand=' + that.data.demand + '&bargain=' + that.data.bargain + '&area=' + that.data.area + '&is_tool=' + that.data.is_tool
      })
    }
    that.setData({
      hideInput_c: false,
    })
    this.hideModal();
  },
  closeDiscount: function() {
    this.setData({
      maskq: true
    })
    var that = this;
    if (that.data.maskq && that.data.openmsg === '该城市尚未开通') {
      wx.showModal({
        title: '温馨提示',
        content: that.data.openmsg,
        confirmText: '确定',
        confirmColor: '#e34545',
        showCancel: false,
        success: function() {

        }
      })
    }
  },
  goPriceDetail: function() {
    wx.navigateTo({
      url: '../price/price?base_price=' + this.data.base_price + '&base_km=' + this.data.base_km + '&price=' + this.data.price + '&distance_t=' + this.data.distance_t + '&distance=' + this.data.distance + '&carriage=' + this.data.carriage + '&cate_name=' + this.data.cate_name
    })
  }

})