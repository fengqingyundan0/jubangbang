// pages/price.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cate_name: '',
    base_km: '',
    base_price: '',
    price: '',
    distance: '',
    distance_t: '',
    carriage: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.setData({
      cate_name: options.cate_name,
      base_km: options.base_km,
      base_price: options.base_price,
      price: options.price,
      distance: Number(options.distance / 1000).toFixed(2),
      distance_t: options.distance_t,
      carriage: parseInt(options.carriage)
    })
  }
})