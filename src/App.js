import { useState, useMemo } from "react";
import Cards from "./Cards/Cards";
import useFetchStories from "./hook/Fetchstorieshook";


function App() {
  const stories = useFetchStories();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const itemsPerPage = 8; // 8 cards per page (2 rows × 4 columns)

  // Get unique Statuses from stories
  const Statuses = useMemo(() => {
    const uniqueStatuses = [...new Set(stories.map(story => story.Status))];
    return uniqueStatuses.filter(Boolean); //move any undefined/null values
  }, [stories]);

  // Filter stories based on selected Status
  const filteredStories = useMemo(() => {
    if (selectedStatus === "all") {
      return stories;
    }
    return stories.filter(story => story.Status === selectedStatus);
  }, [stories, selectedStatus]);

  // Calculate current stories to display
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentStories = filteredStories.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredStories.length / itemsPerPage);

  // Reset to page 1 when filter changes
  const handleStatusChange = (Status) => {
    setSelectedStatus(Status);
    setCurrentPage(1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Get button styles based on Status
  const getButtonStyles = (Status) => {
    const baseStyles = "px-8 py-3 rounded-full font-bold text-white shadow-lg transition-all flex items-center gap-2";
    
    if (selectedStatus === Status) {
      switch(Status) {
        case "new":
          return `${baseStyles} bg-gradient-to-r from-purple-600 to-purple-700`;
        case "in progress":
          return `${baseStyles} bg-gradient-to-r from-yellow-500 to-yellow-600`;
        case "completed":
          return `${baseStyles} bg-gradient-to-r from-green-400 to-green-500`;
        case "all":
          return `${baseStyles} bg-gradient-to-r from-cyan-500 to-blue-600`;
        default:
          return `${baseStyles} bg-gradient-to-r from-purple-600 to-purple-700`;
      }
    }
    
    return `${baseStyles} bg-gray-700 opacity-60 hover:opacity-80`;
  };

  // Get icon for Status
  const getStatusIcon = (Status) => {
    switch(Status) {
      case "new":
        return "🅰️";
      case "in progress":
        return "🏆";
      case "completed":
        return "✅";
      default:
        return "";
    }
  };

  return (
    <div className="App min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950 py-10 px-4">
     
       <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-white mb-8">Science Fiction Stories</h1>
        
       
        <div className="flex gap-4 justify-center flex-wrap mb-8">
          <button
            onClick={() => handleStatusChange("all")}
            className={getButtonStyles("all")}
          >
            Clear All
          </button>
          
          {Statuses.map((Status) => (
            <button
              key={Status}
              onClick={() => handleStatusChange(Status)}
              className={getButtonStyles(Status)}
            >
              <span className="text-2xl">{getStatusIcon(Status)}</span>
              <span className="capitalize">{Status}</span>
            </button>
          ))}
        </div>
      </div>

   
      <div className="grid grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
        {currentStories.length > 0 ? (
          currentStories.map((story) => (
            <Cards key={story._id} story={story} />
          ))
        ) : (
          <div className="col-span-4 text-center py-20 text-gray-400 text-xl">
            No stories found for this filter.
          </div>
        )}
      </div>

    
      {filteredStories.length > 0 && totalPages > 1 && (
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
          <button
            className="px-6 py-3 text-purple-400 font-semibold disabled:opacity-30 hover:text-purple-300 transition-colors flex items-center gap-2"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            <span>◀</span> Previous
          </button>
          
          <div className="flex-1 mx-8">
            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300"
                style={{ width: `${(currentPage / totalPages) * 100}%` }}
              />
            </div>
          </div>
          
          <button
            className="px-6 py-3 text-purple-400 font-semibold disabled:opacity-30 hover:text-purple-300 transition-colors flex items-center gap-2"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next <span>▶</span>
          </button>
        </div> 
      )} 
    </div>
  );
}

export default App;