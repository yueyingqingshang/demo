function Draw (canvas,config = {}) {
	if(!canvas) {
		return;
	};

	//getComputedStyle获取当前canvas所以用的css属性值
	let {width,height} = window.getComputedStyle(canvas,null);
	width = width.replace('px','');
	height = height.replace('px','');
	

	// const d = document;
	// //ie不支持innerWidth以及innerHeight
	// const w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
	// const h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight;

	this.canvas = canvas;
	this.context = canvas.getContext('2d');
	this.width = width;
	this.height = height;

	this.canvas.width = width;
	this.canvas.height = height;

	//初始化画笔
	const context = this.context;
	context.lineWidth = '6';
	context.strokeStyle = 'black';
	context.lineCap = 'round';
	context.lineJoin = 'round';

	//如果有用户配置
	Object.assign(context,config);

	//保存画笔描过的点
	const point = {};

	//记录鼠标或者手指是否按下
	let pressed = false;

	//判断是否是移动端
	const isMobile = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent);
	//画点的方法
	const paint = (signal)=> {
		switch(signal) {
			case 1: 
				context.beginPath();
				context.moveTo(point.x,point.y);
			case 2: 
				context.lineTo(point.x,point.y);
				context.stroke();
				break;
		};
	};

	//记录当前划过的点
	const create = signal => (e) => {
		e.preventDefault();

		if(signal == 1) {
			pressed = true;
		};

		if(signal === 1 || pressed) {
			e = isMobile ?  e.touches[0] : e;
			point.x = e.clientX - left;
			point.y = e.clientY - top;
			paint(signal);
		};
	};

	//上述left和top并非内置，他们分别表示距离画布左边和顶部的距离，主要用于将屏幕的坐标点转换为画布的坐标点，可以运用一下方法
	//element.getBoundingClientRect();返回元素距离左，上，右，下的距离
	const {left,top} = canvas.getBoundingClientRect();
	
};