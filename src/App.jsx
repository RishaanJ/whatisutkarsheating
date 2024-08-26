import { useState } from 'react';
import './App.css';
import logo from './assets/WIUELogo.png';
import Card from './card'
import pancake from './pancake.png'

function App() {
  const [status, setStatus] = useState('eating'); // Example status

  return (
    <>
      <div className='Head'>
        <img src={logo} alt="Logo" />
        <div className='status'>
          <h1>Utkarsh is currently</h1>
          <div className={`actualstatus ${status.includes('eating') ? 'eating' : ''}`}>
            <h1>Eating...</h1>
            <img src="https://media.forgecdn.net/avatars/thumbnails/432/988/256/256/637671187828924709_animated.gif" alt="Eating animation" />
          </div>
        </div>
      </div>

      <div className='cards'>
        <Card title="Chocolate Pancake" image={pancake} date="7/3/24 7:34 AM" description="yumms"/>
      </div>
    </>
  );
}

export default App;
