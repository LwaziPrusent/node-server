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
		response.json(docs);
	});
});

app.get("/contactList/:id",function(request,response)	{
	var id = request.params.id;
	db.contactlist.findOne({_id: mongojs.ObjectId(id)},function(error,doc){
		response.json(doc);
	});
});

app.post("/contactList",function(request,response)	{
	db.contactlist.insert(request.body,function(error,docs)	{
		response.json(docs);
	});
});

app.put("/contactList/:id",function(request,response)	{
	var id = request.params.id;
	var contact = request.body;
	delete contact._id;
	console.log(id);
	var query = {_id: mongojs.ObjectId(id)};
	var update = {$set: contact,new: true};
	db.contactlist.findAndModify(query,update,function(error,doc){
		console.log("here we are");
		if (!error && doc.ok)	{
			response.json(doc);
		}
		else	{
			error;
		}
		
	});
});	

app.delete("/contactList/:id",function(request,response)	{
	var id = request.params.id;
	db.contactlist.remove({_id: mongojs.ObjectId(id)},function(error,doc)	{
		response.json(doc);
	});
});

app.listen(3000);
console.log("Running my server");

[{name: "Emily", email: "emily@email.com", number: "(222) 222-2222" },{ name: "John", email: "john@email.com", number: "(333) 333-3333"}]