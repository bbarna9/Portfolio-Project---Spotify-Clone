import './App.css';
import BottomBar from './components/bottomBar/BottomBar';
import LeftSideBar from './components/leftSidebar/LeftSideBar';
import RightSideBar from './components/rightSidebar/RightSideBar';
import Album from './pages/Album/Album';
import AddAlbum from './pages/AddAlbum/AddAlbum';
import Author from './pages/Author/Author';
import Admin from './pages/Admin/Admin';
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
import Playlist from './pages/Playlist/Playlist';
import Favourites from './pages/Favourites/Favourites';

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
          path: '/albums/key/:key',
          element: (
            <ProtectedRoute>
              <Album />
            </ProtectedRoute>
          ),
        },
        {
          path: '/authors/key/:key',
          element: <Author />,
        },
        {
          path: '/favourites',
          element: (
            <ProtectedRoute>
              <Favourites />
            </ProtectedRoute>
          ),
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
        {
          path: '/admin',
          element: <Admin />,
        },
        {
          path: '/playlist',
          element: <Playlist />,
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
