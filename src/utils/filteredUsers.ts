import { User } from '../types/User';

interface SearchTerms {
  name: string;
  username: string;
  email: string;
  phone: string;
}

export const filteredUsers = (users: User[], searchTerms: SearchTerms): User[] => {
  return users.filter(user => {
    const { name, username, email, phone } = user;
    return (
      name.toLowerCase().includes(searchTerms.name.toLowerCase()) &&
      username.toLowerCase().includes(searchTerms.username.toLowerCase()) &&
      email.toLowerCase().includes(searchTerms.email.toLowerCase()) &&
      phone.toLowerCase().includes(searchTerms.phone))
    }
  );
};