const getSurroundingBlocks=(_playerX,_playerY,_map)=>{
	const blocks={};
	if(_playerX===0){
		blocks['left']="";
		blocks['right']="";
	}
	if(_playerY===0){
		blocks['up']="";
		blocks['down']="";
	}
	if(_playerY>0){
		blocks['up']=_map[_playerY-1][_playerX];
	}
	if(_playerY<_map.length-1){
		blocks['down']=_map[_playerY+1][_playerX];
	}
	if(_playerX>0){
		blocks['left']=_map[_playerY][_playerX-1];
	}
	if(_playerX<_map[0].length-1){
		blocks['right']=_map[_playerY][_playerX+1];
	}
	return blocks;
};

const inCorrectPosition=(_player)=>{
	const positionsAccepted=_player.getPositionsAccepted();
	const pixel=_player.getPosition();
	return (positionsAccepted.includes(pixel['x'])&&positionsAccepted.includes(pixel['y']));	
};

const checkCollision=(_player,_movement)=>{
	const {x,y}=_player.getGridPosition();
	const pixel=_player.getPosition();
	const blocks=getSurroundingBlocks(x,y,map);

	if(blocks[_movement]!==" "&&blocks[_movement]!=="."&&blocks[_movement]!=="o"&&blocks[_movement]!=='B'){
		if(_movement==="left"){
			return (pixel['x']==x*Boundary.distance+Boundary.distance/2);
		}
		else if(_movement==="right"){
			return (pixel['x']==x*Boundary.distance+Boundary.distance/2);
		}
		else if(_movement==="up"){
			return (pixel['y']==y*Boundary.distance+Boundary.distance/2);
		}
		else{
			return (pixel['y']==y*Boundary.distance+Boundary.distance/2);
		}
	}
	else{
		return false;
	}
};

const hasCollision=(_player,_keyCode)=>{
	return checkCollision(_player,movements[_keyCode].movement);
};

const ghostMovement=(_ghost,_index)=>{
	const {x,y}=_ghost.getGridPosition();
	const pixel=_ghost.getPosition();
	const blocks=getSurroundingBlocks(x,y,map);
	for(let direction in blocks){
		if(blocks[direction]===" "||blocks[direction]==="."||blocks[direction]==="o"||blocks[direction]==="_"){
			pathsAvailable[_index].push(direction);
		}
	}
	const oppositeMove={
		up:"down",
		down:"up",
		left:"right",
		right:"left"
	};
	
	if(pathsAvailable[_index].length>1){
		pathsAvailable[_index]=pathsAvailable[_index].filter(_move=>{
			return oppositeMove[prevMove[_index]]!==_move;
		});		
	}
	
	if(inCorrectPosition(_ghost)){	
		const rand=Math.floor(Math.random()*pathsAvailable[_index].length);
		move[_index]=pathsAvailable[_index][rand];
		prevMove[_index]=move[_index];
		_ghost.movements[move[_index]]();
	}
	pathsAvailable[_index].length=0;
};

const ghostCollision=(_ghost,_index)=>{
	if( Math.hypot(
			_ghost.getPosition('x')-pacman.getPosition('x'),
			_ghost.getPosition('y')-pacman.getPosition('y')
		)
		<pacman.getRadius()+_ghost.getRadius()
	){
		if(_ghost.getScared()){
			ghosts.splice(_index,1);
			updateScore(200);
			audio['eatGhost'].play();
			setTimeout(()=>{
				_ghost.setDefaultVelocity(1);
				_ghost.setScared(false);
				_ghost.setPosition(345,285);
				if(ghosts.length<4){
					ghosts.push(_ghost);						
				}
			},6000);
		}
		else{
			death=true;
			life--;
			$('#life').text(life);
		}
	}
};