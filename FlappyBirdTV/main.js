function drawCanvas() {

    var circle_canvas = document.getElementById("canvas");

    var context = circle_canvas.getContext("2d");

    var img1 = new Image();

    img1.src = "images/back1.jpg";

    var img = new Image();

    img.src = "images/superman.png";


    img1.onload = function() {

        context.drawImage(img1, 0, 0);

        img.onload = function() {

            context.drawImage(img, 145, 145);

        };
    };


    
}