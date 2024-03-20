import { useRef } from "react";
import useAddPost from "./hooks/useAddPost";
import { Post } from "./hooks/usePosts";

interface AddPostContext {
  previousPosts: Post[];
}

const PostForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const addPost = useAddPost();

  return (
    <>
      {addPost.error && (
        <div className="alert alert-danger">{addPost.error.message}</div>
      )}
      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();

          if (ref.current && ref.current.value)
            addPost.mutate({
              id: 0,
              title: ref.current?.value,
              userId: 1,
            });
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button disabled={addPost.isLoading} className="btn btn-primary">
            {addPost.isLoading ? "Loading" : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default PostForm;
