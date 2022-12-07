import { createContext } from "react";
import { initialState } from "./state";

const PoolContext = createContext(initialState);

export { PoolContext };