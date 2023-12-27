import { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';

import './App.css';

import { Profile, Dashboard, Login, Register, NotFound, Container, AuthRoute } from 'components';
import { PATH } from 'const';
import { AppActions } from 'store';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AppActions.user.verifyToken());
  })
  
  return (
    <Container>
      <Routes>
        <Route path={PATH.DASHBOARD} element={<Dashboard />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        <Route path={PATH.PROFILE} element={<AuthRoute><Profile /></AuthRoute>} />
        <Route path={PATH.NOTFOUND} element={<NotFound />} />
      </Routes>
    </Container>
  );
}

export default App;
