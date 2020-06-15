var myGamePiece=[];
var myObstacles = [];var myPrey=[];let moverighta=false;let movelefta=false;
let moveupa=false;let movedowna=false;let ateprey=false;let score=0;let preyx; let preyy;let noleftreverse=true;
let norightreverse=true;let noupreverse=true;let nodownreverse=true;let ateitself=false;let hitcanvas=false;
let thereiscrash=false;let gametheme;let ate;let gameover;


function startGame() 
{
    myGamePiece.push(new component(10, 10, "green", 40, 120));
	myGamePiece.push(new component(10, 10, "green", 30, 120));
    myGamePiece.push(new component(10, 10, "green", 20, 120));
	myGamePiece.push(new component(10, 10, "green", 10, 120,));
	myPrey.push(new component(10,10,"black",180,160,0,0));
	gametheme=new sound("gametheme.mp3");
	ate=new sound("ate.mp3");
	gameover=new sound("gameover.mp3");
	
	document.getElementById("btn1").innerHTML="";
	gametheme.play()
	myGameArea.start();


	
}

var myGameArea = {
    canvas : document.createElement("canvas"),
 start : function() {
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[-2]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 100);
		window.addEventListener('keydown', function (e) {
      myGameArea.keys = (myGameArea.keys || []);
      myGameArea.keys[e.keyCode] = true;
    })
       window.addEventListener('keyup', function (e) {
      myGameArea.keys[e.keyCode] = false;
    })},
    
 clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);},
    
 stop : function() {
        clearInterval(this.interval);}
}


function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    
	this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
		ctx.strokeStyle="black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.strokeRect(this.x,this.y,this.width,this.height);}
    
	this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;}    
    
	this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        
		var crash = true;
        
		if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) 
		{crash = false;}
        return crash;}
}



function updateGameArea() {
    
	var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    
	 for (i = 0; i < myObstacles.length; i += 1) {for (j = 0; j < myGamePiece.length; j += 1)
	 {if (myGamePiece[j].crashWith(myObstacles[i])) {thereiscrash=true;}}}
    
	myGameArea.clear();
	
	recreateprey();moveright();moveleft();moveup();movedown();noreversing();hitcanvasif();atesnake();endgame();
	
	preyx=randomnumber(10,590);preyy=randomnumber(10,390);
		
if(myGameArea.keys && myGameArea.keys[37]&&noleftreverse) 
{movelefta=true;moverighta=false;moveupa=false;movedowna=false;noupreverse=true;nodownreverse=true; }

if(myGameArea.keys && myGameArea.keys[39]&&norightreverse) 
{movelefta=false;moverighta=true;moveupa=false;movedowna=false;noupreverse=true;nodownreverse=true;  }

if(myGameArea.keys && myGameArea.keys[38]&&noupreverse) 
{movelefta=false;moverighta=false;moveupa=true;movedowna=false;noleftreverse=true;norightreverse=true;}

if(myGameArea.keys && myGameArea.keys[40]&&nodownreverse) 
{movedowna=true;moverighta=false;moveupa=false;movelefta=false;noleftreverse=true;norightreverse=true;};
   
   myGameArea.frameNo += 1;
   

   if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width-30;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(30, height, "gray", x, 10));
        myObstacles.push(new component(30, x - height - gap, "gray", x, height + gap));
    }
    
	for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update(); }
	
	
	for (i = 0; i < myGamePiece.length; i += 1){
    myGamePiece[i].newPos();    
    myGamePiece[i].update();}
	
	for (i = 0; i < myPrey.length; i += 1){
    myPrey[i].newPos();    
    myPrey[i].update();}
	
	function move(){myGamePiece.unshift(new component(10, 10, "red", myGamePiece[0].x+10, myGamePiece[0].y));
	myGamePiece.pop();}
	
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}





 function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;}
	

function moveup() {if(moveupa&&!ateprey){
	myGamePiece.unshift(new component(10, 10, "green", myGamePiece[0].x, myGamePiece[0].y-10));
	myGamePiece.pop();   
};if(moveupa&&ateprey){myGamePiece.unshift(new component(10, 10, "green", myGamePiece[0].x, myGamePiece[0].y-10));};}



function movedown() {if(movedowna&&!ateprey){
	myGamePiece.unshift(new component(10, 10, "green", myGamePiece[0].x, myGamePiece[0].y+10));
	myGamePiece.pop();
};if(movedowna&&ateprey){myGamePiece.unshift(new component(10, 10, "green", myGamePiece[0].x, myGamePiece[0].y+10));};}



function moveleft() {if (movelefta&&!ateprey){
	myGamePiece.unshift(new component(10, 10, "green", myGamePiece[0].x-10, myGamePiece[0].y));
myGamePiece.pop();};if(movelefta&&ateprey){myGamePiece.unshift(new component(10, 10, "green", myGamePiece[0].x-10, myGamePiece[0].y));};}




function moveright() {if(moverighta&&!ateprey){
	myGamePiece.unshift(new component(10, 10, "green", myGamePiece[0].x+10, myGamePiece[0].y));
myGamePiece.pop();};if(moverighta&&ateprey){myGamePiece.unshift(new component(10, 10, "green", myGamePiece[0].x+10, myGamePiece[0].y));};}

function recreateprey(){if(myGamePiece[0].x===myPrey[0].x&&myGamePiece[0].y===myPrey[0].y)
{ateprey=true;gametheme.stop();gameover.play();gametheme.play();score+=10;document.getElementById("score1").innerHTML="score= "+score;
myPrey[0].x=preyx;myPrey[0].y=preyy;}
else{ateprey=false;}}


function randomnumber(min, max) {
      return Math.round((Math.random() * (max-min) + min) / 10) * 10;}

function noreversing(){if(moverighta){noleftreverse=false;};if(movelefta){norightreverse=false;};
if(moveupa){nodownreverse=false;};if(movedowna){noupreverse=false;};}


function hitcanvasif(){if(myGamePiece[0].x<0||myGamePiece[0].x>590||myGamePiece[0].y<0||myGamePiece[0].y>390)
	{hitcanvas=true;}}

function atesnake() {
      for (let i = 3; i < myGamePiece.length; i++) {
        if (myGamePiece[i].x === myGamePiece[0].x && myGamePiece[i].y === myGamePiece[0].y)
		{ateitself=true;}}}


function endgame(){if(hitcanvas||thereiscrash||ateitself){myGameArea.stop();gametheme.stop();ate.play();alert("Sorry! Game Over"+" "+"You Got "+score);
location.reload();}};
