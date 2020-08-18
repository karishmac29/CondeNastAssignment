import styles from "../styles/news.module.scss";
import Link from "next/link";

const NewsCard = ({ data }) => {
  return (
    <a href={data.url} target="_blank">
      <div className={styles.card}>
        <img src={`${data.urlToImage}`} />
        <div>{data.title}</div>
      </div>
    </a>
  );
};

export default NewsCard;
