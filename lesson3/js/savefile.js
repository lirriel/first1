

document.getElementById("but1").onclick = writeTestFile();

function writeTestFile(){
	 console.log("Button clicked"); // displays file name
	
	 var documentsDir;
	 var dir = tizen.filesystem;
	 
	 function onsuccess(files) {
	   for(var i = 0; i < files.length; i++) {
	     console.log("File Name is " + files[i].name); // displays file name
	   }

	   var testFile = documentsDir.createFile("test3.txt");
	   if (testFile != null) {
	     testFile.openStream(
	         "w",
	         function(fs){
	           fs.write("HelloWorld");
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
				