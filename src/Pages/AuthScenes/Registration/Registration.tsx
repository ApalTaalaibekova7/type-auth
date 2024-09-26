import React, { FC, FormEventHandler, useEffect, useState } from 'react';
import './Regist.css'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { UserData } from '../../../store/modules';
import { fetchByAddNewUser, toggleRedirect } from '../../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Registration: FC = () => {
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false)
    const dispatch = useAppDispatch()
    const { loading, redirect, error } = useAppSelector(state => state.user)
    const [userData, setUserData] = useState<UserData>({
        username: '',
        email: '',
        password: '',
    })

    const getUserData = (key: string, value: string) => {
        setUserData({ ...userData, [key]: value })
    }

    const handleForm: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        dispatch(fetchByAddNewUser(userData))
    }

    useEffect(() => {
        if (redirect) {
            navigate('/sign-in')
        }
        return () => {
            if (redirect) {
                dispatch(toggleRedirect(false))
            }
        }
    }, [dispatch, redirect])
    return (
        <div>
            <h1>Registrition</h1>
            <form autoComplete='off' onSubmit={handleForm}>
                <input
                    value={userData.username}
                    onChange={(e) => getUserData('username', e.target.value)}
                    type="text" placeholder='username' />
                <input
                    autoComplete='off'
                    value={userData.email}
                    onChange={(e) => getUserData('email', e.target.value)}
                    type="email" placeholder='email' />
                <input
                    value={userData.password}
                    onChange={(e) => getUserData('password', e.target.value)}
                    type={showPass ? 'text' : 'password'}
                    placeholder='password' />
                <button disabled={loading}>Sign Up</button>
                <label >
                    <input
                        onChange={() => setShowPass(!showPass)}
                        type="checkbox" /> Show password
                </label>
                <div>
                    {error && <h3>{error}</h3>}
                </div>
            </form>
        </div>
    );
};

export default Registration;