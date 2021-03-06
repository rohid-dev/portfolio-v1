import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import React from "react";
import Head from "next/head";
import { client } from "../apolloClient";
import RecentlyPublished from "../components/sections/RecentlyPublished";
import SideBarTagList from "../components/widgets/SidebarTagList";
import SideBarBlogList from "../components/widgets/SidebarBlogList";
import BlogCardSmall from "../components/cards/BlogCardSmall";
import { VarticalAd, WideAd } from "../components/ads";

const HomePage = ({ recentBlogs, popularBlogs, popularTags }) => {
  return (
    <main className="flex flex-col gap-20 md:gap-8 py-8 md:py-16">
      <Head>
        <title>Rohid</title>
        <meta
          name="description"
          content="Hi, I'm rohid. I'm a sowftware developer specializeing in building responsibe front-end website/web applications. I also love to do UI design with Figma. I also do unity 3d mobile game development."
        />
        <meta
          name="keywords"
          content="Rohid, Rohidul Islam, Rohidul, rohid.dev, Dev, Developer, Portfolio, Developer Portfolio, React Developer, Blog"
        />
      </Head>

      <div className="grid grid-cols-3 container gap-8">
        <div className="col-span-3 md:col-span-2">
          <RecentlyPublished blogs={recentBlogs} />
        </div>
        <div className="col-span-3 md:col-span-1 gap-16 flex flex-col">
          <SideBarTagList tags={popularTags} title="Popular Tags" />
          <SideBarBlogList blogs={popularBlogs} title="Popular Blogs" />
        </div>
      </div>
      <div className="mt-16"></div>
      <WideAd />
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const {
    data: { blogs: recentBlogs },
  } = await client.query({
    query: gql`
      query GetData {
        blogs(orderBy: createdAt_DESC, first: 10) {
          slug
          title
          excerpt
          createdAt
          updatedAt
          coverPhoto {
            url
          }
        }
      }
    `,
  });
  const {
    data: { tags: popularTags },
  } = await client.query({
    query: gql`
      query GetData {
        tags {
          slug
          name
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
        }
      }
    `,
  });

  const {
    data: { blogs: popularBlogs },
  } = await client.query({
    query: gql`
      query GetData {
        blogs(orderBy: updatedAt_DESC, where: { isPopular: true }, first: 4) {
          slug
          title
          excerpt
          createdAt
          updatedAt
          coverPhoto {
            url
          }
        }
      }
    `,
  });

  return {
    props: {
      recentBlogs,
      popularBlogs,
      popularTags,
    },
  };
};

export default HomePage;
