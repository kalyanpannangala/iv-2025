"use client";
import React from "react";

interface AnimatedTextsProps {
  currentGif: string;
}

const AnimatedTexts: React.FC<AnimatedTextsProps> = ({ currentGif }) => (
  <div className="fixed inset-0 bg-[rgba(255,255,255,0.85)] overflow-hidden">
    {/* Moving Tourist Bus Animation */}
    <div className="absolute top-1/2 left-0 -translate-y-1/2 animate-moveBusFast">
  <div className="relative">
    {/* Yellow Toy Bus Body */}
    <div className="w-48 h-24 bg-yellow-400 rounded-xl flex border-4 border-yellow-600 shadow-lg">
      {/* Bus Windows with rounded corners */}
      <div className="flex mt-2 z-10">
        <div className="w-8 h-12 bg-sky-300 ml-2 rounded-t-lg"></div>
        <div className="w-8 h-12 bg-sky-300 ml-2 rounded-t-lg"></div>
        <div className="w-8 h-12 bg-sky-300 ml-2 rounded-t-lg"></div>
      </div>
      
      {/* Bus Front with smiling face */}
      <div className="w-16 h-24 bg-yellow-500 rounded-r-xl ml-2 flex flex-col items-center justify-center border-l-4 border-yellow-600">
        {/* Smiley face */}
        <div className="flex flex-col items-center">
          <div className="flex space-x-1 mb-1">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
          <div className="w-6 h-3 border-b-4 border-black rounded-b-full"></div>
        </div>
      </div>
      
      {/* Colorful stripe */}
      <div className="absolute top-1/3 left-0 w-full h-3 bg-red-500 transform -translate-y-1/2"></div>
    </div>
    
    {/* Toy Wheels with inner circles */}
    <div className="absolute -bottom-3 flex space-x-8 pl-6">
      <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
      </div>
      <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
      </div>
    </div>
    
    {/* Exhaust puff for animation */}
    <div className="absolute top-4 right-0 transform translate-x-4 animate-puff">
      <div className="w-4 h-4 bg-gray-300 rounded-full opacity-70"></div>
    </div>
  </div>
</div>

   

    {/* Animation Styles */}
    <style jsx>{`
      @keyframes moveBusFast {
        0% { transform: translateX(-100%) translateY(-50%); }
        100% { transform: translateX(100vw) translateY(-50%); }
      }
      .animate-moveBusFast {
        animation: moveBusFast 2.5s linear infinite;
      }
    `}</style>
  </div>
);

export default AnimatedTexts;