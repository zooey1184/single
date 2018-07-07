<!-- 社保证明验证 -->
<template lang="html">
<div class="">
  <page>
    <div>
      <form-list name="toastSlideUp">
        <form-item title="证明类别" :index="0" :width="130" @click.native="pickerFn">
          <p :style="{color: typeName?'#333':'#999'}">{{typeName?typeName:'请选择证明类别'}}</p>
        </form-item>
        <form-item title="证明编号" :index="1" :width="130" :showRight="false">
          <input type="text" placeholder="请输入证明编号" v-model="num">
        </form-item>
      </form-list>

      <transition name="toastSlideUp">
        <button v-if="showPage" class="btn_prove" @click="submitFn">验证</button>
      </transition>

      <div class="img_pane" v-if="showImg">
        <img :src="img" alt="">
      </div>
    </div>
  </page>
</div>
</template>

<script>
export default {
  components: {
    formList: () =>
      import ('@/components/FormList/FormList.vue'),
    formItem: () =>
      import ('@/components/FormList/FormItem.vue')
  },
  data: () => ({
    showPage: false,
    showImg: false, // 是否展示图片
    img: '',
    preImg: 'http://shbx.sxxhrss.gov.cn/jpg/pdf/',
    pageData: null,
    proveList: [{
        text: '参保证明',
        value: 'cbzm'
      },
      {
        text: '待遇发放证明',
        value: 'dyff'
      }
    ],
    type: '',
    typeName: '',
    num: ''
  }),
  methods: {
    pickerFn() {
      let self = this
      this.$picker.show({
        dataPick: self.proveList,
        confirmFn: (i, k, v) => {
          self.type = self.proveList[k].value
          self.typeName = v[0]
        }
      })
    },
    validateImage(url) {
      let xmlHttp = null
      let b = false
      if(this.isHasImg(url)) {
        b = true
        return b
      }else {
        try {
          if (window.ActiveXObject) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
          } else if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
          }
          xmlHttp.open("Get", url, false);
          xmlHttp.send();
          if (xmlHttp.status == 404) {
            b = false;
          } else {
            b = true;
          }
        } catch (e) {
          b = false
        } finally {
          return b
        }
      }
    },
    isHasImg(pathImg) {
      let ImgObj = new Image();
      ImgObj.src = pathImg;
      if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
        return true;
      } else {
        return false;
      }
    },
    submitFn() {
      if (this.type !== "") {
        if (this.num !== "") {
          this.img = `${this.preImg}${this.type}-${this.num}.jpg`
          // this.img = "http://oo6gk8wuu.bkt.clouddn.com/default_head.png"
          if (this.validateImage(this.img)) {
            this.showImg = true
          } else {
            this.showImg = false
            this.$toast.show('验证失败，请确保您的信息正确')
          }
        } else {
          this.$toast.show('请输入证明编号')
        }
      } else {
        this.$toast.show('请选择证明类别')
      }
    }
  },
  created() {
    setTimeout(() => {
      this.showPage = true
    }, 300)
  }
}
</script>

<style lang="less">
@import url('../../../../../common/style/media.less');
.btn_prove {
    display: block;
    margin: 20px auto;
    outline: none;
    border: none;
    // height: 42px;
    .height(42px, 42px, 42px, 45px, 50px, 60px);
    // font-size: 16px;
    .font(16px, 16px, 16px, 18px, 22px, 28px);
    color: #fff;
    background: rgb(10, 167, 245);
    width: 90%;
    &:active {
        opacity: 0.8;
    }
}
.img_pane {
    img {
        display: block;
        max-width: 280px;
        margin: 10px auto;
    }
}
</style>
