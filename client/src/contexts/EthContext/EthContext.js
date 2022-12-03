import { createContext } from "react";
import { initialState } from "./state";

const EthContext = createContext(initialState);

export { EthContext };