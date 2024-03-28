import { createContext } from "react";

const Context = createContext({
  name: {},
  setName: () => {},
  selectedModel: {},
  setSelectedModel: () => {},
  prediction: {},
  setPrediction: () => {},
});
export default Context;
