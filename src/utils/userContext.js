import { createContext } from "react";

const UserContext = createContext({
  loggedInUser: "Default Anon",
});

export default UserContext;
