import React, { useEffect,useState } from 'react';
import Sidebar from '../Sidebar.jsx';
import SentimentChart from '../SentimentChart.jsx';
import FacialEmotionChart from '../FacialEmotionChart.jsx';
import getAuthService from '../../Services/auth.js'
import getChatService from '../../Services/chatService.js';


const Dashboard = () => {
  const [userInfo,setuserInfo]=useState({});
  const [textSentimentData, setTextSentimentData] = useState({});
  const [facialEmotionData, setFacialEmotionData] = useState({});
  useEffect(() => {
    getAuthService.getCurrentUser().then((data) => {
      if (data.status === 200) {
        
        setuserInfo(data);
        getChatService.EmotionPercentage(data).then((data) => {
          console.log(data.textEmotionPercentage);
          console.log(data.facialEmotionPercentage);
          setTextSentimentData(data.textEmotionPercentage);
          setFacialEmotionData(data.facialEmotionPercentage);
        });
      }
    });
   

  }, []);
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-7 bg-gray-100">
      {/* <h1 className="text-2xl font-bold p-1 mb-6">Dashboard</h1> */}
        <h1 className="text-3xl font-bold mb-7">Welcome, {userInfo['username']}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md h-auto">
            <SentimentChart data={textSentimentData} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md h-auto">
            <FacialEmotionChart data={facialEmotionData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
