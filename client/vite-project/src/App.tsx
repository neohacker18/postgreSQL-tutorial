import { useState, useEffect } from "react";
import axios from "axios";
import {BsPencilSquare} from 'react-icons/bs'
const localData = [
  {
    todo_id: 2,
    description: "aryan",
    tag: "homework",
  },
  {
    todo_id: 11,
    description: "fafa",
    tag: "afsa",
  },
  {
    todo_id: 12,
    description: "hello ",
    tag: "world",
  },
];

function App() {
  const [description, setDescription] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [updateClicked, setUpdateClicked] = useState<boolean>(false);
  const [todoData, setTodoData] = useState([]);
  const [id, setId] = useState<number|null>(null);
  const handleAddTodo = async (): Promise<string> => {
    try {
      setIsDisabled(true);
      const { data } = await axios.post("https://postgresql-tutorial-backend1.onrender.com/addTodo", {
        description: description,
        tag: tag,
      });
      setMessage("Item added successfully!");
      setTimeout(() => {
        setMessage(null);
        setIsDisabled(false);
        setDescription("");
        setTag("");
      }, 4000);
      return "Success";
    } catch (error) {
      setMessage("Some error occurred! Try again later!");
      setTimeout(() => {
        setMessage(null);
        setIsDisabled(false);
      }, 3000);
      return `Error faced` + error;
    }
  };
  useEffect(() => {
    if (description.length && tag.length) setIsDisabled(false);
  }, [description, tag]);
  const handleAllTodos = async (): Promise<string> => {
    const { data } = await axios.get("https://postgresql-tutorial-backend1.onrender.com/getAllTodos");
    setTodoData(await data.data);
    // console.log(await data)
    // console.log(localData[0])
    return "";
  };
  useEffect(() => {
    handleAllTodos();
  }, [message]);
  const handleDeleteTodo = async (id): Promise<string> => {
    const { data } = await axios.delete(
      `https://postgresql-tutorial-backend1.onrender.com/deleteTodo/${id}`
    );
    handleAllTodos();
    return "";
  };
  const handleUpdateTodo = (element): string => {
    setDescription(element.description)
    setTag(element.tag)
    setId(element.todo_id)
    setUpdateClicked(true)
    return "";
  };
  const handleCallUpdate=async()=>{
    await axios.put("https://postgresql-tutorial-backend1.onrender.com/updateTodo",{
      description:description,
      tag:tag,
      id:id,
    })
    handleAllTodos()
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Todo List</h1>
        <label htmlFor="">Description</label>
        <textarea
          name=""
          id=""
          cols={30}
          rows={10}
          style={{ height: 50, width: 500 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label htmlFor="">Tag</label>
        <textarea
          name=""
          id=""
          cols={30}
          rows={10}
          style={{ height: 30, width: 200 }}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        ></textarea>
        {!updateClicked && <button
          style={{ marginTop: 10 }}
          disabled={isDisabled || !description.length || !tag.length}
          onClick={() => handleAddTodo()}
        >
          Add Item to list
        </button>}
        {message}
        {updateClicked && <button style={{marginTop:10}} onClick={()=>handleCallUpdate()}>Update data</button>}
        {updateClicked && <button style={{marginTop:10}} onClick={()=>{
          setUpdateClicked(false)
          setDescription("")
          setTag("")
        }}>Cancel</button>}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {todoData.map((element) => (
            <div key={element.todo_id} style={{ border: "1px solid black", padding: "20px" }}>
              <button
                onClick={() => {
                  let id = element.todo_id;
                  handleDeleteTodo(id);
                }}
                >
                -
              </button>
              <h5>Id: {element.todo_id}</h5>
              <h5>Description: {element.description}</h5>
              <h5>Tag: {element.tag}</h5>
              <BsPencilSquare style={{cursor:'pointer'}} onClick={()=>{
                let id = element.todo_id;
                handleUpdateTodo(element);
              }}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
