import axios from "axios";
import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface FetchPostResponse {
  total: number;
  posts: Post[];
}

const useFetch = (url: string) => {
  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get<FetchPostResponse>(url)
      .then((res) => {
        // console.log(res.data.posts);
        setData(res.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);
  return { data, error, isLoading };
};

export default useFetch;
