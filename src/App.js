import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import NewsProcessor from './NewsProcessor';
import NotFoundPage from './NotFoundPage';

// https://api.techniknews.net/ipgeo/

function App() {

  return (    
    <nav className="App">
      <Routes>
        <Route path='/' element={<NewsProcessor />}>          
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </nav>
  );
}

export default App;
