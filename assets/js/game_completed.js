var game= new Phaser.Game(800, 600, Phaser.AUTO, '', {preload:preload, create:create, update:update});

var red, blue, ball,p1,p2;
var goals, goal, goal2;
var scoreP1=0, scoreP2=0;
var scoreText, scoreText2;

function preload(){
    game.load.image('red', 'assets/images/red_paddle.png');
    game.load.image('blue', 'assets/images/blue_paddle.png');
    game.load.image('ball', 'assets/images/ball.png');
    game.load.image('goal', 'assets/images/goal.png');
    game.load.image('sky', 'assets/images/sky.png');
}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
      
   
    game.add.sprite(0,0,'sky');
    
    goals= game.add.group();
    goals.enableBody= true;
    
    goal= goals.create(-35,0,'goal');
    goal.enableBody= true;
    goal.body.immovable= true;
    
    goal2= goals.create(790,0,'goal');
    goal2.enableBody= true;
    goal2.body.immovable= true;
    
    game.physics.enable(goal, Phaser.Physics.ARCADE);
    game.physics.enable(goal2, Phaser.Physics.ARCADE);
    
    //draw vector bitmap
   /* p1= game.add.bitmapData(28,104);
    p1.ctx.beginPath();
    p1.ctx.rect(0,0,28,104);
    p1.ctx.fillStyle="#ff0000";
    p1.ctx.fill();
    
    p2= game.add.bitmapData(28,104);
    p2.ctx.beginPath();
    p2.ctx.rect(0,0,28,104);
    p2.ctx.fillStyle="#0000ff";
    p2.ctx.fill();*/
    
    red=game.add.sprite(game.world.centerX-300, game.world.centerY,'red');
    game.physics.enable(red, Phaser.Physics.ARCADE);
    red.enableBody= true;
    red.body.immovable= true;
    red.body.collideWorldBounds= true;
    red.anchor.setTo(0.5,0.5);
    red.inputEnabled= true;
    red.input.enableDrag(true);
    
    blue= game.add.sprite(game.world.centerX+300, game.world.centerY, 'blue');
    game.physics.enable(blue, Phaser.Physics.ARCADE);
    blue.enableBody= true;
    blue.body.immovable= true;
    blue.body.collideWorldBounds= true;
    blue.anchor.setTo(0.5,0.5);
    blue.inputEnabled= true;
    blue.input.enableDrag(true);
    
    ball= game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.enableBody= true;
    
    ball.body.collideWorldBounds= true;
    ball.body.velocity.setTo(300);
    ball.body.bounce.set(1);
    
    scoreText = game.add.text(0, 0, 'Player 1'+ ": 0", {font: "bold 32px Arial", fill: "#fff"});
    scoreText2= game.add.text(600,0, 'Player 2'+ ": 0", {font: "bold 32px Arial", fill: "#fff"});
   
    cursors = game.input.keyboard.createCursorKeys();
    
    leftKey= game.input.keyboard.addKey(Phaser.Keyboard.A);
	rightKey= game.input.keyboard.addKey(Phaser.Keyboard.D);
	upKey= game.input.keyboard.addKey(Phaser.Keyboard.W);
	downKey= game.input.keyboard.addKey(Phaser.Keyboard.S);
}

function update(){
    game.physics.arcade.collide(blue,ball);
    game.physics.arcade.collide(red,ball);
    game.physics.arcade.collide(ball,goal, scoringP2);
    game.physics.arcade.collide(ball, goal2, scoringP1);
    
    if (cursors.left.isDown)
    {
        blue.body.velocity.x = -450;
    } else if(cursors.right.isDown){
        blue.body.velocity.x= 450;
    } else {
        blue.body.velocity.x=0;
    }
    if (cursors.up.isDown){
        blue.body.velocity.y= -450;
    }
    else if(cursors.down.isDown){
        blue.body.velocity.y=450;
    } else{
        blue.body.velocity.y=0;
    }
    
    if (leftKey.isDown)
    {
        red.body.velocity.x = -450;
    } else if(rightKey.isDown){
        red.body.velocity.x= 450;
    } else {
        red.body.velocity.x=0;
    }
    if (upKey.isDown){
        red.body.velocity.y= -450;
    }
    else if(downKey.isDown){
        red.body.velocity.y=450;
    } else{
        red.body.velocity.y=0;
    }
}
function scoringP1(){
    scoreP1+=1;
    scoreText.text= 'Player 1' + ': '+ scoreP1;
   
}
function scoringP2(){
    scoreP2+=1;
    scoreText2.text= 'Player 2' + ": "+ scoreP2;
}