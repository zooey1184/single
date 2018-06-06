export default {
  methods: {
    getLink(item, confUrl) {
      // let confUrl = config().datumUrl
      if (item.pinyin == 'contacts') {
        // 联系人页面
        window.location.href = confUrl.contacts
      } else if (item.pinyin == 'ocr') {
        // 身份证
        if (item.state != '1' || item.state != 1) {
          this.openOcr(item)
        } else {
          window.location.href = confUrl.idcard
        }
      } else if (item.pinyin == 'operation') {
        // 运营商页面
        window.location.href = `${confUrl.operation}&status=${item.state}`
      } else {
        // 其他页面
        if (item.url != '') {
          window.location.href = `${item.url}#blank`
        } else {
          this.$toast.show(`${item.title}链接不正确`)
        }
      }
    },
  }
}
