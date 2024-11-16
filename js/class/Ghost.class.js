class Ghost{
	constructor(
	{
		_position={
			x:0,
			y:0
		},
		_velocity={
			x:0,
			y:0
		},
		_color="#FF0000",
	}={}
	){
		let position=_position;
		let velocity=_velocity;
		let grid={x:0,y:0};
		let defaultVel=2;
		let color=_color;
		let scared=false;
		const positionsAccepted=[45,75,105,135,165,195,225,255,285,315,345,375,405,435,465,495,525,555,585,615,645,675,705];
		const radius=12;
		const draw=()=>{
			ctx.beginPath();
			ctx.arc(position.x,position.y,radius,0,Math.PI*2);
			ctx.fillStyle=scared?'blue':color;
			ctx.fill();
			ctx.closePath();
		};
		
		this.movements={
			"left":()=>
				{
					velocity.x=-defaultVel;
					velocity.y=0;
				}
			,
			"up":()=>
				{
					velocity.x=0;
					velocity.y=-defaultVel;
				}
			,
			"right":()=>
				{
					velocity.x=defaultVel;
					velocity.y=0;
				}
			,
			"down":()=>
				{
					velocity.x=0;
					velocity.y=defaultVel;
				}
		};
				
		this.getGridPosition=(_distance)=>{
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
		
		this.getRadius=()=>{
			return radius;
		};
		
		this.getScared=()=>{
			return scared;
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
		
		this.getPositionsAccepted=()=>positionsAccepted;
		
		this.setPosition=(_x,_y)=>{
			position.x=_x;
			position.y=_y;
		};
		
		this.setDefaultVelocity=(_vel)=>{
			defaultVel=_vel;
		};
			
		this.setScared=(_bool)=>{
			return scared=_bool;
		};
		
		this.update=()=>{
			position.x+=velocity.x;
			position.y+=velocity.y;
			draw();
		};
	
	}
}