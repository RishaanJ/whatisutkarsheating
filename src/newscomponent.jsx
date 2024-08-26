import React, { useEffect } from 'react';

const NewsComponent = ({ setArticles }) => {
  useEffect(() => {
    const fetchNews = async () => {
      const newsApiKey = import.meta.env.VITE_NEWSAPIKEY;
      const openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
      const url = 'https://newsapi.org/v2/everything';
      const trustedSources = ['wall-street-journal', 'cnn', 'cnbc'];

      const params = new URLSearchParams({
        q: '2024 USA elections',   
        sortBy: 'popularity',     
        pageSize: 1,
        sources: [ 'cnn', 'cnbc'].join(','),
        apiKey: newsApiKey
      });

      try {
        const response = await fetch(`${url}?${params}`);
        const data = await response.json();

        if (data.status === 'ok') {
          const transformedArticles = await Promise.all(
            data.articles.map(async (article) => {
              const content = article.content || article.description;
              if (content) {
                const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openAiApiKey}`,
                  },
                  body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                      {
                        role: 'system',
                        content: 'You are a helpful assistant that summarizes news articles in Gen Z slang.',
                      },
                      {
                        role: 'user',
                        content: `Summarize this news article in Gen Z slang:\n\n${content}`,
                      },
                    ],
                    max_tokens: 100,
                  }),
                });

                const openAiData = await openAiResponse.json();
                const transformedContent = openAiData.choices[0]?.message?.content.trim();

                return {
                  ...article,
                  transformedContent: transformedContent || 'No content available',
                };
              }
              return article;
            })
          );

          setArticles(transformedArticles);
        } else {
          console.error('Error fetching news:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchNews();
  }, [setArticles]);

  return null;
};

export default NewsComponent;
