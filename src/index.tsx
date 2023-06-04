import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './contexts/ThemeContext/ThemeContext';

import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ServicesProvider } from './contexts/ServicesContext/ServicesContext';
import { toast } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //globally default to 20 seconds
      staleTime: 1000 * 20,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      // only show error toasts if we already have data in the cache
      // which indicates a failed background update
      if (query.state.data !== undefined) {
        toast.error(`Something went wrong: ${(error as any)?.message ?? 'no error message'}`);
      }
    },
  }),
});
queryClient.setQueryDefaults(['trendingCoins', 'gasPrices'], { staleTime: 120 * 1000 });
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ServicesProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ServicesProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
