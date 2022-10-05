import React from 'react'
import '../App.css';
import {Form,Button} from 'react-bootstrap';
import axios from 'axios'
import { useEffect, useState } from 'react';


const Home=()=>{
const [newItem,setNewItem]=useState();
    const [item,setItem]=useState({
        "items":"",
    });
const [view,setView]=useState([]);

useEffect(()=>{
    axios.get("https://my-json-server.typicode.com/nit00/todo/db")
    .then((response)=>{
    setView(response.data);
    }).catch(err=>{
     console.log(err)
    }) 
})
      
const handleDelete=(id)=>{
    axios.delete("http://localhost:4000/items/"+id)
    .then(res=>{
        console.log(res)
    })
}
    const handleChange=(event)=>{
    
setItem({...item,"items":event.target.value})
    }
    const handlesubmit=(event)=>{
        event.preventDefault();
        axios.post("https://my-json-server.typicode.com/nit00/todo/db",item)
        .then(response=>{
            console.log(response.data)
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
<>
<div className="container">
    
        <Form onSubmit={handlesubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Item To Add</Form.Label>
        <Form.Control value={newItem}  name="items" onChange={handleChange} type="text" placeholder="Add your item" />
      </Form.Group>
      <Button type='submit'>Add</Button>
      </Form>
     {view.map((el)=>{
        return(
            <>
            <ul>
                <li>{el.items}</li>
                <button onClick={()=>{handleDelete(el.id);}}>Delete</button>
            </ul>
             
            </>
        )
       
     })}
</div>
</>
    );
}

export default Home;