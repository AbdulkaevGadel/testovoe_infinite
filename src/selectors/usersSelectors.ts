import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store/store';

const selectUsersState = (state: RootState) => state.users;

export const selectDisplayedUsers = createSelector(
    [selectUsersState],
    (usersState) => usersState.allUsers.slice(0, usersState.displayedCount)
);

export const selectIsLoading = (state: RootState) => state.users.isLoading;
export const selectCurrentUserId = (state: RootState) => state.users.currentUserId;
export const selectHasMore = (state: RootState) => state.users.hasMore;

export const selectCurrentUser = createSelector(
    [selectUsersState, selectCurrentUserId],
    (usersState, userId) => userId
        ? usersState.allUsers.find(u => u.id === userId)
        : null
);