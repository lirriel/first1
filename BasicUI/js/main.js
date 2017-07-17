window.onload = function() {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });

//    // Sample code
//    var mainPage = document.querySelector('#main');
//
//    mainPage.addEventListener("click", function() {
//        var contentText = document.querySelector('#content-text');
//
//        contentText.innerHTML = (contentText.innerHTML === "Basic") ? "Tizen" : "Basic";
//    });
    document.getElementById('btn1').onclick = function() {
    	document.getElementById('img1').style.display = (document.getElementById('img1').style.display === 'inline') ? 'none' : 'inline';
    };
    
    document.getElementById('btn2').onclick = function() {
    	var contentText = document.querySelector('#content-text');
    	var w = window.innerWidth;
    	var h = window.innerHeight;
    	contentText.innerHTML = (contentText.innerHTML === w + " x " + h) ? "" : w + " x " + h;
    };
};