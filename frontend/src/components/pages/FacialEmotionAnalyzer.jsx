import React, { useEffect,useState } from "react";
import getFacialEmotion from "../../Services/facialEmotion";
import getAuthService from "../../Services/auth";
import { FaPlay, FaMicrophone, FaArrowRight } from 'react-icons/fa';
import TestQna from "../TestQuestions";
import { useNavigate } from "react-router-dom";



function FacialEmotionAnalyzer(){
  const navigate = useNavigate()
  const [index, setIndex] = useState(0);

  const facialEmotionQuestions = TestQna.FacialEmotionScreening();
  
  const [isRecording, setIsRecording] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [question,setQuestion]=useState();
  const [answer, setAnswer] = useState("");
  const [emotion,setEmotion] = useState("")
  const textToAudio = (text)=>{
    // Check the value of the flag
    if (isRecording) {
      // Display an error message or return from the function
      alert("🔴 Voice recognition is currently in progress");
      return;
    }

    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "hi-IN";

    const voices = speechSynthesis.getVoices().filter(voice => voice.lang === "hi-IN");
    msg.voice = voices[1];
    msg.volume = 1;
    msg.rate = 0.8;
    msg.pitch = 0.8;

    window.speechSynthesis.cancel(msg);
    window.speechSynthesis.speak(msg);

    // Set the flag to true when the audio starts playing
    setIsAudioPlaying(true);

    // Set the flag to false when the audio ends
    msg.addEventListener('end', () => {
      setIsAudioPlaying(false);
    });
    
  }
//for recording answer
  const audioToText = () => {
    if (isAudioPlaying) {
      // Display an error message or return from the function
      alert("🔴 Audio is currently playing");
      return;
    }

    // Set the flag to true when the recognition starts
    setIsRecording(true);
    
    const recognition = new (webkitSpeechRecognition || window.SpeechRecognition)();
    recognition.interimResults = true;
    recognition.lang = 'en-IN';

    // Set up event listeners for the Web Speech API
    recognition.addEventListener('start', () => {
      // Display a message when recognition starts
      console.log('🔴 Voice Recognition started');
    });
    recognition.addEventListener('result', (event) => {
      // Get the transcribed text
      const transcript = event.results[0][0].transcript;

      // Display the transcribed text
      setAnswer(transcript.toLowerCase());
      

      // Check if the recognition process has completed
      if (event.results[0].isFinal) {
        // Stop recognition if the process has completed
        recognition.stop();
      }
    });
    recognition.addEventListener('end', () => {
      // Display a message when recognition ends
      console.log('🟢 Voice Recognition ended');

      // Set the flag to false when the recognition ends
      setIsRecording(false);
    });

    recognition.start();

  };
    useEffect(() => {
 
      const fetchEmotionData = async () => {
        try {
          if(index < facialEmotionQuestions.length){
            setQuestion(facialEmotionQuestions[index].question);
          } 
          const data=await getAuthService.getCurrentUser();
          if(data.status==200 && index <= facialEmotionQuestions.length){
            const response = await getFacialEmotion.facialEmotionAnalyzer({ index,question,answer,...data});
            console.log(response.facialEmotion);
           
          if(response.facialEmotion){
            setEmotion(response.facialEmotion)
         }
        }
        
        } catch (error) {
          console.error('Error fetching facial emotion:', error);
        }
      };
  
      fetchEmotionData();
        setAnswer("");
        if(index < facialEmotionQuestions.length ){
          textToAudio(facialEmotionQuestions[index].question);
          
        }
    }, [index]);
    return (
      <div className="min-h-screen flex flex-col justify-start items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4">
        {index >= facialEmotionQuestions.length ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl font-bold mb-8">Thank you for answering the questions</h1>
            <button onClick={() => { navigate("/") }} className="p-4 bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none">
              <FaArrowRight />
            </button>
          </div>
        ) : (
          <>
            <header className="text-center py-4">
              <h1 className="text-3xl font-bold mt-4">Answer the question</h1>
              <h4 className="text-2xl font-bold mt-4">Facial Emotion : {emotion[emotion.length-1]}</h4>
            </header>
            
            <main className="flex flex-col items-center justify-start flex-grow space-y-8 mt-4">
              <div className="text-center">
                <p className="text-xl">{question}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button onClick={() => audioToText()} className="p-4 bg-green-600 rounded-full hover:bg-green-700 focus:outline-none">
                  <FaMicrophone className="w-6 h-6" />
                </button>
                <button onClick={() => setIndex(index + 1)} className="p-4 bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none flex items-center space-x-2">
                  <span>Next</span>
                  <FaArrowRight />
                </button>
              </div>
    
              <div className="border-t border-white w-full">
                <h4 className="text-xl mt-4">Your Answer:</h4>
                <p>{answer}</p>
              </div>
            </main>
          </>
        )}
      </div>
    );
    
    
    
  }
export default FacialEmotionAnalyzer;