class Player{
	constructor(
	{
		_position={
			x:345,
			y:465
		},
		_velocity={
			x:0,
			y:0
		}
	}={}
	){
		let position=_position;
		let velocity=_velocity;
		let grid={x:0,y:0};
		let radians=0.75;
		let openRate=0.12;
		const radius=12;
		const defaultVel=2;
		const positionsAccepted=[45,75,105,135,165,195,225,255,285,315,345,375,405,435,465,495,525,555,585,615,645,675,705];
		const keyActions=[
			{	
				keys:[65,37],
				movement:"left",
				axis:"x",
				direction:-1
			},
			{	
				keys:[87,38],
				movement:"up",
				axis:"y",
				direction:-1
			},
			{	
				keys:[68,39],
				movement:"right",
				axis:"x",
				direction:1
			},
			{	
				keys:[83,40],
				movement:"down",
				axis:"y",
				direction:1
			}
		];
		
		const movements=keyActions.reduce((_movements,{keys,movement,axis,direction})=>{
			keys.forEach(key=>{
				_movements[key]={
					movement,					
					action:(_velocity=defaultVel)=>{
						const vel=_velocity*direction;
						velocity.x=axis==="x"?vel:0;
						velocity.y=axis==="y"?vel:0;
					}
				}
			});
			return _movements;
		},{});
		
		const draw=(_rotation)=>{
			ctx.save();
			ctx.translate(position.x,position.y);
			ctx.rotate(_rotation);
			ctx.translate(-position.x,-position.y);
			ctx.beginPath();
			if(position.y===285&&position.x===35){
				position.x=645;
			}
			else if(position.y===285&&position.x===645){
				position.x=35;
			}
			ctx.arc(position.x,position.y,radius,radians,Math.PI*2-radians);
			ctx.lineTo(position.x,position.y);
			ctx.fillStyle='yellow';
			ctx.fill();
			ctx.closePath();
			ctx.restore();
		};
		
		this.getPositionsAccepted=()=>positionsAccepted;
		
		this.getMovements=()=>movements;
		
		this.getGridPosition=()=>{
			positionsAccepted.some((currentVal,index)=>{
				if(position.x==currentVal){					
					grid.x=index+1;
				}
				if(position.y==currentVal){
					grid.y=index+1;
				}
			});
			return grid;
		};
		
		this.getPosition=(_axis=null)=>{
			if(_axis==="x"){
				return position.x;
			}
			else if(_axis==="y"){
				return position.y;
			}
			return position;
		};
		
		this.getVelocity=(_axis=null)=>{
			if(_axis==="x"){
				return velocity.x;
			}
			else if(_axis==="y"){
				return velocity.y;
			}
			return velocity;
		};
		
		this.getRadius=()=>{
			return radius;
		};
		
		this.rotation=(_movement)=>{
			let _rotation;
			if(_movement==="right")_rotation=0;
			else if(_movement==="left")_rotation=Math.PI;
			else if(_movement==="up")_rotation=Math.PI*1.5;
			else if(_movement==="down")_rotation=Math.PI/2;
			return _rotation;
		};
		
		this.clearVelocity=()=>{
			velocity={
				x:0,
				y:0
			}
		};
		
		this.resetRadians=()=>{
			radians=0.75;
		};
		
		this.resetOpenRate=()=>{
			openRate=0.12;
		};
		
		this.setPosition=(_x,_y)=>{
			position.x=_x;
			position.y=_y;
		};
		
		this.update=(_rotation)=>{
			position.x+=velocity.x;
			position.y+=velocity.y;
			draw(_rotation);
			if(velocity.x==0&&velocity.y==0){
				return;
			}
			if(radians<0||radians>0.75){
				openRate=-openRate;
			}
			radians+=openRate;
		};
	}
}