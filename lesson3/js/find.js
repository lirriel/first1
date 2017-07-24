var baseName 	  = "WebBase";
var storeName 	  = "WebBaseStore";

var search = document.getElementById("searchBut");
search.onclick = findInfo;

function findInfo() {

	console.log("start search");
	
	var db = openDatabase(baseName, '1.0', 'Test DB', 2 * 1024 * 1024);
	var text = document.getElementById("search1").value;
	
	console.log(text);
	
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM " + storeName + " WHERE description LIKE '%" + text + "%'", [], function(tx, result) {
			console.log("row count: " + result.rows);
			for(var i = 0; i < result.rows.length; i++) {
				console.log('<b>' + result.rows.item(i)['title'] + '</b><br />');
				
				$("#rssContent1").append('<div class="feed"><div class="image"><img src=' + result.rows.item(i)['image'] + '><div class="title"> Title:' + result.rows.item(i)['title'] 
		        		+ '</div><br><div class="putDate">Date: ' + result.rows.item(i)['pubDate']
		        		+ '</div><br><div class="description">Desc: ' + result.rows.item(i)['description'] + '</div></div>');
			}
		}, function(transaction, err){
			console.log("Error: " + err.message);
		}
		)
		}
	); 
	
}