import axios from 'axios';
class Tests{
   async submitTest({TestType,TotalScore}){
   
    try {
        
        const response = await axios.post('/api/submitTest', {TestType,TotalScore});
        return response.data;
        
    } catch (error) {
        return error;
    }
   }

   async getTestScore(){

    try {
        const response = await axios.get('/api/getTestScore');
        return response.data;
        
    } catch (error) {
        return error;
    }
   }
};
const testService = new Tests();
export default testService;
