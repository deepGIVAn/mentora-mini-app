import { MOCK_USERS, MOCK_LESSONS, MOCK_SESSIONS } from '../data/mockData';
import { User, Student, Lesson, Session } from '../types';

// Mocking API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ApiService = {
  login: async (email: string, password: string): Promise<User | null> => {
    await delay(1000);
    const user = Object.values(MOCK_USERS).find(u => u.email === email);
    // In a real app, we'd verify password
    return user || null;
  },

  getStudentsByParent: async (parentId: string): Promise<Student[]> => {
    await delay(800);
    return Object.values(MOCK_USERS).filter(
      u => u.role === 'student' && (u as Student).parentId === parentId
    ) as Student[];
  },

  getStudentsByMentor: async (mentorId: string): Promise<Student[]> => {
    await delay(800);
    return Object.values(MOCK_USERS).filter(
      u => u.role === 'student' && (u as Student).mentorId === mentorId
    ) as Student[];
  },

  getLessons: async (): Promise<Lesson[]> => {
    await delay(500);
    return MOCK_LESSONS;
  },

  getSessionsByLesson: async (lessonId: string): Promise<Session[]> => {
    await delay(500);
    return MOCK_SESSIONS.filter(s => s.lessonId === lessonId);
  },

  getSessionDetail: async (sessionId: string): Promise<Session | null> => {
    await delay(300);
    return MOCK_SESSIONS.find(s => s.id === sessionId) || null;
  },

  createStudent: async (studentData: Partial<Student>): Promise<Student> => {
    await delay(1200);
    const newStudent: Student = {
      id: `student_${Date.now()}`,
      name: `${studentData.name}`,
      email: studentData.email || '',
      role: 'student',
      dob: studentData.dob || '',
      parentId: studentData.parentId,
      avatar: `https://ui-avatars.com/api/?name=${studentData.name}&background=random`,
    };
    // In-memory update for mock
    MOCK_USERS[newStudent.id] = newStudent;
    return newStudent;
  }
};
