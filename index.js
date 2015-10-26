//by caibaojian 2015.10.13
//idea来自 http://zzsvn.pcauto.com.cn/svn/other/jslib/api/efix.html
//1.修复再次刷新重新定位浮动；2.支持滚动到某个位置结束浮动停在那里；3.兼容IE6
var console = console|| {log:function(){return;}}
function efix(a) {
	this.init(a)
}
efix.prototype = {
	init: function(c) {
		var b = this;
		this.config = c;
		this.fixTimer = false;
		this.absolute = false;
		this.saveWidth = document.documentElement.clientWidth;
		this.saveHeight = document.documentElement.clientHeight;
		this.id = this.config.id;
		this.target = document.getElementById(this.id);
		this.marginTop = this.config.marginTop || 0;
		this.top = this.config.top || 0;
		this.left = this.config.left || 0;
		this.limit = this.getLimit();
		this.curTop = this.target.getBoundingClientRect().top - this.marginTop;
		this.orgTop = this.getElementPosition(this.target).y - this.marginTop;
		this.curWidth = parseInt(this.target.currentStyle ? this.target.currentStyle.width : getComputedStyle(this.target, null)["width"]);
		this.isIE6 = !-[1, ] && !window.XMLHttpRequest;
		this.saveStyle = this.target.style.cssText || "";
		if (this.isIE6 && document.body.currentStyle.backgroundAttachment !== "fixed") {
			var a = document.body;
			a.style.backgroundImage = "url(about:blank)";
			a.style.backgroundAttachment = "fixed"
		}
		this.setPosition();
		var d = this.target.currentStyle ? this.target.currentStyle.position : getComputedStyle(this.target, null)["position"];
		//if (d == "static") {
			this.addEvent(window, "resize", function() {
				b.fixResize()
			})
		//}
		if (this.config.isScroll) {
			this.createCopyElement();
			this.addEvent(window, "scroll", function() {
				b.fixScroll()
			})
		} else {
			document.body.appendChild(this.target);
			this.fixStatic()
		}
	},
	getElementPosition: function(e){
            var x = 0, y = 0;
            while (e != null) {
                x += e.offsetLeft;
                y += e.offsetTop;
                e = e.offsetParent;
            }
            return { x: x, y: y };
    },
	fixResize: function() {
		var self = this;
		if (self.saveWidth != document.documentElement.clientWidth || self.saveHeight != document.documentElement.clientHeight) {
			if (self.config.isScroll) {
				self.target.style.position = "static";
				self.setPosition();
				self.fixTimer = false;
				self.fixScroll()
			} else {
				self.config.onresize && self.config.onresize.apply(self)
			}
		}
		self.saveWidth = document.documentElement.clientWidth;
		self.saveHeight = document.documentElement.clientHeight
	},
	fixChange:function() {
		var self = this;
		self.limit = self.getLimit();
		self.target.style.position = "static";
		self.setPosition();
		self.fixTimer = false;
		self.fixScroll()
	},
	setPosition: function() {
		this.positionParent = this.target.offsetParent;
		if (this.isIE6 && this.searchPosition()) {
			// this.curLeft = this.target.getBoundingClientRect().left - this.positionParent.getBoundingClientRect().left;
			this.curLeft = this.getElementPosition(this.target).x ;
			window[this.id + "nTop"] = this.positionParent.getBoundingClientRect().top - 2 - this.marginTop
		} else {
			// this.curLeft = this.target.getBoundingClientRect().left - 2;
			this.curLeft = this.isIE6 ? this.getElementPosition(this.target).x +2 : this.getElementPosition(this.target).x;
			window[this.id + "nTop"] = -this.marginTop
		}
	},
	searchPosition: function() {
		while (this.positionParent.nodeName.toLowerCase() != "body" && this.positionParent.nodeName.toLowerCase() != "html") {
			var a = this.positionParent.currentStyle ? this.positionParent.currentStyle.position : getComputedStyle(this.positionParent, null)["position"];
			if (a == "static") {
				this.positionParent = this.positionParent.offsetParent;
				continue
			} else {
				return true
			}
		}
		return false
	},
	fixStatic: function() {
		if (this.isIE6) {
			var a = this.top - document.body.scrollTop;
			this.target.style.position = "absolute";
			this.target.style.left = this.left + "px";
			this.target.style.setExpression("top", "eval(document.documentElement.scrollTop + " + a + ') + "px"');
			this.setCommonStyle()
		} else {
			this.target.style.position = "fixed";
			this.target.style.left = this.left + "px";
			this.target.style.top = this.top + "px";
			this.setCommonStyle()
		}
	},
	fixScroll: function() {
		var a = document.body.scrollTop || document.documentElement.scrollTop;

		if(this.limit>0 && a>= this.limit){

			if(!this.absoluteTimer || this.fixTimer){
				this.setAbsolute();
			}
		}else if (a >= this.orgTop) {

			this.fixTimer ? null : this.setScrollFix()
		} else {

			this.target.style.cssText = this.saveStyle;
			this.copyElement.style.display = "none";
			this.fixTimer = false;
		}
	},
	setScrollFix: function() {
		if (this.isIE6) {
			this.target.style.position = "absolute";
			this.target.style.left = this.curLeft + "px";
			this.target.style.setExpression("top", 'eval(document.documentElement.scrollTop) - window[this.id+"nTop"] +"px"');
			this.copyElement.style.display = "block";
			this.copyElement.style.visibility = "hidden";
			this.setCommonStyle();
			this.fixTimer = true
		} else {
			this.target.style.position = "fixed";
			this.target.style.left = this.curLeft + "px";
			this.target.style.top = this.marginTop + "px";
			this.copyElement.style.display = "block";
			this.copyElement.style.visibility = "hidden";
			this.setCommonStyle();
			this.fixTimer = true;
		}
	},
	setAbsolute: function() {
		if(this.isIE6){
			this.target.style.setExpression("top", 'this.limit +"px"');
			this.target.style.top = this.limit+'px';
			var left = this.curLeft + "px";
			this.target.style.left = left;
		}else{
			this.target.style.top = this.limit + 'px';
			var left = parseFloat(this.curLeft) + "px";
			this.target.style.left = left;
		}
			this.target.style.position = 'absolute';
			this.target.style.bottom = '';
			this.copyElement.style.display = "block";
			this.copyElement.style.visibility = "hidden";
			this.setCommonStyle();
			this.absoluteTimer=true;
			this.fixTimer=false;
	},
	getLimit: function() {
            var limit = this.config.limit;
            if (!limit) return 0;

            if (typeof(limit) === 'function') {
                return limit.apply(this);
            }
            return limit;
    },
	setCommonStyle: function() {
		this.target.style.width = this.curWidth + "px";
		this.target.style.zIndex = 9999;
		this.target.style.margin = 0
	},
	createCopyElement: function() {
		this.copyElement = this.target.cloneNode(false);
		this.copyElement.id = "";
		this.copyElement.style.width = this.curWidth + "px";
		this.copyElement.style.height = this.target.clientHeight + "px";
		this.target.parentNode.insertBefore(this.copyElement, this.target);
		this.copyElement.style.display = "none"
	},
	addEvent: function(c, b, a) {
		return c.addEventListener ? c.addEventListener(b, a, false) : c.attachEvent("on" + b, a)
	}
};
