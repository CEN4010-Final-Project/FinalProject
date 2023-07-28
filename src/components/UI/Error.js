const Error = ({ error }) => {
  if (error.response) {
    return (
      <div className="w-full mt-6 bg-red-200 text-red-600 rounded-lg p-5 border border-red-400">
        <strong>Error {error.response.status}</strong> - {error.response.statusText}. Please try again.
      </div>
    );
    
  } else {
    console.log(error);
    return (
      <div className="w-full mt-6 bg-red-200 text-red-600 rounded-lg p-5 border border-red-400">
        <strong>Error Occurred</strong> - Please try again.
      </div>
    );
  }
}

export default Error;