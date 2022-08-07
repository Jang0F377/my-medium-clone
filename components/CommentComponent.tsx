import { Comment } from "../typings";

interface CommentProps {
  comments: Array<Comment>;
}
interface RenderCommentProps {
  comment: Comment;
}

const CommentComponent = ({ comments }: CommentProps) => {
  const RenderComment = ({ comment }: RenderCommentProps) => {
    return (
      <div className="flex flex-row m-2 p-2 items-center space-x-5">
        <h2 className=" md:text-xl text-yellow-500">{comment.name}:</h2>
        <p className=" text-black text-base">{comment.comment}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col mx-2 mb-10 md:p-10 md:max-w-3xl md:mx-auto">
      {comments.map((comment) => (
        <RenderComment key={comment._createdAt} comment={comment} />
      ))}
    </div>
  );
};

export default CommentComponent;
