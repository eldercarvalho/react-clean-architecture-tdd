import { makeHomePage } from '@/main/factories/pages/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const HomePage = makeHomePage();

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={HomePage} />
    </Routes>
  </BrowserRouter>
);
