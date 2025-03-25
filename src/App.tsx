import React, {useEffect} from 'react';
import {useAppDispatch} from './hooks/hooks';
import styles from './App.module.scss';
import {usersActions} from "./store/reducers/UsersReducer";
import {generateUsers} from "./generator/generator";
import UserList from "./components/userList/UserList";
import UserEditForm from "./components/userEditForm/UserEditForm";

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(usersActions.setUsers(generateUsers(1000000)));
    }, [dispatch]);

    return (
        <div className={styles.app}>
            <UserList/>
            <UserEditForm/>
        </div>
    );
};

export default App;