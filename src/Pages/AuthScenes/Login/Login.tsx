import React, { FC, FormEventHandler, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { UserData } from '../../../store/modules';
import { fetchByLogin } from '../../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Login: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { error, loading } = useAppSelector(state => state.user)
    const [userData, setUserData] = useState<UserData>({
        username: '',
        password: '',
    })

    const getUserData = (key: string, value: string) => {
        setUserData({ ...userData, [key]: value })
    }

    const handleForm: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        dispatch(fetchByLogin(userData))
    }

    useEffect(() => {
        return () => navigate('/', { replace: true })
    }, [dispatch])

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleForm}>
                <input
                    value={userData.username}
                    onChange={(e) => getUserData('username', e.target.value)}
                    type="text" placeholder='username' />
                <input
                    value={userData.password}
                    onChange={(e) => getUserData('password', e.target.value)}
                    type="password" placeholder='password' />
                <button disabled={loading}>Sign In</button>
            </form>
            {error && <h3 style={{ color: 'red' }}>{error}</h3>}
        </div>
    );
};

export default Login;