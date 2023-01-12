import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Private from './Private/Private';
import Public from './Public/Public';
import { setIsAuthenticated } from '../Reducer/mainReducer'

export const Index = () => {
    const dispatch = useDispatch();
    const [authrize, setAuthrize] = useState(false);
    const authUser = useSelector((state) => state.main.isAuthenticated);
    useEffect(() => {
        if (authUser) {
            if (localStorage.getItem('token') && localStorage.getItem('token') !== '' && localStorage.getItem('user') && localStorage.getItem('user') !== '') {
                dispatch(setIsAuthenticated(true));
                setAuthrize(true)
            } else {
                setAuthrize(false);
            }
        } else {
            setAuthrize(false)
        }
    }, [authUser]) // eslint-disable-next-line
    return (
        <Router>
            {
                authrize ?
                    <Private />
                    :
                    <Public />
            }

        </Router>
    )
}
export default Index