// store/userStore.js
import { create } from 'zustand';

const useUserStore = create((set) => ({
  userId: null,
  schoolId: null,
  userRole: null, // 'staff', 'teacher', or 'student'
  userData: null, // entire user object if needed

  // Action to set user ID
  setUserId: (id) => set({ userId: id }),
  
  // Action to set school ID
  setSchoolId: (id) => set({ schoolId: id }),
  
  // Action to set user role
  setUserRole: (role) => set({ userRole: role }),
  
  // Action to set complete user data
  setUserData: (data) => set({ 
    userData: data,
    userId: data?.id || null,
    schoolId: data?.school || null,
    userRole: data?.isSchoolStaff ? 'staff' : 
              data?.isTeacher ? 'teacher' : 
              data?.isStudent ? 'student' : null
  }),
  
  // Action to clear all user data (for logout)
  clearUserData: () => set({ 
    userId: null, 
    schoolId: null, 
    userRole: null, 
    userData: null 
  }),
}));

export default useUserStore;