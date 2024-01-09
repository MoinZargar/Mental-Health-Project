
function Home(){
    return(
    
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl p-8 bg-white rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Mental Health Assessment
        </h1>

        <p className="text-gray-600 mb-6 text-center">
          Take a test to assess your mental health and connect with others facing similar challenges.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mental Health Test Section */}
          <div className="bg-blue-500 p-6 rounded-md">
            <h2 className="text-xl font-semibold text-white mb-4">Mental Health Test</h2>
            {/* Add your mental health test components here */}
          </div>

          {/* Chat Rooms Section */}
          <div className="bg-green-500 p-6 rounded-md">
            <h2 className="text-xl font-semibold text-white mb-4">Chat Rooms</h2>
            {/* Add your chat room components here */}
          </div>
        </div>

        <p className="text-gray-600 mt-6 text-center">
          All chats are reviewed by an AI model to assess sentiment and provide personalized resources based on mental health conditions.
        </p>
      </div>
    </div>

  );
};
      
 
export default Home;