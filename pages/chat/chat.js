

Page({
  data:{
    name:"chat",
    link:[],
    val: "你是？",
    touUrl: "../img/1.png",
    teuUrl: "../img/2.png",
    top:0
  }, 
  passWdInput: function (e) {
    this.setData({
      val: e.detail.value
    })
  },
  showok: function () {
    wx.showToast({
      title: '无内容',
      image: '../img/2.png',
      duration: 2000
    })
  },
  dataPush(r,e){
    var a = this.data.link
    a.push(r)
    this.setData({
      link: a,
      top: 43*a.length+40
    })
    if(r.length > 13){
      this.jia(Math.floor(r.length/13))
    }
    console.log(this.data.top)
  },
  jia:function(c){
    var a = this.data.top
    this.setData({
      top: 14*c+a
    })
    console.log(this.data.top)
  },
  chat:function(e){
    if(this.data.val){
      this.dataPush(this.data.val)
      wx.request({
        url: "https://way.jd.com/turing/turing",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          userid: "222",
          appkey: "86a3e15d7a42602fd8364a3f5b209697",
          loc: "北京市海淀区信息路28号",
          info: this.data.val
        },
        complete: (res) => {
          console.log(res)
          this.dataPush(res.data.result.text)
        }
      })
      this.setData({
        val: ""
      })
    }else{
      console.log("无内容")
      this.showok()
    }
  }
})