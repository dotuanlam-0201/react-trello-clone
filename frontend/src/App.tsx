import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.scss';
import GlobalLoading from './module/layout/GlobalLoading';
import DashboardComponent from './module/dashboard/DashboardComponent';

const loader = () => <GlobalLoading />

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardComponent />,
    loader: loader,
    children: [

    ],
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
