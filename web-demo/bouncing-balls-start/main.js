// 设置画布

const para = document.querySelector('p');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function randomColor(){
  const color ='rgb(' + random(0,255) + ',' +
          random(0,255) + ',' +
          random(0,255) + ')'; 
  return color;
}

class Shape {
  constructor(x, y, velX, velY, exists){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
  }
}

class Ball extends Shape {
  constructor(x, y, velX, velY,exists, color,size){
    super(x, y, velX, velY,exists);

    this.color = color;
    this.size = size;
  }


    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size,0,2*Math.PI);
      ctx.fill();
    };

    update() {
      if((this.x + this.size) >= width){
          this.velX = -(this.velX);
      }
    
      if((this.x - this.size) <= 0){
        this.velX = -(this.velX);
      }
    
      if((this.y + this.size) >= height){
          this.velY = -(this.velY);
      }
    
      if((this.y - this.size)  <= 0){
          this.velY = -(this.velY);
      }
    
      this.x += this.velX;
      this.y += this.velY;
    };

    collisinDetect() {
      for(let j = 0; j < balls.length; j++){
        if(this != balls[j]){
          const dx = this.x - balls[j].x;
          const dy = this.y - balls[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
    
          if(distance < this.size + balls[j].size&&balls[j].exists){
            balls[j].color  = this.color = randomColor();
          }
        }
      }
    };
  
}

class EvilCircle extends Shape{
  constructor(x, y,exists){
    super(x,y,exists);

    this.velX = 20;
    this.velY = 20;
    this.color = 'white';
    this.size = 10;
    this.setControls();
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size,0,2*Math.PI);
    ctx.stroke();
  };

  checkBounds() {
    if((this.x + this.size) >= width){
        this.x -= (this.size);
    }
  
    if((this.x - this.size) <= 0){
      this.x += (this.size);
    }
  
    if((this.y + this.size) >= height){
        this.y -= (this.size);
    }
  
    if((this.y - this.size)  <= 0){
        this.y += (this.size);
    }
  };

  setControls(){
    window.onkeydown = e => {
      switch(e.key){
        case 'a':
          this.x -= this.velX;
          break;
        case 'd':
          this.x += this.velX;
          break;
        case 'w':
          this.y -= this.velY;
          break;
        case 's':
          this.y += this.velY;
          break;
      };
    }
  }

  collisionDetect() {
    for(let j = 0; j < balls.length; j++){
      if(balls[j].exists){
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if(distance < this.size + balls[j].size){
          balls[j].exists  = false;
          this.size += 1.5;
          count--;
        }
      }
    }
  };

}


let evilCir = new EvilCircle(
  random(0 + 10, width - 10),
  random(0 + 10, height - 10),
  true
);



let balls = [];
let count = 25;
while (balls.length < 25){
   let size = random(10,20);
   let ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    true,
    randomColor(),
    size
   );
   balls.push(ball);
}

function loop(){
  ctx.fillStyle = 'rgb(0,0,0,7)';
  ctx.fillRect(0,0,width,height);

  for(let i = 0; i < balls.length; i++){
    if(balls[i].exists){
      balls[i].draw();
      balls[i].update();
      balls[i].collisinDetect();
      para.textContent = count;
    }
  }
  
  evilCir.draw();
  evilCir.checkBounds();
  evilCir.collisionDetect();
  requestAnimationFrame(loop);
}

loop();









// function Ball(x, y, velX, velY, color, size){
//   this.x = x;
//   this.y = y;
//   this.velX = velX;
//   this.velY = velY;
//   this.color = color;
//   this.size = size;
// }

// Ball.prototype.draw = function(){
//   ctx.beginPath();
//   ctx.fillStyle = this.color;
//   ctx.arc(this.x, this.y, this.size,0,2*Math.PI);
//   ctx.fill();
// }

// Ball.prototype.update = function(){
//   if((this.x + this.size) >= width){
//       this.velX = -(this.velX);
//   }

//   if((this.x - this.size) <= 0){
//     this.velX = -(this.velX);
//   }

//   if((this.y + this.size) >= height){
//       this.velY = -(this.velY);
//   }

//   if((this.y - this.size)  <= 0){
//       this.velY = -(this.velY);
//   }

//   this.x += this.velX;
//   this.y += this.velY;
// }

// Ball.prototype.collisinDetect = function(){
//   for(let j = 0; j < balls.length; j++){
//     if(this != balls[j]){
//       const dx = this.x - balls[j].x;
//       const dy = this.y - balls[j].y;
//       const distance = Math.sqrt(dx * dx + dy * dy);

//       if(distance < this.size + balls[j].size){
//         balls[j].color  = this.color ;//= randomColor();
//       }
//     }
//   }
// }

// let balls = [];

// while (balls.length < 25){
//    let size = random(10,20);
//    let ball = new Ball(

//     random(0 + size, width - size),
//     random(0 + size, height - size),
//     random(-7, 7),
//     random(-7, 7),
//     randomColor(),
//     size
//    );
//    balls.push(ball);
// }

// function loop(){
//   ctx.fillStyle = 'rgb(0,0,0,7)';
//   ctx.fillRect(0,0,width,height);

//   for(let i = 0; i < balls.length; i++){
//     balls[i].draw();
//     balls[i].update();
//     balls[i].collisinDetect();
//   }

//   requestAnimationFrame(loop);
// }

// loop();

