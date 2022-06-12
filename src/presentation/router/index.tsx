import { BrowserRouter, Routes, Route } from 'react-router-dom';

type RouterProps = {
  makeHome: React.FC;
};

export const Router = ({ makeHome: MakeHome }: RouterProps) => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MakeHome />} />
    </Routes>
  </BrowserRouter>
);
