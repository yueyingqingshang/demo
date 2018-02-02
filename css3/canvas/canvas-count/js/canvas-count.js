;(function(win) {
	function Count(canvas,data,config) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.data = data || [];
		this.config = config;
		this.looped = null;
		this.padding = 50;
		this.yNumber = 5;
		this.yFictitious = 0;
		this.yLength = 0;
		this.xLength = 0;
		this.yRatio = 0; 
		this.current = 0;                           
    	this.bgColor = '#ffffff';                   
    	this.fillColor = '#1E9FFF';                 
    	this.axisColor = '#666666';                 
    	this.contentColor = '#eeeeee';              
    	this.titleColor = '#000000';
    	this.title = '公司年报';
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
		this.width = width;
		this.height = height;
		context.strokeStyle = '#000000';
		Object.assign(context,this.config);
		//y轴的刻度的高度
		this.yLength = Math.floor((height - padding*2)/this.yNumber);
		//x轴的刻度高度
		this.xLength = Math.floor((width - padding*2)/this.data.length);
		//y轴坐标显示的距离
		this.yFictitious = this.getYFictitious(this.data);
		this.yRatio = this.yLength / this.yFictitious;
		this.looping();

	};
	//柱状图动画
	Count.prototype.looping = function () {
		this.looped = requestAnimationFrame(this.looping.bind(this));
		if(this.current < 100) {
			this.current = (this.current + 3) > 100 ? 100 : (this.current+3);
			this.drawAnimation();
		} else {
			window.cancelAnimationFrame(this.looped);
			this.looped = null;
		}
	};

	//画出柱状图
	Count.prototype.drawAnimation = function() {
		const data = this.data;
		for(var i = 0,len = data.length;i<len;i++) {
			var x = (data[i].value * this.current/100*this.yRatio);
			var y = this.height - this.padding - x;
			// 保存每个柱状的信息
	        data[i].left = this.padding + this.xLength * (i + 0.25);
	        data[i].top = y;
	        data[i].right = this.padding + this.xLength * (i + 0.75);
	        data[i].bottom = this.height - this.padding;
	        this.updateChart();
		};
	};

	//更新图标
	Count.prototype.updateChart = function() {
		this.context.fillStyle = this.bgColor;
		this.context.fillRect(0, 0, this.width, this.height);
		this.drawAxis();
		this.drawPoint();
		this.drawTitle();
		this.drawChart();
	};
	Count.prototype.drawAxis = function() {
		const context = this.context;
		//刻画x轴
		context.beginPath();
		context.lineWidth = 1;

		//y轴
		context.moveTo(this.padding,this.height - this.padding);
		context.lineTo(this.padding,this.padding);

		//x轴
		context.moveTo(this.padding,this.height - this.padding);
		context.lineTo(this.width - this.padding,this.height - this.padding);
		context.stroke();
	};

	//刻画坐标轴的点
	Count.prototype.drawPoint = function() {
		const data = this.data;
		const context = this.context;
		context.beginPath();
		context.textAlign = 'center';
		context.fillStyle = '#000000';
		context.strokeStyle = '#000000';
		//刻画x轴点
		for(var i = 0,len = data.length;i<len;i++) {
			var xAxis = data[i].xAxis;
			var xLen = this.xLength * (i+1);
			context.moveTo(this.padding + xLen,this.height - this.padding);
			context.lineTo(this.padding + xLen,this.height - this.padding + 5);
			//填充文字
			context.fillText(xAxis,this.padding + xLen - this.xLength/2,this.height - this.padding + 15);
		};
		context.stroke();

		context.beginPath();
		context.font = '12px Microsoft YaHei';
        context.textAlign = 'right';
        context.fillStyle = this.axisColor;
        context.fillText(0,this.padding - 10, this.height - this.padding + 5);
		//刻画y轴
		for(var j = 0;j<this.yNumber;j++) {
			var y = this.yFictitious * (j+1);
			var yLen = this.yLength * (j+1);
			context.moveTo(this.padding,this.height - this.padding - yLen);
			context.lineTo(this.padding - 5,this.height - this.padding - yLen);
			context.fillText(y,this.padding - 10, this.height - this.padding - yLen + 5);

			context.beginPath();
			context.moveTo(this.padding + 0.5,this.height - this.padding - yLen);
			context.lineTo(this.width - this.padding,this.height - this.padding - yLen);
			context.stroke();
		};
		context.stroke();
	};

	//加上各自的数值
	Count.prototype.drawChart = function() {
		const context = this.context;
		const data = this.data;
		for(var i = 0,len = data.length;i<len;i++) {
			context.fillRect(
				data[i].left,
				data[i].top,
				data[i].right - data[i].left,
				data[i].bottom - data[i].top
			);

			context.fillText(
				data[i].value * this.current/100,
				data[i].left + this.xLength / 4, 
                data[i].top - 5
			)
		};
	};
	//添加title
	Count.prototype.drawTitle = function() {
		const context = this.context;
		if(this.title) {
			context.beginPath();
			context.textAlign = 'center';
			context.fillStyle = this.titleColor;
			context.font = '16px Microsoft YaHei';
			if(this.titlePosition === 'bottom' && this.padding >= 40){
				context.fillText(this.title, this.width / 2, this.height - 5)
			}else{
				context.fillText(this.title, this.width / 2, this.padding / 2)
			}
		}
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
	win['Count'] = Count;
})(window);