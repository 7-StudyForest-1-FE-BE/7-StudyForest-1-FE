import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import StudyViewPage from './pages/StudyViewPage.jsx';
import StudyRegistrationPage from './pages/StudyRegistrationPage.jsx';
import HabitPage from './pages/HabitPage.jsx';
import ConcentrationPage from './pages/ConcentrationPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import StudyListPage from './pages/StudyListPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path={'/'} element={<HomePage />} />
          <Route path={'/view'} element={<StudyViewPage />} />
          <Route path={'/registration'} element={<StudyRegistrationPage />} />
          <Route path={'/studylist'} element={<StudyListPage />} />
          <Route path={'/habit'} element={<HabitPage />} />
          <Route path={'/concentration'} element={<ConcentrationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </App>
    </BrowserRouter>
  </StrictMode>
);
