class PowerPill{
	constructor({_position,_distance=30}){
		const position={'x':_position.x+_distance/2,'y':_position.y+_distance/2};
		const radius=8;
		
		this.draw=()=>{
			ctx.beginPath();
			ctx.arc(position.x,position.y,radius,0,Math.PI*2);
			ctx.fillStyle="white";
			ctx.fill();
			ctx.closePath();
		};
		
		this.getPosition=()=>position;
	}
};