/** @type {HTMLCanvasElement} */ 
const canvas = document.querySelector('#canvas1')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particleArray = [];

const mouse = {
  x:null,
  y : null,
  radius :150
}

window.addEventListener('mousemove',(e)=>{
  mouse.x = e.x
  mouse.y = e.y
  mouse.radius = 150
})

// window.addEventListener('resize', (e)=>{
//   canvas.width = window.width
//   canvas.height = window.height
// })

ctx.fillStyle = 'white'
ctx.font = '30px Verdana'
ctx.fillText('Salut', 0 , 30)
const textCoordinates = ctx.getImageData(0,0,100,100)

class Particule{

  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = (Math.random() * 20) + 5
  } 
  draw(){
    ctx.fillStyle = 'white';
    ctx.beginPath()
    ctx.arc(this.x,this.y,this.size,0, Math.PI *2)
    ctx.closePath()
    ctx.fill()
  }
  update(){
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y
    let distance = Math.sqrt(dx * dx + dy * dy) // hypotenus
    let forceDirectionX = dx / distance
    let forceDirectionY = dy / distance
    let maxDistance = mouse.radius
    let force = (maxDistance - distance) / maxDistance
    let directionX = forceDirectionX * force * this.density
    let directionY = forceDirectionY * force * this.density
    if(distance < mouse.radius){   //rayon d'action de la souris
      this.x -= directionX
      this.y -= directionY
    }else{
      if(this.x !== this.baseX){
        let dx = this.x - this.baseX
        this.x -= dx / 5
      }
      if(this.y !== this.baseY){
        let dy = this.y - this.baseY
        this.y -= dy / 5
      }
    }
  }
}

function init(){
  particleArray = [];
  console.log(textCoordinates)
  for ( let y = 0 ,  y2 = textCoordinates.height ; y < y2 ; y++){
    for(let x = 0 , x2 = textCoordinates.width ; x < x2 ; x++){
      if(textCoordinates.data[(y * 4 * textCoordinates.width) + ( x * 4) + 3] > 128){
        let positionX = x;
        let positionY = y;
        particleArray.push(new Particule(positionX * 10 + 100, positionY * 10 + 100))
      }
    }
  }
}

init()

console.log(particleArray)

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height)
  for(let i = 0 ; i < particleArray.length ; i++){
    particleArray[i].draw();
    particleArray[i].update();
  }
  connectParticle()
  requestAnimationFrame(animate);
}
animate();

function connectParticle(){
  let opacityValue = 1
  for(let a = 0 ; a < particleArray.length ; a++){
    for(let b = a ; b < particleArray.length ; b++){
      let dx = particleArray[a].x - particleArray[b].x
      let dy = particleArray[a].y - particleArray[b].y
      let distance = Math.sqrt(dx * dx + dy * dy)
      
      if(distance < 30){
        opacityValue = 1 - (distance/30)
        ctx.strokeStyle = `rgba(255,255,255,${opacityValue})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(particleArray[a].x , particleArray[a].y)
        ctx.lineTo(particleArray[b].x , particleArray[b].y)
        ctx.stroke()
      }
      
    }
  }
}