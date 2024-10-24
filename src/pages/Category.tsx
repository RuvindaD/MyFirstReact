import axios from "axios";
import { useEffect, useState } from "react";
import CategoryType from "../types/CategoryType";
import { useAuth } from "../context/AuthContext";

function Category(){

    const{isAuthenticated,jwtToken}= useAuth();

    const[categories, setCategories]=useState<CategoryType[]>([]);
    const[categoryName, setCategoryName]=useState<string>("");

    const config= {
        headers:{
            Autherization:`Bearer ${jwtToken}`
        }
    }
    
    async function loadCategories(){

        const response=await axios.get("http://localhost:8081/categories",config);//
        //console.log(response);// debugging
        setCategories(response.data);
    }

    useEffect(function(){
        if (isAuthenticated) {
           
            loadCategories();//function that will be triggered at the side effect
        }   

    },[isAuthenticated] )//dependancy array,it wil be triggered only once

       function handleCategoryName(event:any){
        
           setCategoryName(event.target.value);
            
       }

       async function handleSubmit(){
        const data={
            name:categoryName
        }
            const response=await axios.post("http://localhost:8081/categories",data,config);
            console.log(response);
            loadCategories();

       }

         //   async function handleSubmit(){
              //  const data={
               //     name:categoryName
           // }

               // const response=await axios.post("http://localhost:8081/categories",data);
               // console.log(response);
               // loadCategories();
          //  }

        
   // }
    return(
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-bold mb-5 text-slate-900">Categories</h1>
            <button onClick={loadCategories}>Load Categories</button>
            {categories && categories.map(function(category:CategoryType){
                return(
                    <div className="text-slate-600 border border-slate-200 rounded-lg mb-3 p-3 shadow-lg inline-block me-3">
                        {category.name}
                    </div>
                )
            })
        
        }
        <h2 className="text-xl text-slate-900 font-medium mb-3 mt-3">Create Category</h2>
        <div className="border border-slate-200 py-3 px-4 rounded-lg max-w-[350px]">
        <form>
            <label className="text-slate-600 font sm block mb-2">Category Name</label>
            <input type="text" className="text-slate-600 font sm block mb-3 w-full py-2 border border-slate-300 rounded-lg" onChange={handleCategoryName}  required/>
            <button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={handleSubmit}>Create Category</button>
        </form>
        </div>
        </div>
    )
}


export default Category;