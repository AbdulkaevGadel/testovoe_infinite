import React, { useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { usersActions } from '../../store/reducers/UsersReducer';
import { selectDisplayedUsers, selectIsLoading, selectHasMore } from '../../selectors/usersSelectors';
import useInfiniteScroll from '../../utilities/useInfiniteScroll';
import styles from './UserList.module.scss';

const UserList = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(selectDisplayedUsers);
    const isLoading = useAppSelector(selectIsLoading);
    const hasMore = useAppSelector(selectHasMore);

    const loadMore = useCallback(() => {
        if (!isLoading && hasMore) {
            dispatch(usersActions.setLoading(true));
            setTimeout(() => {
                dispatch(usersActions.loadMoreUsers());
                dispatch(usersActions.setLoading(false));
            }, 300);
        }
    }, [dispatch, isLoading, hasMore]);

    useInfiniteScroll(loadMore);

    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const user = users[index];
        return (
            <div
                style={style}
                className={styles.userCard}
                onClick={() => dispatch(usersActions.setCurrentUser(user.id))}
            >
                <h3>{user.name}</h3>
                <p>{user.company}, {user.department}</p>
                <p className={styles.jobTitle}>{user.jobTitle}</p>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <List
                height={window.innerHeight}
                itemCount={users.length}
                itemSize={100}
                width="100%"
            >
                {Row}
            </List>
            {isLoading && <div className={styles.loading}>Загрузка...</div>}
            {!hasMore && users.length > 0 && (
                <div className={styles.endMessage}>Все пользователи загружены</div>
            )}
        </div>
    );
};

export default UserList;