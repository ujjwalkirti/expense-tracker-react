import { User } from "my-module";
import { createContext } from "react";

interface UserContextProps {
  user: User | null;
  updateUser: (userData: User | null) => void;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  updateUser: () => {},
});

export default UserContext;
