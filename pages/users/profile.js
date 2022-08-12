// pages/users/profile.js
let app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    user: {
      name: "Annie Wang🐨",
      profilepic: "https://res.cloudinary.com/dudzolqdz/image/upload/v1660285329/Screen_Shot_2022-08-12_at_2.21.10_PM_kiwgl6.png"
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    if (app.globalData.header) {
      // proceed to fetch api
      this.getData()
    } else {
      // wait until loginFinished, then fetch API
      wx.event.on('loginFinished', this, this.getData)
    }
  }, 
  getData(){
    const user_id = app.globalData.user.id
    const page = this
    wx.request({
      url: `${app.globalData.baseURL}/profile/${user_id}`,
      method: "GET",
      header: app.globalData.header,
      success(res) {
        console.log("From profile.js: onshow request succesfully")
        console.log("From profile.js: res",res)
        if (res.statusCode === 200) {
          page.setData({
            pets: res.data.pets,
            booked_pets: res.data.booked_pets,
            user_id: user_id
          })
        } else {
          console.log("From profile.js: status code is", res.statusCode)
        }
      }
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },
  goToPet(e) {
    console.log('From profile.js - goToPet: e', e)
    const id = e.currentTarget.dataset.id
    console.log("From profile.js - goToPet: petid: ",id)
    wx.navigateTo({
        url: `/pages/pets/show?id=${e.currentTarget.dataset.id}`,
      })
  },
})