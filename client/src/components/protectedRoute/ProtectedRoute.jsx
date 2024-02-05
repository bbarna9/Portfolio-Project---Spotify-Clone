import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { PlayerContext } from '../../Player';

export default function ProtectedRoute({ children }) {
  const { state } = useContext(PlayerContext);
  const { userInfo } = state;
  return userInfo ? children : <Navigate to="/login" />;
}
