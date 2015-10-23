# JavaScript-scrollfix
javascript scrollfix

参数名称	类型	默认值	可选	描述
id	String		必选	固定定位的入口标识
isScroll	Boolean	false	 	是否滚动到顶部时才fixed
top	Number	0		isScroll为false时，fixed元素的top位置
left	Number	0		isScroll为false时，fixed元素的left位置
marginTop	Number	0		isScroll为true时，fixed元素与顶部的距离
onresize	Function	 	 	用于特殊情况，如靠右边的对联广告fixed，右下角底部fixed等，用this指向当前对象，详细使用方法见demo
