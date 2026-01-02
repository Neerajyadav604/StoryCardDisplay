import React, { useState, useEffect } from "react";

export default function StoryDetailPage() {
  const [stories, setStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("word-explorer");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch('https://mxpertztestapi.onrender.com/api/sciencefiction')
      .then(response => response.json())
      .then(data => {
        setStories(data);
        console.log(data)
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching stories:', error);
        setLoading(false);
      });
  }, []);

  const currentStory = stories[currentStoryIndex];

  const tabs = [
    { id: "word-explorer", label: "Word Explorer", icon: "🔍" },
    { id: "story-adventure", label: "Story Adventure", icon: "📖" },
    { id: "brain-quest", label: "Brain Quest", icon: "🧠" }
  ];

  const handleAnswerSelect = (questionId, option) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      resetQuiz();
    }
  };

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      resetQuiz();
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setActiveTab("word-explorer");
  };

  const getTabButtonStyles = (tabId) => {
    const baseStyles = "px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2";
    
    if (activeTab === tabId) {
      if (tabId === "word-explorer") {
        return `${baseStyles} bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg`;
      } else if (tabId === "story-adventure") {
        return `${baseStyles} bg-gradient-to-r from-purple-500 to-pink-400 text-white shadow-lg`;
      } else {
        return `${baseStyles} bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg`;
      }
    }
    
    return `${baseStyles} bg-gray-700 text-gray-300 hover:bg-gray-600 border-2 border-gray-600`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-indigo-950 flex items-center justify-center">
        <div className="text-white text-2xl">Loading stories...</div>
      </div>
    );
  }

  if (!currentStory) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-indigo-950 flex items-center justify-center">
        <div className="text-white text-2xl">No stories found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-indigo-950 py-10 px-4">
     
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-purple-400">The Lost City of</span>
          <span className="text-white"> {currentStory.Title}</span>
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Story {currentStoryIndex + 1} of {stories.length}
        </p>
      </div>

      
      <div className="flex gap-4 justify-center mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={getTabButtonStyles(tab.id)}
          >
            <span className="text-xl">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      
      <div className="max-w-6xl mx-auto">
      
        {activeTab === "word-explorer" && (
          <div>
            <p className="text-center text-gray-300 mb-8 text-lg">
              Drag Pictures to the matching Words, light up correct pairs, shake for a retry
            </p>
            <div className="grid grid-cols-5 gap-6">
              {currentStory.Wordexplore?.map((word, index) => (
                <div key={index} className="bg-gradient-to-b from-purple-900 to-indigo-900 rounded-xl p-4 border-2 border-cyan-500 hover:border-cyan-300 transition-all">
                  <img
                    src={`https://ik.imagekit.io/dev24/${word.Storyimage?.[0]}`}
                    alt={word.Storytitle}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-white font-bold text-center mb-2">{word.Storytitle}</h3>
                  <p className="text-cyan-300 text-sm text-center mb-2">{word.Storyttext}</p>
                  <p className="text-gray-400 text-xs text-center">{word.Storyitext}</p>
                </div>
              ))}
            </div>
          </div>
        )}

       
        {activeTab === "story-adventure" && (
          <div className="bg-gradient-to-b from-purple-900 to-indigo-900 rounded-xl p-8 border-2 border-purple-500">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              {currentStory.Storyadvenure?.Storytitle || currentStory.Title}
            </h2>
            <div className="space-y-6">
              {currentStory.Storyadvenure?.content?.map((section, index) => (
                <div key={index} className="bg-indigo-950 bg-opacity-50 rounded-lg p-6">
                  {section.Storyimage && (
                    <img
                      src={`https://ik.imagekit.io/dev24/${section.Storyimage[0]}`}
                      alt={`Story scene ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                  )}
                  <p className="text-gray-200 text-lg leading-relaxed">
                    {section.Paragraph || section.text || JSON.stringify(section)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

       
        {activeTab === "brain-quest" && (
          <div className="space-y-6">
            <p className="text-center text-gray-300 mb-8 text-lg">
              Test your knowledge! Select the correct answer for each question.
            </p>
            {currentStory.Brainquest?.map((question, qIndex) => (
              <div key={question._id} className="bg-gradient-to-b from-pink-900 to-purple-900 rounded-xl p-6 border-2 border-pink-500">
                <h3 className="text-white font-bold text-xl mb-4">
                  Question {qIndex + 1}: {question.Question}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {question.Option?.map((option, oIndex) => {
                    const isSelected = selectedAnswers[question._id] === option;
                    const isCorrect = option === question.Answer;
                    const showCorrectAnswer = showResults && isCorrect;
                    const showWrongAnswer = showResults && isSelected && !isCorrect;

                    return (
                      <button
                        key={oIndex}
                        onClick={() => !showResults && handleAnswerSelect(question._id, option)}
                        disabled={showResults}
                        className={`p-4 rounded-lg font-semibold transition-all ${
                          showCorrectAnswer
                            ? "bg-green-500 text-white border-2 border-green-300"
                            : showWrongAnswer
                            ? "bg-red-500 text-white border-2 border-red-300"
                            : isSelected
                            ? "bg-purple-500 text-white border-2 border-purple-300"
                            : "bg-indigo-800 text-gray-200 hover:bg-indigo-700 border-2 border-indigo-600"
                        }`}
                      >
                        {option}
                        {showCorrectAnswer && " ✓"}
                        {showWrongAnswer && " ✗"}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {currentStory.Brainquest?.length > 0 && !showResults && (
              <div className="text-center mt-8">
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length !== currentStory.Brainquest?.length}
                  className="px-12 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Quiz
                </button>
              </div>
            )}

            {showResults && (
              <div className="text-center mt-8 bg-gradient-to-r from-purple-900 to-pink-900 rounded-xl p-6 border-2 border-purple-400">
                <h3 className="text-2xl font-bold text-white mb-2">Quiz Results</h3>
                <p className="text-cyan-300 text-xl">
                  You got {Object.entries(selectedAnswers).filter(([id, ans]) => {
                    const q = currentStory.Brainquest.find(q => q._id === id);
                    return q && q.Answer === ans;
                  }).length} out of {currentStory.Brainquest?.length} correct!
                </p>
              </div>
            )}
          </div>
        )}
      </div>

     
      <div className="flex justify-center gap-4 mt-12">
        <button 
          onClick={handlePrevStory}
          disabled={currentStoryIndex === 0}
          className="px-8 py-3 bg-purple-700 hover:bg-purple-600 text-white font-semibold rounded-full transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>◀</span> Previous
        </button>
        <button 
          onClick={handleNextStory}
          disabled={currentStoryIndex === stories.length - 1}
          className="px-8 py-3 bg-purple-700 hover:bg-purple-600 text-white font-semibold rounded-full transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next <span>▶</span>
        </button>
      </div>
    </div>
  );
}