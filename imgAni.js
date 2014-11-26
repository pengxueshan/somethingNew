function imgAni(c){
	var c = c || {};
	var defaultConfig = {
		boxId : '',//容器id
		xNum : '',//图片水平放的单元数
		yNum : '',//图片垂直放的单元数
		imgWidth : '',//单元宽度
		imgHeight : ''//单元宽度
	};
	var config = {};
	var xpos = 0;
	var ypos = 0;
	var tmpx = 0;
	var tmpy = 0;
	var box = '';
	var myInterval = 0;
	function reset(){
		config = $.extend(defaultConfig, c);
		box = $(config.boxId);
		clearInterval(myInterval);
	}
	reset();
	
	function ani(){
		if(xpos<-config.imgWidth*(config.xNum-1)){xpos = 0;tmpx = 0;tmpy++;
			if(tmpy>config.yNum-1){tmpy = 0;}
		}
		box.css({'background-position':tmpx*-config.imgWidth+'px '+tmpy*-config.imgHeight+'px'});
		xpos += -config.imgWidth;
		tmpx++;
	}
	function start(){
		myInterval = setInterval(ani,100);
	}
	function stop(){
		clearInterval(myInterval);
	}
	
	return {
		'run' : start,
		'stop' : stop
	}
}

var runHose = imgAni({
	boxId : '#anibox',//容器id
	xNum : '3',//图片水平放的单元数
	yNum : '2',//图片垂直放的单元数
	imgWidth : '200',//单元宽度
	imgHeight : '200'//单元宽度
});
runHose.run();