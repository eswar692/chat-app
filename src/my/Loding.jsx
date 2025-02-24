const Loading = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 rounded-full opacity-75 animate-ping"></div>
          <div className="relative flex items-center justify-center h-16 w-16 rounded-full bg-blue-500 animate-spin">
            <div className="h-8 w-8 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Loading;
  