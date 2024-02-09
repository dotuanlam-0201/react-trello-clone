import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { useLayoutEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.scss';
import { useGetDataFromLocal } from './hook/useGetDataFromLocal';
import LoginComponent from './module/Auth/LoginComponent';
import DashboardComponent from './module/dashboard/DashboardComponent';
import GlobalLoading from './module/layout/GlobalLoading';
import NotFoundComponent from './module/layout/NotFoundComponent';
import { useQuery } from '@tanstack/react-query';
import { UserActionDAL } from './utils/dashboard/UserActionDAL';

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
  const bg = useGetDataFromLocal('clone-trello-bg') || 'url(https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/snow.svg)'

  useLayoutEffect(() => {
    document.body.style.backgroundImage = bg
  }, []);

  useQuery({
    queryKey: ['user'],
    queryFn: () => UserActionDAL.getUser(useGetDataFromLocal('TOKEN'))
  })

  return (
    <RouterProvider router={router} />
  )
}

export default App
