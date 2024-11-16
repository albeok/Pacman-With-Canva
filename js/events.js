$('.play').click(()=>{
	$('.play').hide();
	setGame();
});

$(document).on('keydown',function({keyCode}){
	const keyCodeAvailable=[65,37,87,38,68,39,83,40];
	if(keyCodeAvailable.includes(keyCode)){
		keyDownPressed=true;
		lastKeyCode=keyCode;
	}
});

$(document).on('keyup',function(){
	keyDownPressed=false;
});