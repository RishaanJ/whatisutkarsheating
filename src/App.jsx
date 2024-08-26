import { useState } from 'react';
import './App.css';
import logo from './assets/clarity main logo.png';
import NewsComponent from './newscomponent';
import './newscard.css';

function App() {
  const [articles, setArticles] = useState([]); // State to store fetched articles

  return (
    <>
      <div className='Head'>
        <img src={logo} alt="Logo" />
      </div>
      <NewsComponent setArticles={setArticles} /> {/* Pass setArticles to NewsComponent */}
      <div className='newscards'>
        {articles.map((article, index) => (
          <div className='newscard' key={index}>
            <img src={article.urlToImage} alt={article.title} />
            <h1>{article.title}</h1>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
