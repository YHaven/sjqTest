Page({
  data:{
    cells: []
  },
  onLoad:function(options){
    var that = this
    wx.getStorage({
      key: 'person_info',
      success: function(res){
        var data = res.data
        var cells = [[],[],[]]
        cells[0].push({title: '房屋主图', text: data.uploadImg == '' ? '未选择' : data.uploadImg, access: false, fn: ''})
        cells[0].push({title: '房屋名称', text: data.houseName == '' ? '未填写' : data.houseName, access: false, fn: ''})
        cells[1].push({title: '房屋类型', text: data.houseType == '' ? '未填写' : data.houseType, access: false, fn: ''})
        cells[2].push({title: '备注', text: data.remark == '' ? '未填写' : data.remark, access: false, fn: ''})
        that.setData({
          cells: cells
        })
      }
    })
  }
})