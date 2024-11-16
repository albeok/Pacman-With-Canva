class Door{
	static distance=30;
	constructor({_position},_symbol){
		const symbol=_symbol;
		const position=_position;
		const width=30;
		const height=5;

		
		this.draw=()=>{
			ctx.fillStyle="#ffffff";			
			ctx.fillRect(
				position.x,
				position.y,
				width,
				height
			);
		};
		
		this.getPosition=(_axis)=>{
			if(_axis==="x"){
				return position.x;
			}
			else if(_axis==="y"){
				return position.y;
			}
			return position;
		};
	}
};