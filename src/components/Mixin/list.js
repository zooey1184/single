export default {
  methods: {
    getAttr() {
      let attr = this.$parent.$attrs
      return attr
    },
    getNode() {
      let node = this.$parent.$children.length
      return node
    },
    getIndex() {
      let node = this.$parent.$children.length
      let frist = 0
      let current = this._uid
      if(node>0) {
        if(!!this.$attrs.index) {
          current = this.$attrs.index
        }else {
          let uid = this.$parent.$children[0]._uid
          frist = uid
        }
      }
      let index = current-frist
      return index
    },
  }
}
