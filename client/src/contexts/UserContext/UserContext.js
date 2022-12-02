import { createContext } from "react";
import { initialState } from "./state";

const UserContext = createContext(initialState);

export { UserContext };