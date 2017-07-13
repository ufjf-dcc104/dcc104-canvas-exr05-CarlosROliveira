function Level(){
  this.barreiras = [];
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.color = "blue";
  this.atingido = false;
  this.inimigos = [];
}

Level.prototype.init = function(){
    this.inserebarreiras();
	//this.insereInimigos();
};


Level.prototype.insereInimigos = function() {
	var inimigos = this.inimigos;
	
	var insere = function(inimigo){
		inimigos.push(inimigo);
	}
	
    setInterval(function () {
        var inimigo = new SpriteInimigo();
		inimigo.y = -10;
		inimigo.x = Math.floor((Math.random() * 380) + 1)
		inimigo.vy = 50;
		insere(inimigo);
    }, 3000);
	
};

Level.prototype.inserebarreiras = function(){
	var barreira = new Level();
	barreira.x = 100;
	barreira.y = 2;
	barreira.width = 80;
	barreira.height = 30;
	barreira.atingido = false;
	this.barreiras.push(barreira);
	
	barreira = new Level();
	barreira.x = 100;
	barreira.y = 32;
	barreira.width = 30;
	barreira.height = 120;
	barreira.atingido = false;
	this.barreiras.push(barreira);
	
	barreira = new Level();
	barreira.x = 20;
	barreira.y = 278;
	barreira.width = 30;
	barreira.height = 120;
	barreira.atingido = false;
	this.barreiras.push(barreira);
	
	barreira = new Level();
	barreira.x = 250;
	barreira.y = 238;
	barreira.width = 30;
	barreira.height = 90;
	barreira.atingido = false;
	this.barreiras.push(barreira);
	
	barreira = new Level();
	barreira.x = 282;
	barreira.y = 298;
	barreira.width = 70;
	barreira.height = 30;
	barreira.atingido = false;
	this.barreiras.push(barreira);
	
	barreira = new Level();
	barreira.x = 190;
	barreira.y = 88;
	barreira.width = 90;
	barreira.height = 30;
	barreira.atingido = false;
	this.barreiras.push(barreira);
	
	barreira = new Level();
	barreira.x = 190;
	barreira.y = 140;
	barreira.width = 120;
	barreira.height = 30;
	barreira.atingido = false;
	this.barreiras.push(barreira);
	
	barreira = new Level();
	barreira.x = 100;
	barreira.y = 320;
	barreira.width = 90;
	barreira.height = 30;
	barreira.atingido = false;
	this.barreiras.push(barreira);
};


Level.prototype.desenhar = function (ctx){
  for (var i = 0; i < this.barreiras.length; i++) {
	ctx.fillStyle = this.barreiras[i].color;
	ctx.fillRect(this.barreiras[i].x, this.barreiras[i].y, this.barreiras[i].width, this.barreiras[i].height);
	ctx.strokeStyle = "black";
	ctx.strokeRect(this.barreiras[i].x, this.barreiras[i].y, this.barreiras[i].width, this.barreiras[i].height);
  }
  
  for (var i = 0; i < this.inimigos.length; i++) {
	this.inimigos[i].desenhar(ctx);
  }
  
};


Level.prototype.mover = function (dt){
	for (var i = 0; i < this.inimigos.length; i++) {
		if(this.inimigos[i].y > 430){
			this.inimigos.splice(i,1);
		}else{
			this.inimigos[i].mover(dt);
		}
	}
	
	
};

Level.prototype.colidiuComBarreiras = function (alvo, resolveColisao){
	for (var i = 0; i < this.inimigos.length; i++) {
		for (var j = 0; j < alvo.length; j++) {
			if(this.inimigos[i].colodiuComBarreira(alvo[j])){
				resolveColisao(this.inimigos[i], alvo[j]);
			}
		}
    }
};

Level.prototype.colidiuComAtirador = function (alvo, resolveColisao){
  for (var i = 0; i < this.barreiras.length; i++) {
    if(alvo.testaColodiuComOponenteBarreira(this.barreiras[i])){
      resolveColisao(this.barreiras[i], alvo);
    }
  }
};

/*
Level.prototype.perseguir = function (alvo, dt) {
  for (var i = 0; i < this.sprites.length; i++) {
    this.sprites[i].perseguir(alvo, dt);
  }
};*/

Level.prototype.colidiuComTiro = function (alvo, resolveColisao){
  for (var i = 0; i < this.barreiras.length; i++) {
	for(var j =0; j < alvo.length; j++){
		if(this.barreiras[i].testaColidiuComTiro(alvo[j])){
			resolveColisao(this.barreiras[i], j);
		}
	}
  }
};

//Colisão retangular
Level.prototype.testaColidiuComTiro = function(alvo){
  if(this.x + this.width < alvo.x)return false;
  if(this.x > alvo.x + alvo.width)return false;
  if(this.y + this.height < alvo.y)return false;
  if(this.y > alvo.y + alvo.height)return false;
  return true;
}