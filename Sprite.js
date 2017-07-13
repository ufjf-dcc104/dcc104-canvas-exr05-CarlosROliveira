function Sprite(){
  this.g = 0;
  this.x = 20;
  this.y = 150;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.width = 30;
  this.height = 30;
  this.color = "#6CA6CD";
  this.tiros = [];
  this.direcao = "topo";
  this.vida = 100;
}

Sprite.prototype.desenhar = function (ctx){
	/*ctx.beginPath();
	if(this.direcao = "topo"){
		ctx.moveTo(this.x, this.y); // meio do triangulo (x) e y
		ctx.lineTo((this.x - 15), (this.y + 30)); // inicio esquerda (x) e y
		ctx.lineTo((this.x + 15), (this.y + 30)); // final direita (x) e y
	}else if(this.direcao = "baixo"){
		//console.log("baixo");
	}else if(this.direcao = "esquerda"){
		//console.log("esquerda");
	}else{
		//console.log("direita");
	}
    ctx.closePath();
	ctx.fillStyle = this.color;
	ctx.fill();
    ctx.stroke();*/
	
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
	ctx.strokeStyle = "black";
	ctx.strokeRect(this.x, this.y, this.width, this.height);
	
	//só pra ver o contorno quadrado
	//ctx.strokeStyle = "black";
	//ctx.strokeRect(this.x-15, this.y, this.width, this.height);
  
  for (var i = 0; i < this.tiros.length; i++) {
    this.tiros[i].desenhar(ctx);
  }
}

Sprite.prototype.mover = function (dt){
  //Aceleração
  this.vx = this.vx + this.ax*dt;
  this.vy = this.vy + (this.ay+this.g)*dt;
//console.log(this.direcao);
  //Velocidade
  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;

  this.angle = this.angle + this.vang *dt;
  
  for (var i = 0; i < this.tiros.length; i++) {
	if(this.tiros[i].y < -10 || this.tiros[i].x > 410 || this.tiros[i].x < - 10){
		this.tiros.splice(i,1);
	}else{
		this.tiros[i].mover(dt);
	}
  }
  
  if(this.x <= 0 || this.x + this.width >= 400 ||
     this.y <= 0 || this.y + this.height >=400){
	
	if(this.x <= 0){this.x = 1}
	if(this.x + this.width >= 400) {this.x = 400 - this.width - 1}
	if(this.y <= 0){this.y = 1}
	if(this.y + this.height >=400){this.y = 400 - this.height - 1}
	
	this.vx = 0;
	this.vy = 0;
	this.ax = 0;
	this.ay = 0;
  }
  
}

//Colisão retangular
Sprite.prototype.colodiuCom = function(alvo){
  if(this.x + this.width < alvo.x)return false;
  if(this.x > alvo.x + this.width)return false;
  if(this.y + this.height < alvo.y)return false;
  if(this.y > alvo.y + this.height)return false;
  return true;
}

//Colisão retangular
Sprite.prototype.colodiuComTiro = function(alvo){
  if(this.x + this.width < alvo.x)return false;
  if(this.x > alvo.x + alvo.width)return false;
  if(this.y + this.height < alvo.y)return false;
  if(this.y > alvo.y + alvo.height)return false;
  return true;
}

Sprite.prototype.atirar = function (clickX, clickY){
	var tiro = new SpriteTiro();
	if(this.direcao == "topo"){
		tiro.x = this.x + (this.width/2) - 2;
		tiro.y = this.y - 3;
		tiro.vy = 150;
		tiro.vx = 0;
	}else if(this.direcao == "direita"){
		tiro.x = this.x + this.width + 2;
		tiro.y = this.y + (this.height/2) - 2;
		tiro.vx = 150;
		tiro.vy = 0;
	}else if(this.direcao == "baixo"){
		tiro.x = this.x + (this.width/2) - 2;
		tiro.y = this.y + this.height - 1;
		tiro.vy = -150;
		tiro.vx = 0;
	}else if(this.direcao == "esquerda"){
		tiro.x = this.x - 4;
		tiro.y = this.y + (this.height/2) - 2;
		tiro.vx = -150;
		tiro.vy = 0;
	}
	
	this.tiros.push(tiro);
}

Sprite.prototype.colidiuComOponente = function (alvo, resolveColisao){
	for (var j = 0; j < alvo.length; j++) {
		if(this.testaColodiuComOponente(alvo[j])){
			//console.log("ok")
			resolveColisao(this, alvo[j]);
		}
	}
};

//Colisão retangular
Sprite.prototype.testaColodiuComOponente = function(alvo){
  //if((this.x-5) + (this.width-10) < alvo.x)return false;
  //if((this.x-15) > alvo.x + alvo.width)return false;
  if(this.x + this.width < alvo.x)return false;
  if(this.x > alvo.x + alvo.width)return false;
  if(this.y + this.height < alvo.y)return false;
  if(this.y > alvo.y + alvo.height)return false;  
  return true;
};


//Colisão retangular
Sprite.prototype.testaColodiuComOponenteBarreira = function(alvo){
  //if((this.x-5) + (this.width-10) < alvo.x)return false;
  //if((this.x-15) > alvo.x + alvo.width)return false;
  if(this.x + this.width < alvo.x)return false;
  if(this.x > alvo.x + alvo.width)return false;
  if(this.y + this.height < alvo.y)return false;
  if(this.y > alvo.y + alvo.height)return false;
  
  if(this.x + this.width >= alvo.x && this.x <= alvo.x + alvo.width && 
     this.y + this.height >= alvo.y && this.y <= alvo.y + alvo.height){
	  
	if(this.x + this.width < alvo.x + 5){
		this.x = alvo.x - this.width - 1;
	}
	if(this.x > (alvo.x + alvo.width) - 5){
		this.x = alvo.x + alvo.width + 1;
	}
	if(this.y + this.height < alvo.y + 5){
		this.y = alvo.y - this.height - 1;
	}
	if(this.y > (alvo.y + alvo.height) - 5){
		this.y = alvo.y + alvo.height + 1;
	}
	
	this.vx = 0;
	this.vy = 0;
	this.ax = 0;
	this.ay = 0;
  }
  
  return true;
}