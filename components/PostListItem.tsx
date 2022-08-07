import { Post } from "../typings";
import Link from "next/link";
import { urlFor } from "../sanity";

interface PostItemProps {
  post: Post;
}

function PostListItem({ post }: PostItemProps) {
  return (
    <Link href={`/post/${post.slug.current}`}>
      <div className="cursor-pointer group border rounded-lg overflow-hidden">
        {post.mainImage && (
          <img
            className="h-80 w-full object-fill group-hover:scale-105 transition-transform duration-200 ease-in-out"
            src={urlFor(post.mainImage).url()}
            alt={"IMG"}
          />
        )}
        <div className="text-center px-5 py-2.5 bg-white">
          <h1 className="md:text-xl text-center font-bold underline">
            {post.title}
          </h1>
        </div>
        <div className="text-center items-center flex justify-end p-3  space-x-3 bg-white">
          <p className="text-xs font-medium">By {post.author.name}</p>
          <img
            className="flex h-12 w-12 rounded-full object-center object-fill"
            src={urlFor(post.author.image).url()}
            alt={"author"}
          />
        </div>
      </div>
    </Link>
  );
}

export default PostListItem;
