class Map{
	constructor(){
		
		this.map=[
			[" "," ","1","=","=","=","=","=","=","=","=","v","=","=","=","=","=","=","=","=","2"," "," "],
			[" "," ","4|",".",".",".",".",".",".",".",".","|",".",".",".",".",".",".",".",".","|"," "," "],
			[" "," ","l|","o","<",">",".","<","-",">",".","u",".","<","-",">",".","<",">","o","|"," "," "],
			[" "," ","l|",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","|"," "," "],
			[" "," ","l|",".","<",">",".","n",".","<","-","v","-",">",".","n",".","<",">",".","|"," "," "],
			[" "," ","4|",".",".",".",".","|",".",".",".","|",".",".",".","|",".",".",".",".","|"," "," "],
			[" "," ","4","b=","b=","2",".","r","-",">"," ","u"," ","<","-","l",".","1","-","-","3"," "," "],
			[" "," "," "," "," ","l|",".","|"," "," "," "," "," "," "," ","|",".","|"," "," "," "," "," "],
			[" ","<","=","=","=","3",".","u"," ","1","-","-","-","2"," ","u",".","4","=","=","=",">"," "],
			[" "," "," "," "," "," ","."," "," ","|"," "," "," ","|"," "," ","."," "," "," "," "," "," "],
			[" ","<","b=","b=","b=","2",".","n"," ","4","-","-","-","3"," ","n",".","1","b=","b=","b=",">"," "],
			[" "," "," "," "," ","||",".","|"," "," "," "," "," "," "," ","|",".","|"," "," "," "," "," "],
			[" "," ","1","=","=","3",".","u"," ","<","-","v","-",">"," ","u",".","4","-","-","2"," "," "],
			[" "," ","4|",".",".",".",".",".",".",".",".","|",".",".",".",".",".",".",".",".","|"," "," "],
			[" "," ","l|",".","<","2",".","<","-",">",".","u",".","<","-",">",".","1",">",".","|"," "," "],
			[" "," ","l|","o",".","|",".",".",".",".",".",".",".",".",".",".",".","|",".","o","|"," "," "],
			[" "," ","r",">",".","u",".","n",".","<","-","v","-",">",".","n",".","u",".","<","l"," "," "],
			[" "," ","l|",".",".",".",".","|",".",".",".","|",".",".",".","|",".",".",".",".","|"," "," "],
			[" "," ","l|",".","<","-","-","d","-",">",".","u",".","<","-","d","-","-",">",".","|"," "," "],
			[" "," ","4|",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","|"," "," "],
			[" "," ","4","b=","b=","b=","b=","b=","b=","b=","b=","b=","b=","b=","b=","b=","b=","b=","b=","b=","3"," "," "],
		];
		
		const drawWall=(_symbol,x,y)=>{
			const cellSize=30;
			const x_px=x*cellSize;
			const y_px=y*cellSize;
			const radius=10;
			const offset=5
			const radiusLarge=8;
			const radiusSmall=4;
			const lineDistance=radiusLarge+radiusSmall+5;

			switch(_symbol){
				case '1':
					ctx.beginPath();
					ctx.arc(x_px+cellSize+5,y_px+cellSize+4,radiusLarge,Math.PI,Math.PI*1.5,false);
					ctx.stroke();
					
					ctx.beginPath();
					ctx.arc(x_px+cellSize+5,y_px+4+cellSize,radiusSmall,Math.PI,Math.PI*1.5,false);
					ctx.stroke();
					break;
				case '4':
					ctx.beginPath();
					ctx.arc(x_px+cellSize+5,y_px-5,radiusLarge,Math.PI*0.5,Math.PI,false);
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(x_px+cellSize+5,y_px-5,radiusSmall,Math.PI*0.5,Math.PI,false);
					ctx.stroke();
					break;
				case '=':
					const lineOffsetY=-4;
					ctx.beginPath();
					ctx.moveTo(x_px+5,y_px+cellSize-radiusLarge-lineOffsetY);
					ctx.lineTo(x_px+cellSize+5,y_px+cellSize-radiusLarge-lineOffsetY);
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(x_px+5,y_px+cellSize-radiusSmall-lineOffsetY);
					ctx.lineTo(x_px+cellSize+5,y_px+cellSize-radiusSmall-lineOffsetY);
					ctx.stroke();
					break;
				case 'b=':
					const lineOffsetYb=23;
					ctx.beginPath();
					ctx.moveTo(x_px+5,y_px+cellSize-radiusLarge-lineOffsetYb);
					ctx.lineTo(x_px+cellSize+5,y_px+cellSize-radiusLarge-lineOffsetYb);
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(x_px+5,y_px+cellSize-radiusSmall-lineOffsetYb);
					ctx.lineTo(x_px+cellSize+5,y_px+cellSize-radiusSmall-lineOffsetYb);
					ctx.stroke();
					break;
				case '4|':
					const offsetX=-3;
					ctx.beginPath();
					ctx.moveTo(x_px+cellSize+offsetX,y_px+3);
					ctx.lineTo(x_px+cellSize+offsetX,y_px+cellSize-3);
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(x_px+cellSize+offsetX+4,y_px-2);
					ctx.lineTo(x_px+cellSize+offsetX+4,y_px+cellSize-3);
					ctx.stroke();
					break;
				case 'l|':
					ctx.beginPath();
					ctx.moveTo(x_px+cellSize-3,y_px-3);
					ctx.lineTo(x_px+cellSize-3,y_px+cellSize+3);
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(x_px+cellSize-3+4,y_px);
					ctx.lineTo(x_px+cellSize-3+4,y_px+cellSize-2);
					ctx.stroke();
					break;
				case 'r':
					const cornerRadius = 5;
					const shiftX = 30;
					const miniRadius=5;
					ctx.beginPath();
					ctx.moveTo(x_px+cellSize-3,y_px);
					ctx.lineTo(x_px+cellSize-3,y_px+cellSize);
					ctx.stroke();
					break;
				case '>':
					ctx.beginPath();
					ctx.arc(x_px+5,y_px-4,radiusSmall,Math.PI*0.5,Math.PI,false);
					ctx.stroke();
					ctx.beginPath();
					ctx.moveTo(x_px+3,y_px);
					ctx.lineTo(x_px+cellSize-3,y_px);
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(x_px+cellSize-5,y_px+5,radiusLarge-3,Math.PI*1.5,Math.PI*2,false);
					ctx.stroke();
					ctx.beginPath();
					ctx.moveTo(x_px+cellSize,y_px+3);
					ctx.lineTo(x_px+cellSize,y_px+cellSize-5);
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(x_px+cellSize-5,y_px+cellSize-8,radiusLarge-3,Math.PI*2,Math.PI*0.5,false);
					ctx.stroke();
					ctx.beginPath();
					ctx.moveTo(x_px+cellSize-5,y_px+cellSize-3);
					ctx.lineTo(x_px+3,y_px+cellSize-3);
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(x_px+5,y_px+cellSize+1,radiusSmall,Math.PI,Math.PI*1.5,false);
					ctx.stroke();
			}
			ctx.strokeStyle="blue";
			ctx.lineWidth=2;
			ctx.closePath();
		};

	}
};