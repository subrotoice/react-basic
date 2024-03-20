import { useMutation, useQueryClient } from "@tanstack/react-query";
import postService, { Post } from "../rq-services/postService";

interface AddPostContext {
  previousPosts: Post[];
}

const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation<Post, Error, Post, AddPostContext>({
    mutationFn: postService.post,

    onMutate(newPost: Post) {
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]) || [];
      queryClient.setQueryData<Post[]>(["posts"], (posts) => [
        newPost,
        ...(posts || []),
      ]);
      return { previousPosts };
    },

    onSuccess: (savedPost, newPost) => {
      console.log(savedPost);
      queryClient.setQueryData<Post[]>(["posts"], (posts) =>
        posts?.map((post) => (post.id == newPost.id ? savedPost : post))
      );
    },

    onError: (error, newPost, context) => {
      if (!context) return;

      queryClient.setQueryData(["posts"], context.previousPosts);
    },
  });
};

export default useAddPost;
