var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/test",function(request,response)	{
	response.json("test");
});

app.get("/contactList",function(request,response)	{
	db.contactlist.find(function(error,docs){
		console.log("error - " + error);
		response.json(docs);
	});
});

app.get("/contactList/:id",function(request,response)	{
	var id = request.params.id;
	db.contactlist.findOne({_id: mongojs.ObjectId(id)},function(error,doc){
		console.log("error - " + error);
		response.json(doc);
	});
});

app.post("/contactList",function(request,response)	{
	db.contactlist.insert(request.body,function(error,docs)	{
		console.log("error - " + error);
		response.json(docs);
	});
});

app.put("/contactList/:id",function(request,response)	{
	var id = request.params.id;
	var contact = request.body;
	console.log(id);
	var query = {_id: mongojs.ObjectId(id)};
	var update = {$set: updateObject(contact)};
	var queryAndUpdate = {query: query,update: update,new: true};
	db.contactlist.findAndModify(queryAndUpdate,function(error,doc){
		if (error)	{
			throw error;
		}
		else	{
			response.json(doc);
		}
		
	});
	
});	

app.delete("/contactList/:id",function(request,response)	{
	var id = request.params.id;
	db.contactlist.remove({_id: mongojs.ObjectId(id)},function(error,doc)	{
		console.log("error - " + error);
		response.json(doc);
	});
});

function updateObject(obj)	{
	delete obj._id
	return obj;
}

app.listen(3000);
console.log("Running my server");