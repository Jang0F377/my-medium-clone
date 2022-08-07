import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import { GetStaticProps } from "next";
import Header from "../../components/Header";
import PortableText from "react-portable-text";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import CommentComponent from "../../components/CommentComponent";

interface FormInputFields {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface SlugProps {
  post: Post;
}

function Post({ post }: SlugProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputFields>();

  const onSubmit: SubmitHandler<FormInputFields> = async (data) => {
    await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => setSubmitted(true))
      .then(() => {
        setValue("name", "");
        setValue("email", "");
        setValue("comment", "");
      })
      .catch((err) => {
        console.warn(err);
        setSubmitted(false);
      });
  };

  const AuthorBlock = () => {
    return (
      <div className="flex items-center ml-2 md:ml-0 space-x-3 ">
        <img
          className="h-10 w-10  rounded-full"
          src={urlFor(post.author.image).url()}
          alt={"author"}
        />
        <p className="font-extralight text-sm">
          Blog post by{" "}
          <span className="text-green-600">{post.author.name}</span> - Published
          at {new Date(post._createdAt).toLocaleDateString()}
        </p>
      </div>
    );
  };

  return (
    <main>
      <Header />
      <img
        className="rounded overflow-hidden w-10/12 mt-10 lg:mt-20 object-fill lg:w-4/12 mx-auto "
        src={urlFor(post.mainImage).url()}
        alt={"MAIN"}
      />
      <article className="p-10 my-10 max-w-lg md:max-w-3xl mx-auto">
        <h1 className="text-3xl mt-10 mb-3 text-center md:text-left">
          {post.title}
        </h1>
        <AuthorBlock />
        <div className="mt-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="text-xl font-bold my-5" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              normal: (props: any) => (
                <p className="indent-4 m-1.5 p-1.5" {...props} />
              ),
            }}
          />
        </div>
      </article>
      <hr className="max-w-xs sm:max-w-lg my-5 mx-auto border border-yellow-500" />
      {submitted ? (
        <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold">
            Thank you for submitting your comment.
          </h3>
          <p className="text-center">
            Once it has been approved, it will appear below!
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-10 my-10 max-w-md md:max-w-3xl mx-auto"
        >
          <h3 className="text-sm text-yellow-500">Enjoyed the article?</h3>
          <h4 className="text-3xl font-bold">Leave a comment below!</h4>
          <hr className="py-3 mt-2" />
          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
          />
          <label className="flex flex-col block mb-5">
            <span className="text-gray-700">Name</span>
            <input
              {...register("name", { required: true })}
              className="shadow border rounded py-2 px-3 mt-1 block focus:ring focus:ring-yellow-500"
              placeholder="Your name"
              type="text"
              autoComplete="given-name"
            />
          </label>
          <label className="flex flex-col block mb-5">
            <span className="text-gray-700">Email</span>
            <input
              {...register("email", { required: true })}
              placeholder="you@youremail.com"
              className="shadow border rounded py-2 px-3 mt-1 block focus:ring ring-yellow-500"
              type="email"
              autoComplete="email"
            />
          </label>
          <label className="flex flex-col block mb-5">
            <span className="text-gray-700">Comment</span>
            <textarea
              {...register("comment", { required: true })}
              rows={7}
              className="shadow border rounded py-2 px-3 mt-1 block focus:ring focus:ring-yellow-500"
            />
          </label>
          {/* ERRORS */}
          {/* WILL RETURN WHEN FIELD VALIDATION FAILS */}
          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-red-500">- The Name field is required</span>
            )}
            {errors.email && (
              <span className="text-red-500">
                - The Email field is required
              </span>
            )}
            {errors.comment && (
              <span className="text-red-500">
                - The Comment field is required
              </span>
            )}
          </div>
          <button
            type={"submit"}
            className="shadow text-white hover:text-black inline-block py-3 md:mt-4 bg-yellow-500 rounded-lg font-semibold md:mx-10 hover:ring-2 hover:ring-black"
          >
            Submit
          </button>
        </form>
      )}
      <div
        className={
          "flex flex-col mx-2 mb-10 border border-yellow-500 p-10 md:max-w-3xl md:mx-auto"
        }
      >
        <h3 className="text-4xl  text-center md:text-left">Comments</h3>
        <hr className=" my-5 border-yellow-500 " />
        {post.comments.length ? (
          <CommentComponent comments={post.comments} />
        ) : (
          <div
            className={
              "flex flex-col mx-2 mb-10 items-center p-10 md:max-w-3xl md:mx-auto"
            }
          >
            <h1 className="font-bold text-4xl text-center">Wooo-Hooo!</h1>
            <h1 className="font-bold text-4xl text-center">
              Be the first to leave a comment!
            </h1>
          </div>
        )}
      </div>
    </main>
  );
}

export default Post;

export async function getStaticPaths() {
  const query = `*[_type == "post"]{
  _id,
  slug {
  current
}
}`;
  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author -> {
            name,
            image
        },
        'comments': *[
  _type == "comment" &&
  post._ref == ^._id &&
  approved == true
],
        mainImage,
        slug,
        body,
    }`;

  const post = await sanityClient.fetch(query, { slug: params?.slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
    revalidate: 3600, // Update cache after 1 hour.
  };
};
