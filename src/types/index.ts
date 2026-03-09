export type UserRole = 'parent' | 'student' | 'mentor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Student extends User {
  role: 'student';
  dob: string;
  parentId?: string;
  mentorId?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon?: string;
  color?: string;
}

export interface Session {
  id: string;
  lessonId: string;
  topic: string;
  date: string;
  summary: string;
}
