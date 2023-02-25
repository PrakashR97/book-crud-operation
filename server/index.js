import express from "express"
import mysql from "mysql"
import cors from "cors"

const app=express()
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"ston$123",
    database:"test"

})


app.get("/",(req,res)=>
{
    res.json("hello this is the backend")
})


/*When a client sends a request to an Express server with a JSON payload in the request body, 
this middleware function parses the JSON data and stores it in the req.body object. 
This makes it easy for developers to access the data sent by the client in their server-side code.*/

app.use(express.json())

// cors() middleware function is used to enable CORS for all routes in the Express app. 
// This allows the client to make cross-origin requests to the server. 
// The app.get() method defines a route handler for the /api/data endpoint that sends some data to the client as a JSON response.
app.use(cors())


//create book

app.post("/books",(req,res)=>
{
const q="insert into books (`title`,`des`,`cover`,`price`) values (?)"
const values=[
    req.body.title,
    req.body.des,
    req.body.cover,
    req.body.price
]

db.query(q,[values],(err,data)=>
{
    if(err)
      return res.json(err)
    else
      return res.json("Book has been created")
})

})


// get book
app.get("/books",(req,res)=>
{
    const q="select * from books"
    db.query(q,(err,data)=>
    {
        if(err) 
          return res.json(err)
        else
          return res.json(data)
    })
})

//delete book
app.delete("/books/:id",(req,res)=>
{
   const bookId=req.params.id
   const q="delete from books where id=?"
   db.query(q,[bookId],(err,data)=>
   {
    if(err)
    return res.json(err)
    else
    return res.json("book has been deleted sucessfully")
   })

})




//update
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `des`= ?,`cover`= ? , `price`= ? WHERE id = ?"

  const values = [
    req.body.title,
    req.body.des,
    req.body.cover,
    req.body.price,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err)
    return res.json("data has been updated sucessfully")
  })
})



app.listen(8800,()=>
{
    console.log("connected to backend");
})