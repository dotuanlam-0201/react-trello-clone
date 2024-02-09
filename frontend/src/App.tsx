import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { useLayoutEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.scss';
import DashboardComponent from './module/dashboard/DashboardComponent';
import GlobalLoading from './module/layout/GlobalLoading';
import NotFoundComponent from './module/layout/NotFoundComponent';
import LoginComponent from './module/Auth/LoginComponent';

const loader = () => <GlobalLoading />

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardComponent />,
    loader: loader,
    children: [],
    errorElement: <ErrorBoundary />
  },
  {
    path: "/login",
    element: <LoginComponent />,
    loader: loader,
    children: [],
    errorElement: <ErrorBoundary />
  },
  {
    path: "/*",
    element: <NotFoundComponent />,
    loader: loader,
    children: [],
    errorElement: <ErrorBoundary />
  },
]);

function App() {
  const bg = localStorage.getItem('clone-trello-bg')

  useLayoutEffect(() => {
    document.body.style.backgroundImage = bg || 'gray'
  }, []);

  return (
    <RouterProvider router={router} />
  )
}

export default App
