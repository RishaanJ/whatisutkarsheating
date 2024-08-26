import React, { useEffect } from 'react';

const NewsComponent = ({ setArticles }) => {
  useEffect(() => {
    const apiKey = import.meta.env.VITE_NEWSAPIKEY; // Use VITE_ prefix for Vite env variables
    const url = 'https://newsapi.org/v2/everything';

    const params = new URLSearchParams({
      q: '2024 USA elections',   // Search query
      sortBy: 'popularity',      // Sort by popularity
      pageSize: 100,             // Number of articles per page
      apiKey: apiKey             // Your API key from the environment
    });

    fetch(`${url}?${params}`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          setArticles(data.articles); // Pass articles to parent component
        } else {
          console.error('Error:', data.message);
        }
      })
      .catch(error => console.error('Fetch Error:', error));
  }, []); // Empty dependency array ensures this runs only once

  return null; // No need to render anything here; data is passed up to App.js
};

export default NewsComponent;
