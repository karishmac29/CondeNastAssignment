import Head from "next/head";
import Layout from "../../components/layout";
import { getNewsDetails } from "../../apis/news";
import Link from "next/link";

const NewsDetails = ({ news }) => {
  return (
    <Layout>
      {news && Object.keys(news).length > 0 ? (
        <>
          <Head>
            <title>{news.title}</title>
          </Head>
          <h1>{news.title}</h1>
          <img src={news.urlToImage}></img>
          <div>{news.author}</div>
          <div>
            <span>
              <span
                dangerouslySetInnerHTML={{
                  __html: news.description,
                }}
              ></span>
            </span>
            <span>
              <a href={news.url} target="_blank">
                Read more
              </a>
            </span>
          </div>
        </>
      ) : (
        <div>
          Oops! This news does not exist, please navigate to{" "}
          <Link href="/news">
            <a>home page</a>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export async function getServerSideProps({ params, req, res, query }) {
  let newsDetailRes = await getNewsDetails(params.title);
  let news = {};
  if (!newsDetailRes.articles.length) {
    news = {};
  } else {
    news = newsDetailRes.articles[0];
  }
  return {
    props: { news }, // will be passed to the page component as props
  };
}

export default NewsDetails;
