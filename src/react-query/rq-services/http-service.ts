import apiClient from "./api-client";

class HTTPService<T> {
  endPoint: string;

  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  getAll = () => {
    return apiClient.get<T[]>(this.endPoint).then((res) => res.data);
  };

  post = (newData: T) => {
    return apiClient.post<T>(this.endPoint, newData).then((res) => res.data);
  };
}

// export default new HttpService(); Instade of we can use this
const create = <T>(endPoint: string) => new HTTPService<T>(endPoint);
export default create;
