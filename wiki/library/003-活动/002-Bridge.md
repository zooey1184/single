# Bridge

>1. [简介](#简介 "简介")
1. [Bridge常用方法](#概括 "概括")
1. [详解](#项目结构 "项目结构")
    1. [【action】](#【action】 "【action】")
    1. [【platform】](#【platform】 "【platform】")
    1. [【setTitle】](#【setTitle】 "【setTitle】")
    1. [【ShareTimeline】](#【ShareTimeline】 "【ShareTimeline】")
    1. [【setNeedsReload】](#【setNeedsReload】 "【setNeedsReload】")
    1. [【back】](#【back】 "【back】")


## 简介
Bridge是交互原生app于h5的方法桥，提供了多种方式触发app的行为，方便h5开发
###### 引用方式：
###### ``` import Bridge from '@/commonJs/base/bridge/bridge.js' ```
###### ``` <script src="//r.51gjj.com/act/release/js/lib/bridge.js"></script>  //(推荐)```


## Bridge常用方法
###### Bridge的内容如下

    Bridge/                 // Bridge常用方法解释及用法
      ├ action              // 常用的有login，quickicon
      ├ platform            // 返回手机系统android, ios
      ├ setTitle            // 设置title名称
      ├ setNeedsReload      // 刷新
      ├ back                // 返回
      └ ShareTimeline       // 分享功能

## 详解

### <font color=#C71585>【action】</font>
原生触发行为
```js
// 登录
Bridge.action("login")
// app右上角的图标行为，当前用例是打开分享面板
Bridge.action('quickIcon', {
  thumb: "https://r.51gjj.com/image/static/ico_title_share_dark.png",
  onclick: function() {
    Bridge.action('ShareTimeline', {
      "title": "新人大礼包免费领",
      'desc': "6666元理财金、1000元免息券…",
      "thumb": "https://r.51gjj.com/act/release/img/20171115wxfx.png",
      "link": window.location.href
    });
  }
})
// 设置导航栏的样式
Bridge.action('setNavigationColor', { backgroundColor: '#373941', textColor: "#ffffff", iconType: "1" });
// 获取网络
Bridge.action('getNetType', { callback: callbackFn});
```

### <font color=#C71585>【platform】</font>
```js
// 返回当前的设备 android ||  ios
Bridge.platform()
```

### <font color=#C71585>【setTitle】</font>
```js
// 设置页面标题
Bridge.setTitle("首页")
```

### <font color=#C71585>【ShareTimeline】</font>
原生分享
```js
// title: 分享标题；  desc: 分享描述；  thumb: 分享图标；  link: 分享链接
Bridge.action('ShareTimeline', {
  "title": "点击积累，感恩有你",
  'desc': "这个双11累计交易额3.24亿",
  "thumb": "https://r.51gjj.com/act/release/img/20171118wxfx.png",
  "link": window.location.href
});
```

### <font color=#C71585>【setNeedsReload】</font>
刷新页面
```js
// 里面的参数是页面的tag，当前的页面tag是详情页
Bridge.setNeedsReload("orderInfoPage", "orderInfoPage");
// 新方法reload不使用bridge，直接用focus，change方式触发刷新，详情查看components模块，或搜索reload
// if(window.listenPage) {
//   reload({
//     onload() {
//       console.log("ok");
//     }
//   })
// }else {
//   console.log("没有这个方法");
// }
```

### <font color=#C71585>【back】</font>
原生返回
```js
// 里面的参数是页面的tag，当前的页面tag是详情页
// 需要注意的是，如果跳到指定页面要保证这个页面曾经被打开过，否则不生效
Bridge.back({
  tag: "orderInfoPage"
});

```
