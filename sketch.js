var ball;
var bg;
var xval=50;
var yval=50;
var bluegroup,greengroup,pinkgroup,purplegroup,yellowgroup,allgroup,shooter;
ballarr=[],mainarr=[];
//var dir = point_direction(x,y,mouse_x,mouse_y);

function preload ()
{
        //loading
        bg=loadImage("images/background.jpg");
        blueimg=loadImage("images/blueball.png");
        greenimg=loadImage("images/greenball.png");
        pinkimg=loadImage("images/pinkball.png");
        purpleimg=loadImage("images/purpleball.png");
        yellowimg=loadImage("images/yellowball.png");
}


function setup()
 {
        createCanvas(600,700);
        //creating groups
        bluegroup=new Group ();
        greengroup=new Group ();
        pinkgroup=new Group ();
        purplegroup=new Group ();
        yellowgroup=new Group ();
        allgroup=new Group();

         
        
        for(var r=0;r<5;r++)
        {
                for(var c=0;c<10;c++)
                {
                        ball=createSprite(xval,yval,50,50);
                        ballarr.push(ball);
                        var rand=Math.round(random(1,5));
                        allgroup.add(ball);
                        ball.colorNum=rand;
                        ballselect(ball,rand);
                        // switch(rand)
                        // {
                        //         case 1: bluegroup.add(ball);
                        //                 break;
                        //         case 2: greengroup.add(ball);
                        //                 break;
                        //         case 3: pinkgroup.add(ball);
                        //                 break;
                        //         case 4: purplegroup.add(ball);
                        //                 break;
                        //         case 5: yellowgroup.add(ball);
                        //                 break;
                                        
                        // }
                        xval=xval+55;
               }
                xval=50;
                yval=yval+55;
                mainarr.push(ballarr);
                ballarr=[];
        }

      
 }

function draw()
 {
        
        background(bg);  
        if(shooter==null)
        {
               // console.log("generating new");
                generateShooter()    
        }

        //making line
        push();
        stroke(255,550,0);
        strokeWeight(19);
        line(0,438,600,438);
        pop();
        
        fill("yellow");
        textSize(70);
        stroke(15);
        strokeWeight(10);
        //fontStyle("ALERGIAN")
        text("Bubble Shooter",75,600)

        if(mouseWentUp("leftButton"))
        {
                 angle=(180/Math.PI)*Math.atan2(mouseY-shooter.y, mouseX-shooter.x);
                 shooter.setSpeedAndDirection(10, angle);
        
        }
        //fill("black");
        if(allgroup.isTouching(shooter))
        {
                allgroup.add(shooter);
                for(var r=mainarr.length-1;r>=0;r--)
                {
                        ballarr=mainarr[r];

                        for (var c=0;c<ballarr.length;c++)
                        {
                                if((ballarr[c]!=null)&& (shooter.isTouching(ballarr[c])))
                                {
                                        shooter.setVelocity(0,0);
                                        shooter.y=ballarr[c].y+55;
                                        shooter.x=ballarr[c].x;
                                        if(r===mainarr.length-1)
                                        {
                                                newballarr=[];
                                                newballarr.legth=mainarr.length;
                                                newballarr[c]=shooter;
                                                mainarr.push(newballarr);
                                        }
                                        else
                                        {
                                                newballarr=mainarr[+1];
                                                newballarr[c]=shooter;
                                                mainarr[r+1]=newballarr;
                                        }

                                }
                        }
                }
                shooter=null;
                 
        }
//         if (frameCount%250===0){
//               allgroup.setVelocityYEach(3)
//       }else{
//               allgroup.setVelocityYEach(0)
      
//       }
        
         drawSprites();
    
}

function generateShooter(){
        shooter=createSprite(280,500,10,10);
        var randm=Math.round(random(1,5));
        ballselect(shooter,randm);
        shooter.debug=true;
        shooter.setCollider("circle",0,0,80);
}

function ballselect(ball,rand)
{
        switch(rand)
        {
          case 1: ball.addImage(blueimg);
                  ball.scale=0.15;
                  break;
          case 2: ball.addImage(greenimg);
                  ball.scale=0.3;
                  break;
          case 3: ball.addImage(pinkimg);
                  ball.scale=0.35;
                  break;
          case 4: ball.addImage(purpleimg);
                  ball.scale=0.3;
                  break;
          case 5: ball.addImage(yellowimg);
                  ball.scale=0.29;
                  break;
                  
        }       
}

// function checkColourRange(r,c,colourRange){
//       matchingBalls=[];  
// }