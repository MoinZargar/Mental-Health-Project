import {React,useState} from 'react';
import axios from 'axios';
export default function Sentiment() {
  const[result,setResult] = useState('')
  const [inputText, setInputText] = useState('');
  
  const submitForm = async () => {
      try {
        console.log(inputText);
        
        const response = await axios.post('/predict',{text:inputText});
        
        const data=response.data;
        console.log(data.sentiment);
         setResult(data.sentiment);
      } catch (error) {
        setResult(error.message);
      }
      
  }
  return (
    
     
        <div className="max-w-md mx-auto bg-white rounded p-6 shadow-md">
          <h1 className="text-2xl font-bold mb-4">Sentiment Analysis</h1>
    
          {/* Textarea */}
          <textarea
            className="w-full px-3 py-2 border rounded-md"
            rows="4"
            placeholder="Enter text..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
    
          {/* Submit Button */}
          <button
            onClick={submitForm}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Submit
          </button>
    
          {/* Results Display */}
          <div className="mt-8">
            <p className="mt-4 text-green-700">{result}</p>
          </div>
        </div>
      );
    
  

}