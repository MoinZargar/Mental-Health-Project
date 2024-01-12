import React from "react";
import Container from "./Container/Container";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



function Card({url,title,content}){
  
   return(
   
    <div className="max-w-sm mx-auto my-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center justify-center">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{content}</p>
    
     { url && (
        <Link to={url} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Take {title} Test
      </Link>
     )
    } 
    
  </div>




   )
}
export default Card;