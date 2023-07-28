const Error = ({ error }) => {
  //console.error("Error: " + error.response.data)
  return (
    <div className="w-full mt-6 bg-red-200 text-red-600 rounded-lg p-5 border border-red-400">
      <strong>Error {error.response.status}</strong> - {error.response.statusText}. Please try again.</div>
  );
}

export default Error;