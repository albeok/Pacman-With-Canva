const canvas=$('.canvas').get(0);
const ctx=canvas.getContext('2d');
const pacman=new Player();
canvas.width=innerWidth;
canvas.height=innerHeight;

let animationId;
let initialGame=true;
let win=false;
let death=false;
let life=3;
let score=0;
let audioOn=false;
let keyDownPressed=false;
let lastApprovedKeyCode=65;
let lastKeyCode=null;
let programmedMove=false;
let interlock=false;
let rotation=Math.PI;
let ppSound=false;
let scared=false;
let pathsAvailable={0:[],1:[],2:[],3:[]};
let move={0:null,1:null,2:null,3:null};
let prevMove={0:null,1:null,2:null,3:null};
let ghosts=ghostsInit();
const movements=pacman.getMovements();
const audio={
	'death':new Audio('assets/sounds/death.wav'),
	'eatGhost':new Audio('assets/sounds/eat_ghost.wav'),
	'start':new Audio('assets/sounds/game_start.wav'),
	'food':new Audio('assets/sounds/munch.wav'),
	'pill':new Audio('assets/sounds/pill.wav'),
	'siren':new Audio('assets/sounds/siren.mp3'),
};

const updateMap=()=>{
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawOnMap();
	pacman.update(rotation);
};

const handleSounds=()=>{
	if(!audioOn)audio['siren'].play();
	else audio['siren'].pause();	
};

const setupInitialMove=()=>{
	if(!initialGame){
		return;
	}
	if(lastKeyCode&&!interlock){
		keyDownPressed=true;
		interlock=true;
	}
	else if(!lastKeyCode&&!interlock){
		lastKeyCode=lastApprovedKeyCode;
		interlock=true;
	}
	if(!hasCollision(pacman,lastKeyCode)&&inCorrectPosition(pacman)){
		console.log("BEGIN processMovement. Moving.");
		movements[lastKeyCode].action();
		rotation=pacman.rotation(movements[lastKeyCode].movement);
		lastApprovedKeyCode=lastKeyCode;
		keyDownPressed=false;
	}
	else if(programmedMove&&!hasCollision(pacman,lastApprovedKeyCode)&&inCorrectPosition(pacman)){
		console.log("BEGIN processMovement. moving with programmed");
		movements[lastApprovedKeyCode].action();
		rotation=pacman.rotation(movements[lastApprovedKeyCode].movement);
	}
	else if(lastKeyCode&&hasCollision(pacman,lastApprovedKeyCode)&&keyDownPressed){
		console.log("BEGIN processMovement. Don't let pacman passing through the walls.");
		pacman.clearVelocity();
	}
	else if(hasCollision(pacman,lastKeyCode)&&keyDownPressed){
		console.log("BEGIN processMovement. Scheduling next move.");
		programmedMove=true;
		keyDownPressed=false;
	}
	else if(!programmedMove&&hasCollision(pacman,lastKeyCode)){
		console.log("BEGIN processMovement. Stop Pacman due to collision.");
		pacman.clearVelocity();
		lastKeyCode=null;
		initialGame=false;
		lastKeyCode=null;
	}
	else if(programmedMove&&hasCollision(pacman,lastApprovedKeyCode)){
		console.log("BEGIN processMovement. Stop Pacman due to collision from programmed move.");
		pacman.clearVelocity();
		programmedMove=false;
		initialGame=false;
		lastKeyCode=null;
	}
};

const processMovement=()=>{
	if(lastKeyCode&&!hasCollision(pacman,lastKeyCode)&&inCorrectPosition(pacman)){
		// console.log("Moving.");
		movements[lastKeyCode].action();
		lastApprovedKeyCode=lastKeyCode;
		rotation=pacman.rotation(movements[lastKeyCode].movement);		
	}
	else if(lastKeyCode&&hasCollision(pacman,lastApprovedKeyCode)&&keyDownPressed){
		// console.log("Don't let pacman passing through the walls.");
		pacman.clearVelocity();
	}
	else if(lastKeyCode&&hasCollision(pacman,lastKeyCode)&&keyDownPressed){
		// console.log("Scheduling next move.");
		programmedMove=true;
	}
	else if(lastKeyCode&&!programmedMove&&hasCollision(pacman,lastKeyCode)){
		// console.log("Stop Pacman due to collision.");
		pacman.clearVelocity();
		lastKeyCode=null;
	}
	else if(programmedMove&&hasCollision(pacman,lastApprovedKeyCode)){
		// console.log("Stop Pacman due to collision from programmed move.");
		pacman.clearVelocity();
		programmedMove=false;
	}
};

const handleGhostsMovement=()=>{
	ghosts.forEach((ghost,i)=>{
		ghostMovement(ghost,i);
		ghostCollision(ghost,i);
		ghost.update();
	});
};

const updateFoods=()=>{
	for(let i=foods.length-1;0<=i;i--){
		const food=foods[i];
		if(food.getPosition()['x']===pacman.getPosition('x')&&food.getPosition()['y']===pacman.getPosition('y')){
			foods.splice(i,1);			
			updateScore(10);
			audio['food'].play();	
		}
	}
};

const updatePills=()=>{
	for(let i=powerPills.length-1;0<=i;i--){
		const powerPill=powerPills[i];
		if(powerPill.getPosition()['x']===pacman.getPosition('x')&&powerPill.getPosition()['y']===pacman.getPosition('y')){
			powerPills.splice(i,1);
			updateScore(15);
			handleScaredEvent();
		}
	}
	scaredAudio();
};

const handleWinDeath=()=>{
	if(powerPills.length===0&&foods.length===0){
		win=true;
	}
	if(win){
		$('.lightbox').show();
		cancelAnimationFrame(animationId);
	}
	if(death){
		death=false;
		audioOn=true;
		audio['siren'].pause();
		audio['death'].play();
		if(life===0){
			$('.lightbox .status').text("LOSE");
			$('.lightbox').css('color','red');
			$('.lightbox').show();
			cancelAnimationFrame(animationId);
		}
		else{
			cancelAnimationFrame(animationId);			
			setTimeout(()=>{				
				resetGame();
			},3000);
		}
	}
};

const animate=()=>{
	animationId=requestAnimationFrame(animate);
	updateMap();
	handleSounds();
	initialGame?setupInitialMove():processMovement();
	handleGhostsMovement();
	updateFoods();
	updatePills();
	handleWinDeath();
};