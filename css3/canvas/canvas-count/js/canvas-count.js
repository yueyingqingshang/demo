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
		let padding = 50;
		const context = this.context;
		width = width.replace('px','');
		height = height.replace('px','');
		this.canvas.width = width;
		this.canvas.height = height;
		context.strokeStyle = '#000000';
		Object.assign(context,this.config);

		context.beginPath();
		context.lineWidth = 1;

		//y轴
		context.moveTo(padding,height - padding);
		context.lineTo(padding,padding);
		//context.stroke();

		//x轴
		context.moveTo(padding,height - padding);
		context.lineTo(width - padding,height - padding);
		context.stroke();

	};

	//刻画坐标系
	win['Count'] = Count;
})(window);