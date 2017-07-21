/*
 *      Copyright (c) 2016 Samsung Electronics Co., Ltd
 *
 *      Licensed under the Flora License, Version 1.1 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *              http://floralicense.org/license/
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 */

/*global tau */
/*jshint unused: vars*/

(function() {
    /**
    * Event handler for tizenhwkey
    * Terminates the 'alarm' application when the tizenhwkey event triggered and triggered key was a back key.
    * @param {Object} event - tizenhwkey event object
    */
    function keyEventHandler(event) {
        if (event.keyName === "back") {
            var page = document.getElementsByClassName('ui-page-active')[0],
                pageid;

            pageid = page ? page.id : "";

            if (pageid === "main-page") {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (ignore) {}
            } else {
                tau.changePage("#main-page");
            }
        }
    }

    /**
    * Click event handler for 'add-alarm-button'
    * Change as 'alarm-set-page' when the 'add-alarm-button' is clicked.
     */
    function clickAddAlarmButtonHandler() {
        tau.changePage("#alarm-set-page");
        var pickTime = document.getElementById('set_time1');
        pickTime.click();
        
        pickTime.addEventListener("change", function(){
        	   var tp = document.getElementById('set-time');
        	   tp.innerHTML = pickTime.value;
        });
    }

    /**
    * Click event handler for 'repeat' button in alarm-set-page
    * State for alarm on / off is toggled when 'repeat' button is clicked.
    * @param {Object} event - click event object
    */
    function toggleRepeatButtonHandler(event) {
        if (event.target.getAttribute("data-status") === "0") {
            event.target.setAttribute("data-status", "1");
            event.target.style.backgroundColor = "rgba(18,180,255,100)";
            event.target.style.backgroundImage = "none";
        } else {
            event.target.setAttribute("data-status", "0");
            event.target.style.backgroundColor="transparent";
            event.target.style.backgroundImage = "url('./image/alarm_repeat_bg.png')";
        }
    }
    
  
    /**
    * Initiate function for binding event listener
    * If you execute 'alarm' application, this function will be called at first.
     */
    function init() {
        var addAlarmButton = document.querySelector("#add-alarm-button"),
            i,
            repeatToggle;

        window.addEventListener("tizenhwkey", keyEventHandler);

        addAlarmButton.addEventListener("click", clickAddAlarmButtonHandler);

        
        // Bind event for toggling repeat button in 'alarm-set-page'
        // There are 7 toggle buttons for Monday, Tuesday, Wednesday,Thursday, Friday, and Saturday.
        for (i = 1; i <= 7 ; i++) {
            repeatToggle = document.querySelector("#repeat" + i);
            repeatToggle.addEventListener("click", toggleRepeatButtonHandler);
        }
    }

    // When page will be loaded, call 'init' function
    window.onload = init();
}());
