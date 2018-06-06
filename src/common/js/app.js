//Bridge方式
(function() {
	window.Bridge = {
		platform: navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Linux") > -1 || navigator.userAgent.indexOf("android") > -1 ? "android" : "ios",
		commandQueue: [],
		callQueueId: 0,
		osEventCallback: {},
		callbackId: 1,
		callbackCache: {},
		pushCallback: function(a) {
			return "function" == typeof a ? (this.callbackCache[this.callbackId] = a, this.callbackId++) : 0
		},
		applyCallback: function(a) {
			var b = this.callbackCache[a];
			if ("function" == typeof b) {
				var c = Array.prototype.slice.call(arguments, 1);
				return b.apply(null, c)
			}
		},
		popCallback: function(a) {
			var b = this.callbackCache[a];
			return "function" == typeof b ? (delete this.callbackCache[a], b) : void 0
		},
		exec: function(a, b) {
			for (var c = [], d = 2; d < arguments.length; d++) c.push(arguments[d]);
			if ("android" == this.platform) {
				var e = !0;
				if (window.os && window.os.notify) try {
					var f = this.addOsCallQueue(a, b, c);
					os.notify(f)
				} catch (g) {
					e = !1
				} else e = !1;
				if (!e && window.os && window.os[a])
					if ("action" == a) "function" == typeof b && c.length > 1 && c[1] && (c[1] = JSON.parse(c[1]), c[1].queueId = ++this.callQueueId, c[1] = JSON.stringify(c[1]), this.commandQueue.push({
						id: this.callQueueId,
						args: c,
						callback: b
					})), window.os[a].apply(window.os, c);
					else {
						var h = window.os[a].apply(window.os, c);
						"function" == typeof b && b(h)
					}
			} else "ios" == this.platform && (null == this.bridge && (this.bridge = document.createElement("iframe"), this.bridge.setAttribute("style", "display:none;"), this.bridge.setAttribute("height", "0px"), this.bridge.setAttribute("width", "0px"), this.bridge.setAttribute("frameborder", "0"), document.documentElement.appendChild(this.bridge)), this.addOsCallQueue(a, b, c))
		},
		addOsCallQueue: function(a, b, c) {
			this.callQueueId++;
			var d = {
				id: this.callQueueId,
				args: c,
				callback: b,
				action: a
			};
			if (this.commandQueue.push(d), "android" == this.platform) return this.urlByCommand(d);
			if (1 == this.commandQueue.length) {
				var e = this.commandQueue[0],
					f = this.urlByCommand(e);
				this.bridge.src = f
			}
		},
		urlByCommand: function(a) {
			return "app://" + a.action + "?id=" + a.id + "&args=" + encodeURIComponent(JSON.stringify(a.args ? a.args : []))
		},
		delOsCallQueue: function(a, b) {
			for (var c = this.commandQueue.length, d = 0; c > d; d++)
				if (this.commandQueue[d].id == a) {
					if ("function" == typeof this.commandQueue[d].callback) try {
						this.commandQueue[d].callback(b)
					} catch (e) {
						console.log(e)
					}
					this.commandQueue.splice(d, 1);
					break
				}
			if ("ios" == this.platform && this.commandQueue.length > 0) {
				var f = this.commandQueue[0],
					g = this.urlByCommand(f);
				this.bridge.src = g
			}
		},
		hideNavigationBar: function() {
			this.exec("hideNavigationBar")
		},
		exitApp: function() {
			this.exec("exitApp")
		},
		back: function(a) {
			var b = "",
				c = "?";
			for (var d in a) b += c + encodeURIComponent(d) + "=" + encodeURIComponent(a[d]), c = "&";
			window.location.href = "app://back" + b
		},
		tag: function(a) {
			this.exec("tag", null, a)
		},
		setNeedsReload: function(a, b) {
			"string" == typeof b ? this.exec("setNeedsReload", null, a, b) : this.exec("setNeedsReload", null, a)
		},
		onBack: function(a) {
			var b = this.pushCallback(a);
			b ? this.exec("onBack", null, b) : this.exec("onBack", null, 0)
		},
		setTitle: function(a) {
			this.exec("setTitle", null, a)
		},
		clipText: function(a, b) {
			this.exec("clipText", b, a)
		},
		getClipText: function(a) {
			this.exec("getClipText", a)
		},
		openWebView: function(a, b) {
			this.exec("openWebView", null, a, b)
		},
		action: function(a, b, c) {
			var d = {};
			if (b && "object" == typeof b)
				for (var e in b) "function" == typeof b[e] ? d[e] = this.pushCallback(b[e]) : d[e] = b[e];
			this.exec("action", c, a, JSON.stringify(d))
		},
		bind: function(a, b) {
			var c = a;
			a = a.substring(0, 1).toUpperCase() + a.substr(1), "function" == typeof b ? (this.osEventCallback["on" + a] = b, "android" == this.platform && window.os && window.os.registerEvent && window.os.registerEvent.call(window.os, c)) : (delete this.osEventCallback["on" + a], "android" == this.platform && window.os && window.os.unregisterEvent && window.os.unregisterEvent.call(window.os, c))
		},
		trigger: function(a) {
			a = a.substring(0, 1).toUpperCase() + a.substr(1);
			var b = null;
			try {
				b = this.osEventCallback["on" + a] && this.osEventCallback["on" + a]()
			} catch (c) {}
			if ("android" != this.platform) return b;
			var d = [a];
			if (null !== b && void 0 !== b) {
				var e = typeof b;
				d.push("string" == e ? b : JSON.stringify(b)), d.push(e)
			}
			window.os && window.os.onReceiveResult && window.os.onReceiveResult(d[0], d[1], d[2])
		}
	};

	var u = navigator.userAgent,
		// u = "ios/ios9.3.4,client/5.9.0.ios1.0/jiekuan,device/iPhone6.2,theme/red,app/other,Bridge/(1.0.1,51Gjj,5.6.0)/app",
		a = u.toLowerCase();
	var _agent = u.match(/.*(Bridge\/\(.*\)\/app).*/);
	var gjjCheck = {
		isGjj_old: /^[\w\W]*android\/[\w\W]*client\/[\w\W]*theme\/[\w\W]*$/.test(u) || /^[\w\W]*ios\/[\w\W]*client\/[\w\W]*device\/[\w\W]*theme\/[\w\W]*$/.test(u), //51公积金客户端
		isGjj_new: !!(_agent && _agent.length),
		isGjj_agent: _agent,
		isAndroid: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf('android') > -1,
		isiOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || /^[\w\W]*ios\/[\w\W]*client\/[\w\W]*device\/[\w\W]*theme\/[\w\W]*$/.test(u),
	}
	var _base = {
		mobile: !!u.match(/AppleWebKit.*Mobile.*/),
		isAndroid: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf('android') > -1,
		isiOS: gjjCheck.isiOS,
		webApp: u.indexOf('Safari') == -1, //是否web应用程序，没有头部与底部
		weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
		isGjj: gjjCheck.isGjj_old || gjjCheck.isGjj_new,
		isAndroidGjj: gjjCheck.isAndroid && (gjjCheck.isGjj_new || gjjCheck.isGjj_old),
		isiOSGjj: gjjCheck.isiOS && (gjjCheck.isGjj_new || gjjCheck.isGjj_old),
		init: function() {
			this.appInfo = this.appSet();
			return this;
		},
		appSet: function() {
			if (gjjCheck.isGjj_agent && gjjCheck.isGjj_agent[1]) {
				var _c = gjjCheck.isGjj_agent[1];
				var _v = _c.split("/(")[1].split(")/")[0].split(",");
				var name = "";
				switch (_v[1].toLocaleLowerCase()) {
					case "51gjj":
						name = "51公积金管家";
						break;
					case "51jdhh":
						name = "51借点花花";
						break;
					case "51yq":
						name = "51用钱";
						break;
					case "51jiekuan":
						name = "51借款";
						break;
				}
				return {
					success: true,
					bridge: _v[0] || "",
					platform: _v[1] || "",
					version: _v[2] || "",
					appName: name
				}
			} else if (gjjCheck.isGjj_old) {
				return {
					success: true,
					bridge: "1.0.0",
					platform: "51gjj",
					version: "",
					appName: "51公积金管家"
				}
			} else {
				return {
					bridge: "",
					platform: "",
					version: "",
					appName: "51公积金管家"
				}
			}
		},
		vLimit: function(m) { //版本判断  m:ios 版本  n:安卓版本  
			var self = this,
				m = m || 0;

			function checkLimit(v, b) {
				var v = v.match(/[\d]+.[\d]+.[\d]+/)[0];
				var a = v.split("."),
					b = b.split("."),
					l = ["000", "00", "0", ""],
					_v = "",
					_b = "";
				if (a.length == b.length) {
					for (var i = 0; i < a.length; i++) {
						_v += l[a[i].length] + a[i],
						_b += l[b[i].length] + b[i];
					};
					return Number(_v) >= Number(_b);
				} else {
					return false
				}

			}
			if (!this.isGjj) {
				return false;
			}
			try {
				var _info = this.appInfo;
				if (_info.success) {
					return checkLimit(_info.bridge, m);
				}
				return false;
			} catch (e) {
				console.log(e)
			}
			return false;
		},
		versionLimit: function(m) { //版本判断  m:ios 版本  n:安卓版本  
			var self = this,
				m = m || 0;

			function checkLimit(v, b) {
				if(!v) return false;
				var v = v.match(/[\d]+.[\d]+.[\d]+/)[0];
				var a = v.split("."),
					b = b.split("."),
					l = ["000", "00", "0", ""],
					_v = "",
					_b = "";
				if (a.length == b.length) {
					for (var i = 0; i < a.length; i++) {
						_v += l[a[i].length] + a[i],
						_b += l[b[i].length] + b[i];
					};
					return Number(_v) >= Number(_b);
				} else {
					return false
				}

			}
			if (!this.isGjj) {
				return false;
			}
			try {
				var _info = this.appInfo;
				if (_info.success) {
					return checkLimit(_info.version, m);
				}
				return false;
			} catch (e) {
				console.log(e)
			}
			return false;
		},
		action: function(a, b, c) {
			// if(this.isGjj);
			Bridge.action(a, b, c)
		},
		tag: function(a) {
			if(this.isGjj)Bridge.exec("tag", null, a)
		},
		back: function(c) {
			if(this.isGjj)Bridge.back(c)
		},
		onBack: function(c) {
			if(this.isGjj)Bridge.onBack(c)
		},
		setTag: function(tag, c) {
			var self = this;
			if (this.isGjj) {
				Bridge.tag(tag);
			}
			if (c) {
				eval('window.' + tag + ' = function() {self.pageReload("' + tag + '",c)}');
			} else {
				eval('window.' + tag + ' = function() {self.pageReload("' + tag + '")}');
			}

		},
		setNeedsReload: function(tag, f) {
			if(this.isGjj)Bridge.setNeedsReload(tag, f);
		},
		toTag: function(tag) {
			this.setNeedsReload(tag, tag)
		},
		pageReload: function(tag, c) {
			// this.storage.val(tag, "");
			if (c) c();
			else window.location.reload();
		},
		getLocation: function(c) {
			var d = {
				success: false,
				code: 2 //无法定位
			};
			if (this.isGjj && Bridge) {
				Bridge.action("getLocation");
				var d = {};
				window.getLocation = function(a, b) {
					if (parseInt(a) == 0 && parseInt(b) == 0) {
						d = {
							success: false,
							code: 1 //定位未开启
						};
					} else {
						d = {
							success: true,
							longitude: a,
							latitude: b,
							code: 0
						}
					}

					c(d);
				}
			} else if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					function(p) {
						if (p && p.coords) {
							d = p.coords;
							d.success = true;
						} else {
							d.code = 1;
							//请允许系统获取您的地理位置！
						}
						c(d);
					},
					function(e) {
						d.msg = e.message;
						c(d);
					}
				);
			} else { //不支持
				c(d);
			}
		},
		OnBack:function(c){
			var _this=this;
			window.setTimeout(function() {
				var num = 1;
				if(_this.isGjj)Bridge.onBack(function() {
					if (num) {
						num--;
						c()
						return true;
					}

				});
			}, 200);
		}
	};
	_base.init();
	window.APP = _base;
	return _base;

})()