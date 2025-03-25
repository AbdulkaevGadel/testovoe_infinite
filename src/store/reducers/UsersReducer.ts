import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from "../../types/user";

interface UsersState {
    allUsers: User[];
    displayedCount: number;
    isLoading: boolean;
    currentUserId: number | null;
    hasMore: boolean;
}

const initialState: UsersState = {
    allUsers: [],
    displayedCount: 100,
    isLoading: false,
    currentUserId: null,
    hasMore: true,
};

console.log(initialState.displayedCount)

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.allUsers = action.payload;
            state.displayedCount = Math.min(100, action.payload.length);
            state.hasMore = action.payload.length > 100;
        },

        // Улучшенный редюсер для подгрузки
        loadMoreUsers: (state) => {
            console.log(state.isLoading)
            if (!state.hasMore || !state.isLoading) return;

            const newCount = state.displayedCount + 100;
            state.displayedCount = Math.min(newCount, state.allUsers.length);
            state.hasMore = newCount < state.allUsers.length;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

        setCurrentUser: (state, action: PayloadAction<number>) => {
            state.currentUserId = action.payload;
        },

        updateUser: (state, action: PayloadAction<User>) => {
            const index = state.allUsers.findIndex(u => u.id === action.payload.id);
            if (index !== -1) {
                state.allUsers[index] = action.payload;
                if (state.currentUserId === action.payload.id) {
                    state.currentUserId = action.payload.id;
                }
            }
        }
    },
});

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;