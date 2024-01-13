import Card from "../Card";
import React, { useEffect,useState } from "react";
import {  useParams } from "react-router-dom";
import testService from "../../Services/tests";
import { useNavigate } from "react-router-dom";
import Test from "./Test";
function Result(){
    const TestType=useParams().type;
    let type=TestType.charAt(0).toUpperCase()+TestType.slice(1);
    const Navigate=useNavigate();
    const [score,setScore]=useState(0);
   const [instruction,setInstruction]=useState('')
    const ThresholdScore={
        depression:4,
        anxiety:4,
        bipolar:4,
        schizophrenia:4
    }

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
    useEffect(()=>{
        
        fetchScore();
        if(score>=ThresholdScore[TestType]){
          setInstruction(`Based on your score we strongly recommend you to join ${type} Support Room`)
        }
        
        
    },[TestType,score,setInstruction])
    return(
<div className="container mx-auto min-h-screen text-center bg-gray-100 p-6 rounded-lg shadow-md">
  <Card title={`${type} Test Result `} instruction={instruction} content={`Your Score is ${score}`} className="text-lg" />

  <div className="mb-8 p-6 rounded bg-gray-200 shadow-md">
    <p className="text-lg font-semibold">
      Connect with others facing similar challenges in our supportive chat rooms.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    <Card
      url="/"
      children="Join Room"
      title="Depression Support"
      content="For those experiencing overwhelming sadness or despair, low energy, or negative self-image."
    />
    <Card
      url="/"
      children="Join Room"
      title="Anxiety Warriors"
      content="For those dealing with extreme worry, fear, nervousness, and restlessness affecting day-to-day life."
    />
    <Card
      url="/"
      children="Join Room"
      title="Bipolar Buddies"
      content="For those navigating extreme mood swings or unusual shifts in mood and energy."
    />
    <Card
      url="/"
      children="Join Room"
      title="Schizophrenia Allies"
      content="For those feeling like their brain is playing tricks on them—seeing, hearing, or believing things that don't seem real or quite right."
    />
  </div>
</div>

    )
}
export default Result;