import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      phone: null,
      username: null,
      token: null,
      isAuthenticated: false,
      isSchoolAdmin: false,
      isSchoolStaff: false,
      isTeacher: false,
      isStudent: false,
      isGuardian: false,
      school: null,
      school_id: null,

      login: async (userData) => {
        set({
          user: userData.username, // keeping 'user' for backward compatibility
          username: userData.username,
          phone: userData.phone || null,
          token: userData.token,
          isAuthenticated: true,
          isSchoolAdmin: userData.isSchoolAdmin ?? false,
          isSchoolStaff: userData.isSchoolStaff ?? false,
          isTeacher: userData.isTeacher ?? false,
          isStudent: userData.isStudent ?? false,
          isGuardian: userData.isGuardian ?? false,
          school: userData.school || null,
          school_id: userData.school_id || null,
        });
      },

      logout: async () => {
        set({
          user: null,
          username: null,
          phone: null,
          token: null,
          isAuthenticated: false,
          isSchoolAdmin: false,
          isSchoolStaff: false,
          isTeacher: false,
          isStudent: false,
          isGuardian: false,
          school: null,
          school_id: null,
        });
      },

      initializeAuth: () => {
        const { token } = get();
        if (token) {
          // Potentially validate token with backend here
        } else {
          get().logout();
        }
      },

      hasRole: (role) => {
        const state = get();
        return state[role] === true;
      },

      // New getter for school information
      getSchoolInfo: () => {
        const state = get();
        return {
          name: state.school,
          id: state.school_id
        };
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        token: state.token,
        user: state.user,
        username: state.username,
        isAuthenticated: state.isAuthenticated,
        school: state.school,
        school_id: state.school_id,
      }),
    }
  )
);

export default useAuthStore;