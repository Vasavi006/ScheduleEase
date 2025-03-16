var mongoClient=require("mongodb").MongoClient;

mongoClient.connect("mongodb://127.0.0.1:27017").then(clientObject=>{
    var database=clientObject.db("northwind"); 
    database.collection("categories").find({}).toArray().then(documents=>{
     console.log(documents);
    })
    
})  