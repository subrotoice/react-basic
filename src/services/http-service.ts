import apiClient, { CanceledError } from "./api-client";
// try to do some generic(common) approach
class HttpService {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  // Here is nothing about users
  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
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

export default new HttpService();
