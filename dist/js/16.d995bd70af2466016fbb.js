webpackJsonp([16],{O3hu:function(t,i,a){"use strict";var e=a("4YfN"),n=a.n(e),o=a("9rMa");i.a={methods:n()({},Object(o.b)(["set_business"]),{goDetail:function(t){1==t?this.set_business("个人新参保"):2==t?this.set_business("个人续保"):this.set_business("个人停保"),this.$router.push("/progress_detail?state="+t)}})}},ljr8:function(t,i,a){i=t.exports=a("UTlt")(!1),i.push([t.i,".btn[data-v-542227f8]{outline:none;padding:0;margin:0;border-radius:3px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.act_btn[data-v-542227f8]{background:#fd6260;color:#fff}.act_btn[data-v-542227f8]:active{opacity:.8}.dis_btn[data-v-542227f8]{background:#a3a3a3;color:#fff}.empty_btn[data-v-542227f8]{background:#fff;color:#fd6260}.empty_btn[data-v-542227f8]:active{color:#fff;background:#fd6260}.res_btn[data-v-542227f8]{color:#14b25a;border:1px solid #14b25a;background:#fff}.res_btn[data-v-542227f8]:active{background:#14b25a;color:#fff}.item[data-v-542227f8]{width:80%;overflow:hidden;position:relative;height:140px;border-radius:10px;background:#fff;-webkit-box-sizing:0 0 15px #ddd;box-sizing:0 0 15px #ddd;padding:15px;-webkit-box-sizing:border-box;box-sizing:border-box;margin:20px auto}@media screen{.item[data-v-542227f8]{height:140px}}@media screen and (min-width:330px) and (max-width:369px){.item[data-v-542227f8]{height:135px}}@media screen and (max-width:329px){.item[data-v-542227f8]{height:135px}}@media screen and (min-width:400px){.item[data-v-542227f8]{height:145px}}@media screen and (min-width:650px){.item[data-v-542227f8]{height:230px}}.item p[data-v-542227f8]{font-family:\\\\5FAE\\8F6F\\96C5\\9ED1;font-weight:400;color:#fff;margin-top:30px}@media screen{.item p[data-v-542227f8]{font-size:20px;line-height:20px}}@media screen and (min-width:330px) and (max-width:369px){.item p[data-v-542227f8]{font-size:18px;line-height:18px}}@media screen and (max-width:329px){.item p[data-v-542227f8]{font-size:18px;line-height:18px}}@media screen and (min-width:400px){.item p[data-v-542227f8]{font-size:24px;line-height:24px}}@media screen and (min-width:650px){.item p[data-v-542227f8]{font-size:35px;line-height:35px}}.yello_item[data-v-542227f8]{background:-webkit-gradient(linear,left top,right bottom,from(#ffa620),to(#ffe958));background:linear-gradient(to bottom right,#ffa620,#ffe958)}.yello_item[data-v-542227f8]:active{opacity:.8}.blue_item[data-v-542227f8]{background:-webkit-gradient(linear,left top,right bottom,from(#a4bdf5),to(#5281ec));background:linear-gradient(to bottom right,#a4bdf5,#5281ec)}.blue_item[data-v-542227f8]:active{opacity:.8}.orange_item[data-v-542227f8]{background:-webkit-gradient(linear,left top,right bottom,from(#fbb0b1),to(#f86566));background:linear-gradient(to bottom right,#fbb0b1,#f86566)}.orange_item[data-v-542227f8]:active{opacity:.8}.icon_font[data-v-542227f8]{color:#fdfdfd}@media screen{.icon_font[data-v-542227f8]{font-size:20px;line-height:20px}}@media screen and (min-width:330px) and (max-width:369px){.icon_font[data-v-542227f8]{font-size:18px;line-height:18px}}@media screen and (max-width:329px){.icon_font[data-v-542227f8]{font-size:18px;line-height:18px}}@media screen and (min-width:400px){.icon_font[data-v-542227f8]{font-size:24px;line-height:24px}}@media screen and (min-width:650px){.icon_font[data-v-542227f8]{font-size:35px;line-height:35px}}.icon_bg[data-v-542227f8]{position:absolute;right:-20px;bottom:20px;font-size:90px;color:#fa8e8f}",""])},oe7r:function(t,i,a){"use strict";var e=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("page",{attrs:{title:"社保业务经办"}},[a("div",{},[a("div",{staticClass:"item orange_item",on:{click:function(i){t.goDetail(1)}}},[a("i",{staticClass:"icon iconfont icon-qiandai icon_font"}),t._v(" "),a("p",[t._v("参保新增")]),t._v(" "),a("i",{staticClass:"icon iconfont icon-qiandai icon_bg"})]),t._v(" "),a("div",{staticClass:"item orange_item",on:{click:function(i){t.goDetail(2)}}},[a("i",{staticClass:"icon iconfont icon-baoxian1 icon_font"}),t._v(" "),a("p",[t._v("续保业务")]),t._v(" "),a("i",{staticClass:"icon iconfont icon-baoxian1 icon_bg"})]),t._v(" "),a("div",{staticClass:"item orange_item",on:{click:function(i){t.goDetail(3)}}},[a("i",{staticClass:"icon iconfont icon-baoxianxiaoshou icon_font"}),t._v(" "),a("p",[t._v("参保中断")]),t._v(" "),a("i",{staticClass:"icon iconfont icon-baoxianxiaoshou icon_bg"})])])])},n=[],o={render:e,staticRenderFns:n};i.a=o},q7a2:function(t,i,a){var e=a("ljr8");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);a("FIqI")("88df0e78",e,!0,{})},xHEs:function(t,i,a){"use strict";function e(t){a("q7a2")}Object.defineProperty(i,"__esModule",{value:!0});var n=a("O3hu"),o=a("oe7r"),d=a("vSla"),f=e,c=d(n.a,o.a,!1,f,"data-v-542227f8",null);i.default=c.exports}});