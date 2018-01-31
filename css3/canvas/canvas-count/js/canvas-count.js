;(function(win) {
	function Count(canvas,config={}) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.config = config;
		this.init();
	};

	Count.prototype = {};

	//初始化
	Count.prototype.init = function() {
		let {width,height} = window.getComputedStyle(this.canvas,null);
		width = width.replace('px','');
		height = height.replace('px','');
		this.canvas.width = width;
		this.canvas.height = height;
	};
	win['Count'] = Count;
})(window);