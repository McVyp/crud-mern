import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {

  const [item, setItem] = useState(
    {
      title:'',
      description:''
    }
  );

  const [items, setItems] = useState([{
    title:'',
    description:'',
    _id:'',
  }])

  const [isPut, setIsPut] = useState(false);

  const [updatedItem, setUpdatedItem] = useState({
    title:"",
    description:"",
    id:""
  })
  useEffect(()=>{
    fetch('/items').then((res) =>{
        if(res.ok) {
            return res.json();
        }
      })

      .then(jsonRes =>setItems(jsonRes))
      .catch(err => console.log(err));
  }, [items]);

  function handleChange(e){
    const {name, value}= e.target;
    setItem((prevInput) =>{
      return{
        ...prevInput,
        [name]: value,
      };
    });
    console.log(item);
  }
  function addItem(e){
    e.preventDefault();
    const newItem ={
      title: item.title,
      description: item.description,
    };
    axios.post('/newitem', newItem);
    console.log(newItem);
    alert('item added');

    setItem({
      title: "",
      description:"",
    });
  }
// delete

function deleteItem(id){
  axios.delete('/delete/' +id);
  alert('item deleted');
  console.log(`Deleted item ${id}`);
}

// update

function openUpdate(id){
  setIsPut(true);
  setUpdatedItem((prevInput) =>{
    return {
      ...prevInput,
      id:id,
    } 
  })
}
   

function updateItem(id) {
  axios.put('/put/' + id, updatedItem);
  alert('item updated');
  console.log(`Item ${id} updated`);
}

function handleUpdate(e){
  const {name, value} = e.target;
  setUpdatedItem((prevInput) =>{
    return {
      ...prevInput,
      [name]: value,
    }
  });
  console.log(updateItem);
}
  return (
    <div className="App">
      {!isPut ?
      (<div className="main">
        <input 
          onChange={handleChange}
          name="title" 
          placeholder='title'
          value={item.title} 
        />
        <input 
          value={item.description} 
          onChange={handleChange}
          name="description" 
          placeholder="description"
        />
        <button onClick={addItem}>Add Item</button>
        </div>):(
          <div className="main">
          <input 
            onChange={handleUpdate}
            name="title" 
            placeholder='title'
            value={updatedItem.title} 
          />
          <input 
            value={updatedItem.description} 
            onChange={handleUpdate}
            name="description" 
            placeholder="description"
          />
          <button onClick={()=> updateItem(updatedItem.id)}>Update</button>
          </div>
        )}
        {items.map((item) =>{
            return(
              <>
              <div key={item._id} style={{background: 'purple', width: '40%', margin:'auto auto'}}>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <button onClick={() => deleteItem(item._id)}>Delete</button>
                <button onClick={() => openUpdate(item._id)}>Update</button>
              </div>
              </>
              
            )
        })}
        
    </div>
  );
}

export default App;
