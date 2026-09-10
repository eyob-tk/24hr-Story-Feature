import {useState, useEffect } from "react";
import './App.css';

const TWENTY_FOUR_HOURS_MS = 24*60*60*1000;
const STORY_DURATION_MS = 3000;

const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export  default function App() {
  const [stories, setStories] = useState(() => {
    const savedStories = localStorage.getItem('instagram_stories');
    if (!savedStories) return [];

    try {
      const parsedStories = JSON.parse(savedStories);
      const now = Date.now();

      return parsedStories.filter(
        (story) => now - story.createdAt < TWENTY_FOUR_HOURS_MS
      );
    } catch (error){
      console.error("Failed to parse stories from localStorage:", error);
      return [];
    }
  });

  const [activeStoryIndex, setActiveStoryIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('instagram_stories', JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    if (activeStoryIndex === null) return;

    const timer = setTimeout(() => {
      if (activeStoryIndex < stories.length - 1) {
        setActiveStoryIndex((prev) => prev + 1);
      } else {
        setActiveStoryIndex(null)
      }
    }, STORY_DURATION_MS);

    return () => clearTimeout(timer);
  }, [activeStoryIndex, stories.length]);

  const handleFileUpload = async(event) => {
    const file = event.target.files[0];
    if (!file) return;

    try{
      const base64Image = await convertFileToBase64(file);
      const newStory = {
        id: `story-${Date.now()}`,
        imageBase64: base64Image,
        createdAt: Date.now(),
      };

      setStories((prevStories) => [...prevStories, newStory]);
    } catch (error){
      console.error("Error reading file:", error);
    }
  };

  const handleNextStory = () => {
    if (activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex((prev) => prev + 1);
    } else{
      setActiveStoryIndex(null);
    }
  };

  const handlePrevStory = () => {
    if (activeStoryIndex > 0) {
      setActiveStoryIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="app-container">
      <h2>24hr Story Feature</h2>

      <div className="stories-bar">
        <label className="story-circle add-story-btn">
          <span>+</span>
          <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          />
        </label>

        {stories.map((story, index) => (
          <div 
          key={story.id} 
          className="story-circle avatar-circle"
          onClick={() => setActiveStoryIndex(index)}>
            <img src={story.imageBase64} alt="Story Avatar" />
          </div>  
        ))}
      </div>

      {activeStoryIndex !== null && stories[activeStoryIndex] && (
        <div className="story-modal">
          <button className="close-btn" onClick={() => setActiveStoryIndex(null)}>
            ✕
          </button>

          <div className="progress-container">
            {stories.map((_, idx) => (
              <div key={idx} className="progress-track">
                <div
                className={`progress-fill ${
                  idx < activeStoryIndex
                  ? 'completed'
                  : idx === activeStoryIndex
                  ? 'active'
                  : ''
                }`}
                />
              </div>
            ))}
          </div>

          <img
          src={stories[activeStoryIndex].imageBase64}
          alt="Current Story"
          className="story-image"
          />

          <div className="tap-area left" onClick={handlePrevStory} />
          <div className="tap-area right" onClick={handleNextStory} />
        </div>
      )}
    </div>
  );
}