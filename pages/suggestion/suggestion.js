var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
Page({
    data: {
        sugData: '',
        placeholder: '',
        currentCity: '',
        chosenId: '',
        title: '',
        address: '',
        location: ''
    },
    bindKeyInput: function(e) {
        var that = this;
        if (e.detail.value === '') {
            that.setData({
                sugData: '',
                address: ''
            });
            return;
        }
        var qmap = new QQMapWX({
          key: 'VBNBZ-FYPCG-BSQQ5-IAXIQ-ZMIG2-MNFBC'
        })
        var fail = function(data) {
            console.log(data)
        };
        var success = function(data) {
            console.log(data);
            that.setData({
              sugData: data.data
            })
        }
        qmap.getSuggestion({
            keyword: e.detail.value,
            region: that.data.currentCity,
            fail: fail,
            success: success
        });
    },
    cleanInput: function () {
      
    },
    onLoad: function (options) {
      console.log(options)
      this.setData({
        placeholder: options.placeholder,
        currentCity: options.currentCity
      })
    },
    chosen: function (e) {
      console.log(e)
      this.setData({
        chosenId: e.currentTarget.dataset.id,
        title: e.currentTarget.dataset.title,
        address: e.currentTarget.dataset.address,
        location: e.currentTarget.dataset.location
      })
      // var that = this
      // var pages = getCurrentPages();
      // var currPage = pages[pages.length - 1];   //当前页面
      // var prevPage = pages[pages.length - 2];

      // if (that.data.placeholder == "请输入起点") {
      //   prevPage.setData({
      //     origin_title: e.currentTarget.dataset.title,
      //     origin_address: e.currentTarget.dataset.address + e.currentTarget.dataset.title,
      //     origin_tude: {
      //       latitude: e.currentTarget.dataset.location.lat,
      //       longitude: e.currentTarget.dataset.location.lng
      //     }
      //   })
      //   wx.navigateBack()
      // } else if (that.data.placeholder == "请输入终点") {
      //   prevPage.setData({
      //     destination_title: e.currentTarget.dataset.title,
      //     destination_address: e.currentTarget.dataset.address + e.currentTarget.dataset.title,
      //     destination_tude: {
      //       latitude: e.currentTarget.dataset.location.lat,
      //       longitude: e.currentTarget.dataset.location.lng
      //     }
      //   })
      //   wx.navigateBack()
      // }
    },
    confirm: function () {
      var that = this
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2]; 

      if(that.data.placeholder == "请输入起点" && that.data.address !== ''  ){
        prevPage.setData({
          origin_title: that.data.title,
          origin_address: that.data.address + that.data.title,
          origin_tude: {
            latitude: that.data.location.lat,
            longitude: that.data.location.lng
          }
        })
        wx.navigateBack()
      } else if (that.data.placeholder == "请输入终点" && that.data.address !== '') {
        prevPage.setData({
          destination_title: that.data.title,
          destination_address: that.data.address + that.data.title,
          destination_tude: {
            latitude: that.data.location.lat,
            longitude: that.data.location.lng
          }
        })
        wx.navigateBack()
      }

      if (that.data.placeholder == "请输入起点" && that.data.address == ''){
        prevPage.setData({
          origin_address:''
        })
        wx.navigateBack()
      } else if (that.data.placeholder == "请输入终点" && that.data.address == ''){
        prevPage.setData({
          destination_address: ''
        })
        wx.navigateBack()
      }
    }
})