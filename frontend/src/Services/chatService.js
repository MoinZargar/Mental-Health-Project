import axios from "axios";
class chatService {
  async getRooms() {
    try {
      const response = await axios.get("/api/getRooms",{withCredentials: true});
      
      return response.data;
    } catch (error) {
      return error;
    }
  }
};
const getChatService = new chatService();
export default getChatService;