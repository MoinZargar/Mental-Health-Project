import Card from "../Card";
import React, { useEffect,useState } from "react";
import {  useParams } from "react-router-dom";
import testService from "../../Services/tests";
import { useNavigate } from "react-router-dom";
function Result(){
    const TestType=useParams().type;
    const Navigate=useNavigate();
    const [score,setScore]=useState(0);
    const [error,setError]=useState(null);
    useEffect(()=>{
        const fetchScore=async()=>{
            try {
                const response=await testService.getTestScore()
                const testExists = Object.keys(response).includes(TestType);

                if (testExists) {
                  setScore(response[TestType]);
                } else {
                  Navigate('/tests');
                }
              } 
            catch (error) {
                Navigate('/tests');
               
              }

        }
        fetchScore();
        
    },[TestType,score])
    return(
        <div>
            <Card title={`Result : ${TestType} Test`} content={`Your Score is ${score}`}/>
        </div>
    )
}
export default Result;