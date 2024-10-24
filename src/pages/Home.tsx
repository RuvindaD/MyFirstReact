import { useState } from "react";
import Vehicle from "../components/Vehicle";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home(){
    const [count, setCount] = useState(0)

    //react hooks
  
    const [username,setUsername]=useState<string>("");

    const{logout}=useAuth()
  
    function handleInputChange(event:any) {
      setUsername(event.target.value);
    }
  
    function increaseCount(){
      setCount(count+1);
    }
  
    return (
      <div>
      <h1>Hello {username}</h1>
      <p>Feel free to edit this build something awesome</p>

      <div className="w-full bg-gray-100 p-2 rounded-lg">
      <Link to="/profile" className="bg-gray-800 text-white px-5 py-2 me-3">Profile</Link>
      <Link to="/product" className="bg-gray-800 text-white px-5 py-2 me-3">Product</Link>
      <Link to="/category" className="bg-gray-800 text-white px-5 py-2 me-3">Category</Link>
      <Link to="/order" className="bg-gray-800 text-white px-5 py-2 me-3">Order</Link>
      <button className="bg-gray-800 text-white px-5 py-2 me-3" onClick={logout}>Logout</button>
      </div>
      
      <label>Enter username</label>
  
      <input type="text" onChange ={handleInputChange} />
  
      <h1>Count:{count}</h1> 
      <button onClick={increaseCount}>Increase</button>
      
      
      
      <h2>Vehicles</h2>
      <Vehicle title="Toyota Corolla" description="Toyota Corolla is the highest sold vehicle"/>
      <Vehicle title="Toyota Landcruiser" description="Toyota Landcruiser is a reliable 4 X 4"/>
    </div>
  )
}

export default Home