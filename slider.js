function slider(c){
	var c = c || {};
	var defaultConfig = {
		slideId: '#slider', //轮播容器id，也可以传入其他选择器
		itemNum: 0, //轮播图片数
		itemTime: 300, //轮播一张的时间
		waitTime: 3000, //轮播一次等待时间
		preId: '', //前一页id
		nexrId: '', //下一页id
		paginationId: '#pagination', //点点容器id
		current: 'current', //点点当前类
		isAuto: true
	};
	var config = {};

	var timeoutId; //定时器
	var currentIndex; //当前轮播到第几张
	var sliderBox; //轮播容器
	var paginationBox; //点点
	var imgBox; //图片容器
	var moveWidth; //每次移动距离
	var preBtn; //前一页
	var nextBtn; //下一页
	function reset(){
		config = $.extend(defaultConfig, c);
		timeoutId = 0;
		currentIndex = 0;
		sliderBox = $(config.slideId);
		paginationBox = $(config.paginationId);
		imgBox = sliderBox.find('.imgwrap');
		moveWidth = sliderBox.find('.s_item').width();
		if(config.preId !== ''){preBtn = $(config.preId);preBtn.click(pre);}
		if(config.nexrId !== ''){nextBtn = $(config.nexrId);nextBtn.click(next);}
		if(config.itemNum == 0){config.itemNum = sliderBox.find('.s_item').length;}
		imgBox.width(moveWidth*config.itemNum);
		clearTimeout(timeoutId);
		myTimeout();
	}
	reset();
	
	function next(){
		currentIndex++;
		if(currentIndex == config.itemNum){currentIndex = 0;}
		move();
	}
	
	function pre(){
		currentIndex--;
		if(currentIndex == -1){currentIndex = config.itemNum - 1;}
		move();
	}
	
	function move(){
		clearTimeout(timeoutId);
		imgBox.animate({
			left : currentIndex*moveWidth*-1
		},config.itemTime);
		paginationBox.children().eq(currentIndex).addClass(config.current).siblings().removeClass(config.current);
		myTimeout();
	}
	
	function myTimeout(){
		if(config.isAuto){
			clearTimeout(timeoutId);
			timeoutId = setTimeout(next,config.waitTime);
		}
	}
	
	paginationBox.children().click(function(){
		currentIndex = paginationBox.children().index($(this));
		move();
	});
}
