import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Private from './Private/Private';
import Public from './Public/Public';
import { setIsAuthenticated,setSuccess } from '../Reducer/mainReducer'
import history from '../history';

export const Index = () => {
    const dispatch = useDispatch();
    const [authrize, setAuthrize] = useState(undefined);
    const authUser = useSelector((state) => state.main.isAuthenticated);
    useEffect(() => {
        console.log(authUser);
        if (localStorage.getItem('token') && localStorage.getItem('token') !== '' && localStorage.getItem('user') && localStorage.getItem('user') !== '') {
            dispatch(setIsAuthenticated(true));
            dispatch(setSuccess(localStorage.getItem('user')));
            setAuthrize(true)
        } else {
            setAuthrize(false);
        }
    }, [authUser]) // eslint-disable-next-line
    return (
        <Router history={history}>
            {
                authrize != undefined ?
                    authrize ?
                        <Private />
                        :
                        <Public />
                    :
                    null
            }

        </Router>
    )
}
export default Index