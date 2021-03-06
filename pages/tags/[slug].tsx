import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { client } from "../../apolloClient";
import BlogCard from "../../components/cards/BlogCard";
import Head from "next/head";
import BlogCardLarge from "../../components/cards/BlogCardLarge";
import { WideAd } from "../../components/ads";
function TagPage({ tag }) {
  return (
    <main>
      <Head>
        <title>#{tag.slug} - Rohid</title>
      </Head>
      <div className="bg-gray-100 dark:bg-gray-800">
        <div className="container pt-24 pb-8">
          <h1 className="text-3xl font-bold">#{tag.slug}</h1>
        </div>
      </div>
      <div className="container flex flex-col gap-16 py-8">
        {tag.blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tag.blogs.map((blog) => (
              <BlogCardLarge blog={blog} key={blog.slug} />
            ))}
          </div>
        ) : (
          <p className="text-center">No content found with this tag 😥</p>
        )}
      </div>
      <div className="mt-16"></div>
      <WideAd />
    </main>
  );
}

export default TagPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { tags },
  } = await client.query({
    query: gql`
      query GetData {
        tags {
          slug
        }
      }
    `,
  });

  const paths = tags.map((tag) => ({
    params: {
      slug: tag.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query({
    query: gql`
      query GetData {
        tags (where: { slug: "${params.slug}" }){
          name
          slug
          backgroundColor {
            css
            rgba {
              r
              g
              b
              a
            }
          }
          foregroundColor {
            css
            rgba {
              r
              g
              b
              a
            }
          }
          blogs {
            title
            createdAt
            slug
            excerpt
            coverPhoto {
              url
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      tag: data.tags[0],
    },
  };
};
