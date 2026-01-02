import React from "react";

export default function Cards({ story }) {
  console.log(story);
  return (
    <div className="w-64 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 rounded-2xl overflow-hidden shadow-lg border-4 border-purple-600">
   
      <div className="relative h-44 overflow-hidden">
        <img
          src={`https://ik.imagekit.io/dev24/${story?.Image?.[0]}`}
          alt={story.Title}
          className="w-full h-full object-cover"
        />
      </div>
      
   
      <div className="bg-purple-800 px-4 py-3 border-t-2 border-purple-600">
        <h3 className="text-white text-center font-bold text-sm leading-tight">
          {story.Title}
        </h3>
      </div>
      
     
      <div className="px-4 pb-4 pt-2">
        <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 text-purple-900 font-bold py-2 px-4 rounded-full shadow-md transition-all duration-200">
          {story.Status}
        </button>
      </div>
    </div>
  );
}