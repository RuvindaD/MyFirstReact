import { useEffect, useState } from "react";
import ProductType from "../../types/ProductType";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateOrder(){
    const[products,setProducts]=useState<ProductType[]>([]);

    async function loadProducts() {
        try {
            const response=await axios.get("http://localhost:8081/products");

            setProducts(response.data);
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        loadProducts();
    },[])
const[orderedProducts,setOrderedProducts]=useState<ProductType[]>([]);
const[total,SetTotal]=useState<number>(0);

function addProductToOrder(product:ProductType){
    const updateOrder=[...orderedProducts,product]//spreading ordered products array and assign a new value
    setOrderedProducts(updateOrder);
}


//run this sideeffect whenever orderedPoducts state change
useEffect(function(){
    orderedProducts.map(function (product){
        const totalPrice=total+product.price;
        SetTotal(totalPrice);
    });

},[orderedProducts])

const navigate=useNavigate();//usethis from react router dom to navigate user

async function saveOrder() {
    var productIds:any=[];
    orderedProducts.map(function(product){
        productIds.push(product.id)
    })

    try {
        await axios.post("http://localhost:8081/orders",{
            productIds:productIds
        })

        navigate("/order");//navigate user if successful
       
    } catch (error) {
        console.log(error)
    }
    
}

    return(
        <div className="flex">
            <div className="max-w-[400px] border-r border-slate-100 p-2">
                <span className="text-xl font-semibold text-slate-800 block h-[40px] p-2">Products</span>
               
               <div className="mt-5">
                {products.map(function(product){
                    return(
                        <div onClick={()=>addProductToOrder(product)} className="border border-slate-200 rounded-lg p-2 mb-3">
                            <div className="text-lg font-semibold">{product.name}</div>
                            <div className="text-sm text-slate-400">{product.category?.name}</div>
                            <div className="text-sm text-green-600 text-right">Rs.{product.price}</div>

                        </div>
                    )
                })}
                </div>
            </div>
            
            <div className="p-2 w-full">
            <span className="text-xl font-semibold text-slate-800">New Order</span>
            <table className="w-full border-seperate border-spacing-0 border-none text-left">
                <thead>
                    <td>ID</td>
                    <td>Description</td>
                    <td >Price</td>
                </thead>
                <tbody>
                    {orderedProducts.map(function(product){
                        return(
                            <tr>
                               <td className="w-[80px]"> {product.id}</td>
                               <td className="w-[200px]"> {product.name}</td>
                               <td className="w-[200px]"> {product.price}</td> 
                            </tr>
                        )
                    })}
                    <tr>
                        <td colSpan={2}>
                            <strong>Total</strong>
                        </td>

                        <td className="border-t border-slate-500">
                            <strong>{total}</strong>

                        </td>
                    </tr>
                </tbody>

            </table>
            <div className="mt-5"><button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={saveOrder}>Save Order</button>

            </div>
            
            </div>
        </div>
    )
}

export default CreateOrder;