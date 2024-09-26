import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/WorkScenes/Home/Home';
import PreviewHome from './Pages/AuthScenes/PreviewHome/PreviewHome';
import Registration from './Pages/AuthScenes/Registration/Registration';
import Login from './Pages/AuthScenes/Login/Login';
import { getLSToken } from './LS';
import { fetchByUserData, setToken } from './store/slices/userSlice';

const App = () => {
  const { token } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    let lsToken = getLSToken()
    if (lsToken !== null || lsToken !== undefined) {
      dispatch(setToken(lsToken))
    }
  }, [dispatch])

  useEffect(() => {
    if (token) {
      dispatch(fetchByUserData(token))
    }
  }, [dispatch, token])
  return token ? (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  ) :
    (
      <Routes>
        <Route path='/' element={<PreviewHome />} />
        <Route path='/sign-up' element={<Registration />} />
        <Route path='/sign-in' element={<Login />} />
      </Routes>
    )
};

export default App;