import { useQuery, useMutation } from "react-query";
async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery(
    ["comments", post.id],
    () => fetchComments(post.id),
    {
      staleTime: 2000,
    }
  );

  const deletedPost = useMutation(() => deletePost(postId));

  if (isLoading) return <h1>Loading....</h1>;

  if (isError) {
    return (
      <>
        <h1>Something went wrong</h1>
        <p>{error.toString()}</p>
      </>
    );
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deletedPost.mutate(post.id)}>Delete</button>
      {deletedPost.isLoading && (
        <p style={{ color: "blue" }}>Deleting........</p>
      )}
      {deletedPost.isError && (
        <p style={{ color: "red" }}>Unable to delete........</p>
      )}
      {deletedPost.isSuccess && (
        <p style={{ color: "green" }}>Post deleted.......</p>
      )}
      <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
