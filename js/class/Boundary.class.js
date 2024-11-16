class Boundary{
	static distance=30;
	constructor({_position},_symbol){
		const symbol=_symbol;
		const position=_position;
		const width=30;
		const height=30;
		
		// const mapImages={
			// 1:"assets/pipeCorner1.png",
			// 2:"assets/pipeCorner2.png",
			// 3:"assets/pipeCorner3.png",
			// 4:"assets/pipeCorner4.png",
			// "|":"./assets/pipeVertical.png",
			// "-":"./assets/pipeHorizontal.png",
			// "u":"./assets/capBottom.png",
			// "<":"./assets/capLeft.png",
			// ">":"./assets/capRight.png",
			// "v":"./assets/pipeConnectorBottom.png",
			// "d":"./assets/pipeConnectorTop.png",
			// "r":"./assets/pipeConnectorRight.png",
			// "l":"./assets/pipeConnectorLeft.png",
			// "n":"./assets/capTop.png"
		// };
		
		this.draw=()=>{
			ctx.fillStyle="#0068ff";			
			ctx.fillRect(
				position.x,
				position.y,
				width,
				height
			);
			// const img=new Image();
			// img.src=mapImages[symbol];
			// ctx.drawImage(img,position.x,position.y,width,height);
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