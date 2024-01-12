import React, { useEffect,useCallback } from "react";
import TestQna from "../TestQuestions";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Container from "../Container/Container";
import testService from "../../Services/tests.js";


function SubTests(){
  const TestType=useParams().type;
  const [questions,setQuestions]=useState([]);
  const[TotalScore,setTotalScore]=useState(0);
  const [storage, setStorage] = useState({});

  const Navigate=useNavigate();

  const SubmitScore=async()=>{
    try {
     
      await testService.submitTest({TestType,TotalScore})
     
    } catch (error) {
      throw error;
    }
    
    
     Navigate(`/result/${TestType}`)
   
  }
  
  const handleClick = (option,index) => {
    //visited question first time
    if (!storage[index]) {
      
      
      setStorage({...storage,[index]:option});
      setTotalScore(TotalScore+option.score);
    }
    else{
      //Visited previously visited QUESTION but changed choice/response 
      if(storage[index].response!==option.response){
        let score = TotalScore + option.score-storage[index].score;

        
        setStorage({...storage,[index]:option});
        setTotalScore(score);
      }
    } 
  };


  useEffect(() => {
    switch(TestType){
      case 'depression':
         setQuestions(TestQna.DepressionTest());
         
         break;
      case 'anxiety':
         setQuestions(TestQna.AnxietyTest());
          break;
      case 'bipolar':
         setQuestions(TestQna.BipolarTest());
          break;
      case 'schizophrenia':
         setQuestions(TestQna.SchizophreniaTest());
          break;
      default:
         Navigate('/tests');
   }
   
   
  },[TestType]);
  
  return(

<Container>
  <div className="flex items-center justify-center min-h-screen">
    
    <div className="w-full md:w-2/3 lg:w-1/2 xl:w-full bg-white border border-gray-200 rounded-lg shadow-md p-14">
    {questions && questions.length > 0 && (
        <h2 className="text-sm md:text-base lg:text-lg text-red-500 font-bold mb-6 py-5 ">
          {questions[0]['title']}
        </h2>
      )}
      {questions.map((data, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-sm md:text-base lg:text-lg font-bold mb-8 ">
          {index+1}. { data.question}
          </h2>
          <div className="flex flex-wrap gap-8">
            {data.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className={`${
                  storage[index] && storage[index].response === option.response
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-300 hover:bg-gray-200 text-gray-800'
                } font-bold py-2 px-3 rounded-md cursor-pointer`}
               
                onClick={() => {
                  handleClick(option,index);
                }}
              >
                {option.response}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-center">
      <button
        type="submit"
        className="bg-red-500 hover:bg-blue-700 text-white font-bold my-6 py-2 px-4 rounded block focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        onClick={() => SubmitScore()}
      >
        Submit
      </button>
    </div>
    </div>
    
  </div>
  
</Container>
);


}
export default SubTests;