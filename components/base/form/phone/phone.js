// component/base/form/phone/phone.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    areaCode: '+86',
    areaCodes: ['+86', '+02'],
    account: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectAreaCode: function (e) {
      const index = e.detail.value;
      this.setData({ areaCode: this.data.areaCodes[index] });
    }
  }
})
