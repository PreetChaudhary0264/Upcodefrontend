import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CodeBlocks = () => {
  const [text, setText] = useState("");
  const { token } = useSelector((state) => state.auth);

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
          setTimeout(() => {
            i = 0;
            setText("");
            startTyping(); // restart typing
          }, 1000);
        }
      }, 30);
    };

    startTyping();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-4 sm:mx-10 mt-20 flex flex-col md:flex-row justify-between gap-10 max-w-full rounded-2xl">
      {/* section1 */}
      <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="text-white mt-5 font-semibold text-3xl sm:text-4xl">
          Unlock Your Coding Potential
        </h2>
        <h2 className="text-white font-semibold text-3xl sm:text-4xl">
          with our online courses
        </h2>

        <p className="mt-6 sm:mt-10 w-full sm:w-4/5 text-center md:text-left text-base sm:text-lg font-bold text-gray-400">
          our courses are designed and taught by industry experts who have years of experience in coding and are passionate about 
          sharing their knowledge with you.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 mt-6 sm:mt-8">
          <Link to={"/about"}>
            <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition w-full sm:w-auto">
              Learn More
            </button>
          </Link>
          {token == null && (
            <Link to={"/login"}>
              <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-500 transition w-full sm:w-auto">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* section2 - Code Block */}
      <div className="hidden md:block md:w-[600px] h-[300px] sm:h-[350px] bg-gray-800 rounded-lg shadow-lg p-5 overflow-auto custom-929:block">
        <pre className="text-yellow-200 text-sm sm:text-base leading-relaxed">
          <code>{text}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlocks;



