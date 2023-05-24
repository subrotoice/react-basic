import apiClient, { CanceledError } from "./api-client";

// just add export to use multiple place
export interface User {
  id: number;
  name: string;
}
// It contains all methods for creating, Updateing, deleting user, so that App.js not not to warry abut data and can foucs on Markup and UI
class UserService {
  getAllUsers() {
    const controller = new AbortController();
    // returning Promise, Storing another variable because need to return two values as abject
    const request = apiClient.get<User[]>("/users", {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() }; // returning two values
  }

  deleteUser(id: number) {
    return apiClient.delete("users/" + id);
  }

  createUser(user: User) {
    return apiClient.post("users", user);
  }

  updateUser(user: User) {
    return apiClient.patch("/users/" + user.id, user);
  }
}

export default new UserService();
