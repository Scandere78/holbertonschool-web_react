import React from "react";

function Login() {
  return (
    <div className="App-body p-8 max-[912px]:p-4" style={{ borderTop: '3px solid var(--main-color)' }}>
      <p className="mb-4">Login to access the full dashboard</p>
      <div className="flex flex-wrap gap-4 items-center max-[912px]:flex-col max-[912px]:items-start">
        <label htmlFor="email" className="font-medium">Email:</label>
        <input type="email" id="email" name="email" className="border border-gray-300 px-2 py-1 rounded max-[912px]:w-full" />
        <label htmlFor="password" className="font-medium">Password:</label>
        <input type="password" id="password" name="password" className="border border-gray-300 px-2 py-1 rounded max-[912px]:w-full" />
        <button type="button" className="px-4 py-1 bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-100 max-[912px]:w-full">OK</button>
      </div>
    </div>
  );
}

export default Login;