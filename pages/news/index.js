import Head from "next/head";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { getSearchNewsRes } from "../../apis/news";
import Layout from "../../components/layout";
import NewsCard from "../../components/newsCard";

class NewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: props.articles,
      pageSize: 20,
      page: 1,
      hasMore: true,
      q: "",
    };
  }

  loadMore = async () => {
    const { pageSize, type, articles, page, q } = this.state;
    const data = await getSearchNewsRes(q, page + 1, pageSize);
    if (data.status === "error" && data.code === "maximumResultsReached") {
      this.setState({
        hasMore: false,
      });
    } else {
      this.setState({
        articles: [...articles, ...data.articles],
        page: page + 1,
        load: true,
        hasMore: data.totalResults - [...articles, ...data.articles].length,
      });
    }
  };

  updateArticles = async () => {
    const { q, page, pageSize } = this.state;
    const NewsRes = await getSearchNewsRes(q, page, pageSize);
    if (NewsRes.status === "error" && NewsRes.code === "maximumResultsReached") {
      this.setState({
        hasMore: false,
      });
    } else {
      const { articles, totalResults } = NewsRes;
      this.setState({ articles });
    }
  };

  searchNews = (e) => {
    console.log("yoloooooooooo");
    this.setState(
      {
        q: e.target.value,
        page: 1,
        hasMore: true,
      },
      () => {
        this.updateArticles();
      }
    );
  };

  render() {
    const { articles, hasMore, page } = this.state;
    return (
      <Layout home>
        <Head>
          <title>News</title>
        </Head>
        <div className="search-container">
          <span>Search: </span>
          <input type="text" onInput={this.searchNews} />
        </div>

        {articles.length > 0 ? (
          <InfiniteScroll
            dataLength={articles.length}
            next={() => {
              this.loadMore();
            }}
            hasMore={hasMore}
            loader={<span>Loading..</span>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {articles.map((article, id) => {
              return <NewsCard key={`article-${id}`} data={article} />;
            })}
          </InfiniteScroll>
        ) : (
          <div>No News published by the selected Publisher!</div>
        )}
      </Layout>
    );
  }
}

export async function getServerSideProps({ params, req, res, query }) {
  const NewsRes = await getSearchNewsRes();
  const { articles, totalResults } = NewsRes;
  return {
    props: {
      articles,
      totalResults,
    },
  };
}

export default NewsList;
