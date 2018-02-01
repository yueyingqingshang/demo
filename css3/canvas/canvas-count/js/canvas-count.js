;(function(win) {
	function Count(canvas,data,config) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.data = data || [];
		this.config = config;
		this.padding = 50;
		this.yNumber = 5;
		this.yFictitious = 0;
		this.yLength = 0;
		this.xLength = 0;
		this.yRatio = 0;                            // y轴坐标真实长度和坐标间距的比
    	this.bgColor = '#ffffff';                   // 默认背景颜色
    	this.fillColor = '#1E9FFF';                 // 默认填充颜色
    	this.axisColor = '#666666';                 // 坐标轴颜色
    	this.contentColor = '#eeeeee';              // 内容横线颜色
    	this.titleColor = '#000000';
		this.init();
	};

	Count.prototype = {};

	//初始化
	Count.prototype.init = function() {
		let {width,height} = window.getComputedStyle(this.canvas,null);
		let padding = this.padding;
		width = width.replace('px','');
		height = height.replace('px','');
		const context = this.context;
		this.canvas.width = width;
		this.canvas.height = height;
		context.strokeStyle = '#000000';
		Object.assign(context,this.config);

		//y轴的刻度的高度
		this.yLength = Math.floor((height - padding*2)/this.yNumber);
		//x轴的刻度高度
		this.xLength = Math.floor((width - padding*2)/this.data.length);
		//y轴坐标显示的距离
		this.yFictitious = this.getYFictitious(this.data);
		console.log(this.yFictitious,this.yLength,this.xLength);
		//刻画x轴
		context.beginPath();
		context.lineWidth = 1;

		//y轴
		context.moveTo(padding,height - padding);
		context.lineTo(padding,padding);

		//x轴
		context.moveTo(padding,height - padding);
		context.lineTo(width - padding,height - padding);
		context.stroke();

		this.DrawPoint();

	};

	//获取y轴坐标点显示的距离
	Count.prototype.getYFictitious = function(data) {
		var arr = data.slice(0);
		arr.sort(function(a,b) {
			return (b.value - a.value);
		});
		var len = Math.ceil(arr[0].value / this.yNumber);
		var pow = len.toString().length - 1;
        pow = pow > 2 ? 2 : pow;
        return Math.ceil(len / Math.pow(10,pow)) * Math.pow(10,pow);
	};

	//刻画坐标轴的点
	Count.prototype.DrawPoint = function() {
		const data = this.data;
		const context = this.context;
		context.beginPath();
		context.textAlign = 'center';

		//刻画x轴点
		for(var i = 0,len = data.length;i<len;i++) {
			var xAxis = data[i].xAxis;
			var xLen = this.xLength * (i+1);
			context.moveTo(this.padding + xLen,this.height - this.padding);
			context.lineTo(this.padding + xLen,this.height - this.padding + 5);
			context.stroke();

			//填充文字
			context.fillText(xAxis,this.padding + xLen - this.xLength/2,this.height - this.padding + 15);
		};
	};

	win['Count'] = Count;
})(window);