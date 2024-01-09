import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api/predict':'http://localhost:5000',
      '/api/signup':'http://localhost:5000',
      '/api/login':'http://localhost:5000',
      '/api/logout':'http://localhost:5000',
      '/api/connectDb':'http://localhost:5000',
      '/api/getCurrentUser':'http://localhost:5000'
    },
  },
  plugins: [react()],

})
