import { User, Student, Lesson, Session } from '../types';

export const MOCK_USERS: { [key: string]: User | Student } = {
  'parent1': {
    id: 'parent1',
    name: 'John Doe',
    email: 'parent@mentora.com',
    role: 'parent',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=4F46E5&color=fff',
  },
  'student1': {
    id: 'student1',
    name: 'Alice Doe',
    email: 'alice@mentora.com',
    role: 'student',
    dob: '2015-05-20',
    parentId: 'parent1',
    avatar: 'https://ui-avatars.com/api/?name=Alice+Doe&background=10B981&color=fff',
  },
  'student2': {
    id: 'student2',
    name: 'Bob Smith',
    email: 'bob@mentora.com',
    role: 'student',
    dob: '2014-11-12',
    mentorId: 'mentor1',
    avatar: 'https://ui-avatars.com/api/?name=Bob+Smith&background=F59E0B&color=fff',
  },
  'mentor1': {
    id: 'mentor1',
    name: 'Sarah Coach',
    email: 'mentor@mentora.com',
    role: 'mentor',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Coach&background=F43F5E&color=fff',
  }
};

export const MOCK_LESSONS: Lesson[] = [
  {
    id: 'l1',
    title: 'Mathematics',
    description: 'Master the logic of numbers and patterns.',
    color: '#3B82F6',
  },
  {
    id: 'l2',
    title: 'Physics',
    description: 'Explore the laws of nature and the universe.',
    color: '#EF4444',
  },
  {
    id: 'l3',
    title: 'English',
    description: 'Enhance your communication and literature skills.',
    color: '#10B981',
  }
];

export const MOCK_SESSIONS: Session[] = [
  {
    id: 's1',
    lessonId: 'l1',
    topic: 'Algebra Basics',
    date: 'March 15, 2024',
    summary: 'Introduction to variables, equations, and solving for X. We covered basic operations and simple linear equations.'
  },
  {
    id: 's2',
    lessonId: 'l1',
    topic: 'Geometry Fun',
    date: 'March 22, 2024',
    summary: 'Exploring shapes, angles, and area calculations. Students worked on designing a playground using geometric principles.'
  },
  {
    id: 's3',
    lessonId: 'l2',
    topic: 'Newton\'s Laws',
    date: 'March 18, 2024',
    summary: 'Understanding inertia, acceleration, and action-reaction. Conducted simple experiments with toy cars.'
  }
];
