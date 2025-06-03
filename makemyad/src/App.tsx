import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import theme from './theme';

// Lazy load components
const Header = React.lazy(() => import('./components/layout/Header'));
const Home = React.lazy(() => import('./components/pages/Home'));
const AdListing = React.lazy(() => import('./components/pages/AdListing'));
const AdDetails = React.lazy(() => import('./components/pages/AdDetails'));
const About = React.lazy(() => import('./components/pages/About'));
const Contact = React.lazy(() => import('./components/pages/Contact'));

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ads" element={<AdListing />} />
              <Route path="/ads/:id" element={<AdDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </React.Suspense>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
