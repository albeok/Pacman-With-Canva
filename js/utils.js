const ghostsInit=()=>{
	const ghosts=[
		new Ghost({_position:{x:345,y:225}}),
		new Ghost({_position:{x:345,y:285},_color:"#FFB8FF"}),
		new Ghost({_position:{x:315,y:285},_color:"#00FFFF"}),
		new Ghost({_position:{x:375,y:285},_color:"#FFB852"})
	];
	return ghosts;
};

const updateScore=(_score)=>{
	score+=_score;
	$('#score').text(score);
};

const setGame=()=>{
	audio['start'].play();
	$('.ready').show();
	updateMap();
	updatePosGhost();
	setTimeout(()=>{
		initialGame=true;
		audioOn=false;
		$('.ready').hide();
		animate();
	},4000);
};

const resetGame=()=>{
	death=false;
	interlock=false;
	programmedMove=false;
	lastKeyCode=null;
	lastApprovedKeyCode=65;
	pacman.clearVelocity();
	rotation=Math.PI;
	pacman.resetRadians();
	pacman.resetOpenRate();
	ghosts.length=0;
	ghosts=ghostsInit();
	pacman.setPosition(345,465);
	setGame();
};

const updatePosGhost=()=>{
	ghosts.forEach((ghost,i)=>{
		ghost.update();
	});
};

const scaredAudio=()=>{
	if(scared){
		audioOn=true;
		audio['pill'].play();
	}
	else{
		audioOn=false;
		audio['pill'].pause();
	}
};

const handleScaredEvent=()=>{
	scared=true;
	ghosts.forEach(ghost=>{
		ghost.setScared(true);
		ghost.setDefaultVelocity(1);
		setTimeout(()=>{
			ghost.setDefaultVelocity(2);
			ghost.setScared(false);
			scared=false;
		},10000);
	});
};