const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;

const pool = require("./db");

app.use(cors());
app.use(express.json());

//ROUTES
//create a todo

app.post("/addTodo", async (req, res) => {
  try {
    const { description, tag } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description,tag) VALUES($1,$2)",
      [description, tag]
    );
    return res.status(200).json({ data:newTodo });
  } catch (err) {
    console.error(err.message);
  }
});
//get all todo
app.get("/getAllTodos", async (req, res) => {
  try {
    const todoList = await pool.query("SELECT * FROM todo");
    return res.status(200).json({ data: todoList.rows });
  } catch (error) {
    console.error(error.message);
  }
});
//get a todo
app.get("/getTodo/:id", async (req, res) => {
  try {
    const item = await pool.query("SELECT * FROM todo where todo_id=$1", [
      req.params.id,
    ]);
    return res.status(200).json({ todoItem: item.rows[0] });
  } catch (error) {
    console.error(error.message);
  }
});
//update a todo
app.put("/updateTodo", async (req, res) => {
  try {
    const { description, tag, id } = req.body;
    const updatedItem = await pool.query(
      "UPDATE todo SET description=$1,tag=$2 where todo_id=$3",
      [description, tag, id]
    );
    return res.status(200).json({ message:"Updated Successfully" });
  } catch (error) {
    console.error(error.message);
  }
});
//delete a todo
app.delete("/deleteTodo/:id",async (req,res)=>{
  try {
    const deletedItem=await pool.query("DELETE FROM todo where todo_id=$1",[req.params.id]);
    return res.status(200).json({ message:"Deleted Successfully!" });
  } catch (error) {
    console.error(error.message)
  }
})

app.get('/',(req,res)=>{
  return res.status(200).send(`<h4>API is in working condition</h4>`)
})

app.listen(PORT, () => {
  console.log(`server has started on port number ${PORT}`);
});
