import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './views/Home';
import Watch from './views/Watch';
import reportWebVitals from './reportWebVitals';
import { ProfileSettings } from './views/ProfileSettings';
import { ManageUsers } from './views/ManageUsers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route index path='/' Component={Home} />
      <Route path='/watch/*' Component={Watch} />
      <Route path='/settings/profilesettings' Component={ProfileSettings} />
      <Route path='/settings/users' Component={ManageUsers} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
