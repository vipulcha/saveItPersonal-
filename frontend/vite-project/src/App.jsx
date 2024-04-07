import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
 const [inputvalue,setInputvalue] = useState("");
 const fetchPosts = async () => {
  try{
    const response = await axios.get("http://localhost:5000/getPosts");

    setData(response.data);
  } catch(error) {
    console.log(error);
  }
}
  useEffect(()=>{
    fetchPosts();
  },[]);
  
  data.map((post) => {
    console.log(post);
  })


  const handleDataChange = (e) => {
    setInputvalue(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {data:inputvalue};

    try{
      await axios.post("http://localhost:5000/addPosts",newData);
      setInputvalue(""); 
      const response = await axios.get("http://localhost:5000/getPosts");
      setData(response.data);
      
    } catch(error) {
      console.log(error);
    }
  }

  const handleDelete = async (id) => {
    try{
      await axios.delete(`http://localhost:5000/deletePosts/${id}`);
      fetchPosts();
    } catch(error){
      console.log("Error in deletion!")
    }
  }


  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        Add mamla:
        <input type="text" value = {inputvalue} onChange= {handleDataChange}/>
      </label>
      <button type="Submit">Submit</button>
    </form>
    <div>
    {data.map((post)=>{
      return (
        <div key = {post._id}>
        <span>{post.data}</span>
        <button onClick={()=>handleDelete(post._id)}>DELETE</button>
        </div>
        )
    })}
    </div>
    </>
  )
}

export default App
