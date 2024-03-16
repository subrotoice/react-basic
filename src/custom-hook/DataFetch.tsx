import useFetch from "./useFetch";

const DataFetch = () => {
  const url = "https://dummyjson.com/posts";
  const { data, error, isLoading } = useFetch(url);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Data</h1>
      {data.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
};

export default DataFetch;
