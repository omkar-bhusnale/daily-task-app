import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();


function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin" element={<App adminMode={true} />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer 
      position="top-right" 
      autoClose={2000} 
      hideProgressBar={false} 
      newestOnTop 
      closeOnClick pauseOnFocusLoss={false} draggable={false} 
      pauseOnHover={false} />
    </QueryClientProvider>
  );
}

export default Root;
