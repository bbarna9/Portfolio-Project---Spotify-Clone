import './App.css';
import BottomBar from './components/bottomBar/BottomBar';
import LeftSideBar from './components/leftSidebar/LeftSideBar';
import RightSideBar from './components/rightSidebar/RightSideBar';
import Album from './pages/Album/Album';
import Author from './pages/Author/Author';
import Home from './pages/Home/Home';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import Profile from './pages/Profile/Profile';

function App() {
  const Layout = () => {
    return (
      <>
        <LeftSideBar />
        <Outlet />
        <BottomBar />
        <RightSideBar />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/album',
          element: <Album />,
        },
        {
          path: '/author',
          element: <Author />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
      ],
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
