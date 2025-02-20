

import {create}  from 'zustand';

export const useStore = create((set) => ({
    userInfo: 'hi',
    setUserInfo: (userInfo) => set({ userInfo }),
}));


