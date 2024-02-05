import './App.css';
import BottomBar from './components/bottomBar/BottomBar';
import LeftSideBar from './components/leftSidebar/LeftSideBar';
import RightSideBar from './components/rightSidebar/RightSideBar';
import Album from './pages/Album/Album';
import AddAlbum from './pages/AddAlbum/AddAlbum';
import Author from './pages/Author/Author';
import AddAuthor from './pages/AddAuthor/AddAuthor';
import Home from './pages/Home/Home';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import Profile from './pages/Profile/Profile';
import AddSong from './pages/AddSong/AddSong';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';

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
          path: '/albums/:id',
          element: <Album />,
        },
        {
          path: '/authors/:id',
          element: <Author />,
        },
        {
          path: '/profile',
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: '/addalbum',
          element: <AddAlbum />,
        },
        {
          path: '/addauthor',
          element: <AddAuthor />,
        },
        {
          path: '/addsong',
          element: <AddSong />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
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
