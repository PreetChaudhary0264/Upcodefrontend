import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";



const CodeBlocks = () => {
const [text, setText] = useState("");



  const code = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`;

  useEffect(() => {
    let i = 0;
    let interval;

    const startTyping = () => {
      interval = setInterval(() => {
        setText(code.slice(0, i + 1));
        i++;

        if (i === code.length) {
          clearInterval(interval);

          // wait before restarting
          setTimeout(() => {
            i = 0;
            setText("");
            startTyping(); // 🔁 restart typing
          }, 1000);
        }
      }, 30);
    };

    startTyping();

    return () => clearInterval(interval);
  }, []);




  return (
    <div className='mx-30 mt-20 flex flex-row  justify-between gap-10 max-w-fit rounded-2xl'>
      {/* section1*/}
      <div className='w-[50%] flex flex-col'>
        
        <h2 className='text-white mt-5 font-semibold text-4xl'>
          Unlock Your Coding Potential
        </h2 >
        <h2 className='text-white font-semibold text-4xl'>
             with our online courses
        </h2>
        
        <p className='mt-10 w-[80%] text-center text-lg font-bold text-gray-400'>
          our courses are designed and taught by industry experts who have years of experience in coding and are passionate about 
          sharing their knowledge with you.
        </p>

        {/* Buttons */}
        <div className='flex flex-row gap-7 mt-8'>
          <Link to={"/about"}>
            <button className='px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition'>
              Learn More
            </button>
          </Link>
          <Link to={"/login"}>
            <button className='px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-500 transition'>
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* section2 - Code Block */}
      <div className="w-[600px] h-[350px] bg-gray-800 rounded-lg shadow-lg p-5 overflow-auto">
        <pre className="text-yellow-200 text-sm leading-relaxed">
          <code>{text}</code>
        </pre>
      </div>
    </div>
  )
}

export default CodeBlocks

