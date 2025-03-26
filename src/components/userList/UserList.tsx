import React, { useCallback, useRef } from 'react';
import { FixedSizeList, FixedSizeList as List } from 'react-window';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { usersActions } from '../../store/reducers/UsersReducer';
import { selectDisplayedUsers, selectIsLoading, selectHasMore } from '../../selectors/usersSelectors';
import useInfiniteScroll from '../../utilities/useInfiniteScroll';
import styles from './UserList.module.scss';
import userIMG from '../../img/user.jpg'

const UserList = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(selectDisplayedUsers);
    const isLoading = useAppSelector(selectIsLoading);
    const hasMore = useAppSelector(selectHasMore);
    const listRef = useRef<FixedSizeList>(null);
    const outerRef = useRef<HTMLDivElement>(null);

    const loadMore = useCallback(() => {
        if (!isLoading && hasMore) {
            dispatch(usersActions.setLoading(true));
            setTimeout(() => {
                dispatch(usersActions.loadMoreUsers());
                dispatch(usersActions.setLoading(false));
            }, 300);
        }
    }, [dispatch, isLoading, hasMore]);

    useInfiniteScroll(loadMore, outerRef, isLoading);

    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const user = users[index];
        return (
            <div
                style={style}
                className={styles.userCard}
                onClick={() => dispatch(usersActions.setCurrentUser(user.id))}
            >
                <img src={userIMG} alt="user" className={styles.userImage} />
                <h3>{user.name}</h3>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <List
                ref={listRef}
                outerRef={outerRef}
                height={window.innerHeight}
                itemCount={users.length}
                itemSize={50}
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