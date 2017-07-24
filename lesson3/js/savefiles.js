

document.getElementById("but2").onclick = writeTestFiles;
document.getElementById("but3").onclick = writeTestFiles2;
document.getElementById("but4").onclick = readFromFiles;

var wifiInfo="";

(function initApp() {
    'use strict';

    /**
     * Arrows rotation angle for 0 signal strength (in radians).
     *
     * @const {number}
     */
    var

    /**
     * Refresh Wi-Fi status interval (milliseconds)
     *
     * @const {number}
     */
        CHECK_WIFI_INTERVAL = 10000,

        /**
         * Wi-Fi network feature.
         *
         * @const {string}
         */
        WIFI_FEATURE = 'http://tizen.org/feature/network.wifi',

        /**
         * SystemInfo key for Wi-Fi Networks.
         *
         * @const {string}
         */
        SYSINFO_WIFI_KEY = 'WIFI_NETWORK',


        /**
         * Stores data from Tizen API.
         *
         * @type {object}
         */
        wifiData = {};





    /**
     * Returns capability for Wi-Fi Network.
     *
     * @returns {boolean}
     */
    function checkCapacity() {
        try {
            return tizen.systeminfo.getCapability(WIFI_FEATURE);
        } catch (e) {
            console.error('Exception', e.message);
            return false;
        }
    }

    /**
     * Compares provided data object with stored data object.
     * Calls GUI update if object data differs.
     *
     * @param {SystemInfoWifiNetwork} data
     */
    function compareData(data) {
        var changed = false;
        wifiInfo = "";
        Object.keys(data).forEach(function compare(key) {

        	wifiInfo += key + ": " + data[key] + "\n";

        });


    }

    /**
     * Error callback for getting Wi-Fi information.
     *
     * @param {Error} e Error object.
     */
    function onGetWifiInfoError(e) {
        console.warn('Wi-Fi information is temporarily unavailable.', e);
    }

    /**
     * Gets information about currently connected Wi-Fi network
     * and passes the data to comparing function.
     */
    function getWifiInfo() {
        try {
            tizen.systeminfo.getPropertyValue(SYSINFO_WIFI_KEY, compareData,
                onGetWifiInfoError);
        } catch (e) {
            console.error('Exception', e.message);
        }
    }



    /**
     * Initializes application.
     */
    function init() {


        if (checkCapacity()) {
            getWifiInfo();
            window.setInterval(getWifiInfo, CHECK_WIFI_INTERVAL);
        } else {
            window.alert('This device doesn\'t support Wi-Fi networks.');
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (e) {
                console.error('Exception', e.message);
            }
        }
    }

    init();

})();


function writeTestFiles(){
	 console.log("Button clicked"); // displays file name
	
	 var documentsDir;
	 var dir = tizen.filesystem;
	 
	 function onsuccess(files) {
	   for(var i = 0; i < files.length; i++) {
	     console.log("File Name is " + files[i].name); // displays file name
	   }

	   var testFile;
	   try {
		   testFile = documentsDir.createFile("Wifi_Info.txt");
	   } catch (e) {
		   var file = documentsDir.resolve("Wifi_Info.txt");
		   documentsDir.deleteFile(file.fullPath, null);
		   testFile = documentsDir.createFile("Wifi_Info.txt");
	   }
	 
	   if (testFile != null) {
	     testFile.openStream(
	         "w",
	         function(fs){
	           fs.write(wifiInfo);
	           fs.close();
	         }, function(e){
	           console.log("Error " + e.message);
	         }, "UTF-8"
	     );
	   }
	 

	 
	 function onerror(error) {
	   console.log("The error " + error.message + " occurred when listing the files in the selected folder");
	 }
	 

	 tizen.filesystem.resolve(
	     'documents',
	     function(dir){
	       documentsDir = dir; 
	       dir.listFiles(onsuccess,onerror);
	     }, function(e) {
	       console.log("Error" + e.message);
	     }, "rw"
	 );
}}

function writeTestFiles2(){
	 console.log("Button clicked"); // displays file name
	
	 var documentsDir;
	 var dir = tizen.filesystem;
	 
	 function onsuccess(files) {
	   for(var i = 0; i < files.length; i++) {
	     console.log("File Name is " + files[i].name); // displays file name
	   }
	   
	   var testFile;
	   try {
		   testFile = documentsDir.createFile("Name_Info.txt");
	   } catch (e) {
		   var file = documentsDir.resolve("Name_Info.txt");
		   documentsDir.deleteFile(file.fullPath, null);
		   testFile = documentsDir.createFile("Name_Info.txt");
	   }
	   
	   var textName = document.getElementById("input_name").value;
	   
	   if (testFile != null) {
	     testFile.openStream(
	         "w",
	         function(fs){
	           fs.write(textName);
	           fs.close();
	         }, function(e){
	           console.log("Error " + e.message);
	         }, "UTF-8"
	     );
	   }
	  
	 }

	 function onerror(error) {
	   console.log("The error " + error.message + " occurred when listing the files in the selected folder");
	 }
	 

	 tizen.filesystem.resolve(
	     'documents',
	     function(dir){
	       documentsDir = dir; 
	       dir.listFiles(onsuccess,onerror);
	     }, function(e) {
	       console.log("Error" + e.message);
	     }, "rw"
	 );
}

function readFromFiles() {
	var par = document.getElementById("fromFiles");
	
	tizen.filesystem.resolve("documents", function(dir) 
		    {
			  
				par.innerHTML = "";
		
		       file = dir.resolve("Name_Info.txt");
		       
		       file.openStream(
		    	    "r", 
				    function(fs) {
		                var text = fs.read(file.fileSize);
		                par.innerHTML += "<br>" + "Name_Info.txt : " + "<br>";
		                par.innerHTML += text + "<br>"; 
		                fs.close();
		                console.log(text);
		            }, function(e) {
		                console.log("Error " + e.message);
		            }, "UTF-8");
		       
		       file = dir.resolve("Wifi_Info.txt");
		       
		       file.openStream(
		    	    "r", 
				    function(fs) {
		                var text = fs.read(file.fileSize);
		                par.innerHTML += "<br>" + "Wifi_Info.txt : " + "<br>";
		                par.innerHTML += text; 
		                fs.close();
		                console.log(text);
		            }, function(e) {
		                console.log("Error " + e.message);
		            }, "UTF-8");
		    });
}

				