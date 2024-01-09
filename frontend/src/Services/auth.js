import axios from 'axios';
class authentication{
   async connectDb(){
    try {
         const response= await axios.get('/connectDb');
         return response.data;
    } catch (error) {
       return error;
    }
     
   }
   async signup({email, password,name}){
      try {
        const response = await axios.post('/api/signup', {email, password,name});
        return response.data;
      } catch (error) {
        console.log(error);
        return error;
      }
   }
   async login({email, password}){
        try {
            const response = await axios.post('/api/login', {email, password});
            return response.data;
        } catch (error) {
            return error;
        }
   }
   async getCurrentUser(){
        try {
            const response = await axios.get('/api/getCurrentUser');
            return response.data;
        } catch (error) {
            return error;
        }
   }
   async logout(){
       try {
        const response = await axios.get('/api/logout');
        return response.data;
       } catch (error) {
        return  error;
       }
   }
    
};

const getAuthService= new authentication();
export default getAuthService;