# Bridge

>1. [简介](#简介 "简介")
1. [Business常用方法](#概括 "概括")
<!-- 1. [详解](#项目结构 "项目结构")
    1. [【appHost】](#【appHost】 "【appHost】")
    1. [【isApp】](#【isApp】 "【isApp】")
    1. [【appVersion】](#【appVersion】 "【appVersion】")
    1. [【url】](#【url】 "【url】")
    1. [【ajax】](#【ajax】 "【ajax】")
    1. [【buryPoint】](#【buryPoint】 "【buryPoint】")
    1. [【point】](#【point】 "【point】")
    1. [【login】](#【login】 "【login】")
    1. [【share】](#【share】 "【share】")
    1. [【uA】](#【uA】 "【uA】")
    1. [【checkLogin】](#【checkLogin】 "【checkLogin】")
    1. [【vConsole】](#【vConsole】 "【vConsole】") -->


## 简介
Business是主要放置业务相关的方法或者属性，造轮子.....
###### 引用方式：
###### ``` import Business from '@/commonJs/base/business/business.js' ```


## Business常用方法
###### Business的内容如下

    Business/               // Business 常用方法解释及用法
      ├ appHost             // 返回当前是哪个服
      ├ isApp               // 返回是否公积金app
      ├ appVersion          // 判断是kaifa还是test还是b  开发，测试，正式
      ├ url                 // 返回对应的接口地址，包装完成对应服务器
      ├ ajax                // 异步请求
      ├ buryPoint           // 埋点
      ├ point               // 主动埋点
      ├ login               // 登录
      ├ share               // 分享
      ├ uA                  // 返回包装后的userAgent
      ├ checkLogin          // 判断登录状态
      └ vConsole            // console测试

## 详解

### <font color=#C71585>【appHost】</font>
```js
// 返回当前是哪个服 window.location.origin
Business.appHost()
```
###### <font color=#e47128>【其他类似】</font>
