import { makeHome } from '@/main/factories/pages/home-factory';
import React from 'react';
import { Router } from './router';

function App() {
  return <Router makeHome={makeHome} />;
}

export default App;
