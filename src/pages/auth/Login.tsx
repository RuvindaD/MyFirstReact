import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const{ login }=useAuth();
    const navigate=useNavigate()

    const[username, setUsername]=useState<string>("");
    const[password, setPassword]=useState<string>("");
    const[error, setError]=useState<string>("");


    async function submit(event:any){
        event.preventDefault();//disable default form submission

        if (username=== "" || password=== "") {
            //validate user inputs
            setError("Username and password are required");
        }

        const data ={
            username:username,
            password:password
        }

       
        try {
            const response=await axios.post("http://localhost:8081/auth/login",data);
            login(response.data);
            navigate("/");

           // console.log(response);
        } catch (error) {
           setError("There was an error login") 
        }
    }
    return(
        <div className="p-10">
         <div className="max-w-[600px] p-5 shadow rounded-lg mx-auto">
            <div className="text-center">
                <h1 className="text-2xl font-semibold">Login</h1>
                </div>
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label className="block mb-1">Username</label>
                        <input type="text" onChange={function(event){setUsername(event.target.value);
                        setError("");

                        }} className="block w-full p-2 border border-gray-200-rounded-lg" placeholder="Enter your username"/>

                    </div>
                    <div className="mb-8">
                        <label className="block mb-1">Password</label>
                        <input type="password" onChange={function(event){setPassword(event.target.value);
                        setError("");

                        }} className="block w-full p-2 border border-gray-200 rounded-lg" placeholder="Enter your password"/>

                    </div>
                    {error && <div className="text-sm text-red-500">{error}
                    </div>}
                    <div>
                    < button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full hover:bg gray-950">Login
                    </button>
                        </div>
                      </form>
                </div>
            </div>   
           
    )
    
}

export default Login;