import create from "./http-service";

// just add export to use multiple place
export interface User {
  id: number;
  name: string;
}

export default create("/users"); // Only place to provide endpoint
