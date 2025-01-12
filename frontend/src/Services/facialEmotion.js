import axios from "axios";
class facialEmotionService {
  async facialEmotionAnalyzer(data) {
    try {
      console.log(data);
      const response = await axios.post("/api/analyzeFacialEmotion" ,data);
      
      return response.data;
    } catch (error) {
      return error;
    }
  }

};
const getFacialEmotion = new facialEmotionService();
export default getFacialEmotion;