import { User } from '../types/user';

export const generateUsers = (count: number): User[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `Пользователь ${i + 1}`,
        department: `Отдел ${i % 10 + 1}`,
        company: `Компания ${i % 5 + 1}`,
        jobTitle: `Должность ${i % 3 + 1}`,
    }));
};