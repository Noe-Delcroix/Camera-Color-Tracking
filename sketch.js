var video
var w
var h
var c=[255,0,0]
var limit
const disp=5

function setup() {
  w=int((windowHeight-110)*3/2/disp)
  h=int((windowHeight-110)/disp)
  createCanvas(w*disp, h*disp);
  video=createCapture(VIDEO)
  video.size(w,h)
  video.hide()
  txt=createDiv("Click on the color you want to track and adjust the treshold :")
  Streshold=createSlider(1,250,50)
  Cbaw=createCheckbox("Black and white ?",true)
  Cpointer=createCheckbox("Show Pointer?",true)
  Cpixels=createCheckbox("Show Pixels ?",true)
  
}

function draw() {
  limit=int(Streshold.value())
  background(0);
  image(video,0,0,video.width*disp,video.height*disp)
  if (Cbaw.checked()){
    filter(GRAY)
  }
  video.loadPixels()
  let avgX=0
  let avgY=0
  let tot=0
  
  for (let y=0;y<h;y++){
    for (let x=0;x<w;x++){
      let index=(y*w+x)*4
      let r=video.pixels[index+0]
      let g=video.pixels[index+1]
      let b=video.pixels[index+2]
      if (dist(r,g,b,c[0],c[1],c[2])<limit){
        avgX+=x
        avgY+=y
        tot++
        noStroke()
        fill(c[0],c[1],c[2],200)
        if (Cpixels.checked()){
          rect(x*disp,y*disp,disp,disp)
        }
      }
    }
  }
  avgX/=tot
  avgY/=tot
  stroke(255)
  if (Cpointer.checked()){
    circle(avgX*disp,avgY*disp,20)
  }
}

function mousePressed(){
  if (mouseX>0 && mouseX<width && mouseY>0 && mouseY<height){
    let index=(int(mouseY/disp)*w+int(mouseX/disp))*4
    c[0]=video.pixels[index]
    c[1]=video.pixels[index+1]
    c[2]=video.pixels[index+2]
    print(c)
  }
  
}