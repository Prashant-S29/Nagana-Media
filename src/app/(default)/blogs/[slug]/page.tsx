import Image from "next/image";
import { notFound } from "next/navigation";

// types
import type { Metadata } from "next";

// styles
import markdownStyles from "~/styles/markdown-styles.module.css";

// utils
import { getAllPosts, getPostBySlug } from "~/utils/api";
import markdownToHtml from "~/utils/markdownToHtml";
import { generateSeo } from "~/utils/generateSeo";

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return generateSeo({
    title: `${post.title} | Blogs`,
    description: `A blog by ${post.author.name}`,
    url: "/blogs",
    image: post.ogImage.url,
  });
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

const Post: React.FC<Params> = async ({ params }) => {
  const slug = (await params).slug;
  const post = getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <>
      <div
        data-container
        className="flex h-[60vh] w-full items-center justify-center bg-gradient-to-r from-[#0c1323] to-[#1e2f45]"
      >
        <h1 className="mt-5 text-[40px] font-bold leading-none text-white lg:text-center lg:text-[50px] xl:text-[60px]">
          {post.title}
        </h1>
      </div>
      <article data-container className="mt-10">
        <Image
          src={post.coverImage}
          alt={post.title}
          width={1200}
          height={600}
          className="rounded-xl"
        />

        <div
          className={markdownStyles.markdown}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </>
  );
};

export default Post;
