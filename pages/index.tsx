import Head from "next/head";
import Header from "../components/Header";
import LandingImage from "../components/LandingImage";
import { sanityClient } from "../sanity";
import { Post } from "../typings";
import PostListItem from "../components/PostListItem";

interface Props {
  posts: Array<Post>;
}

function Home({ posts }: Props) {
  return (
    <div className="font-serif">
      <Head>
        <title>My Medium Clone</title>
        <meta name="description" content="My interpreted Medium clone build" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <LandingImage />
      <h1 className="text-5xl py-2 mt-6 mb-5 text-center lg:text-6xl outline-yellow-500 underline">
        Recent Posts
      </h1>
      <div className="max-w-7xl mx-5 md:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post) => (
          <PostListItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;

export async function getServerSideProps() {
  const query = `*[_type == "post"]{
  _id,
  title,
  author -> {
  name,
  image
},
mainImage,
slug
}`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
}
