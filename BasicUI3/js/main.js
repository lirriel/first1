window.onload = function() {
    // TODO:: Do your initialization job

	
    $(document).ready(function(){

	   $("#drag1").draggable({stack:"#drop1"});
	   $("#drop1").droppable({
	      over:function(){
	         $("#drag1").css("background-color","#d7fa99");
	         $("#drop1").css("background-color","#d7fa99");
	      },
	      drop:function(){
	         $("#drag1").css("background-color","#c234f5");
	         $("#drop1").css("background-color","#c4f66f");
	         $("#drop1").html("Перемещение завершено успешно.");
	         alert("Вы перетащили элемент с id=drag1 в область с id=drop1.");
	      }
	   });

	});
    
};

( function () {
    window.addEventListener( 'tizenhwkey', function( ev ) {
        if( ev.keyName === "back" ) {
            var activePopup = document.querySelector( '.ui-popup-active' ),
                page = document.getElementsByClassName( 'ui-page-active' )[0],
                pageid = page ? page.id : "";

            if( pageid === "one" && !activePopup ) {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (ignore) {
                }
            } else {
                window.history.back();
            }
        }
    } );
} () );

var sun = new Image();
var moon = new Image();
var earth = new Image();
function init() {
  sun.src = './images/Canvas_sun.png';
  moon.src = './images/Canvas_moon.png';
  earth.src = './images/Canvas_earth.png';
  window.requestAnimationFrame(draw);
}

function draw() {
  var ctx = document.getElementById('canvas3').getContext('2d');

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, 300, 300); // clear canvas

  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
  ctx.save();
  ctx.translate(150, 150);

  // Earth
  var time = new Date();
  ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
  ctx.translate(105, 0);
  ctx.fillRect(0, -12, 50, 24); // Shadow
  ctx.drawImage(earth, -12, -12);

  // Moon
  ctx.save();
  ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
  ctx.translate(0, 28.5);
  ctx.drawImage(moon, -3.5, -3.5);
  ctx.restore();

  ctx.restore();
  
  ctx.beginPath();
  ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
  ctx.stroke();
 
  ctx.drawImage(sun, 0, 0, 300, 300);

  window.requestAnimationFrame(draw);
}

init();