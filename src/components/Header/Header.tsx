import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logOut } from '../../store/slices/userSlice';

const Header: FC = () => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.user)

    const handleLogOut = () => {
        dispatch(logOut())
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={handleLogOut}>Log Out</button>
            <div>
                <h3>{user?.email}</h3>
                <h4>{user?.username}</h4>
            </div>
        </div>
    );
};

export default Header;