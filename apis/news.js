import axios from "axios";

const URL = "http://newsapi.org/v2/";

export const getSearchNewsRes = async (q, page, pageSize) => {
  q = q || "";
  page = page || 1;
  pageSize = pageSize || 20;
  let res = q
    ? await axios
        .get(`${URL}everything?q=${encodeURI(q)}&page=${page}&pageSize=${pageSize}`, {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        })
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          console.log("Err: ", err);
          return { status: "error", code: "maximumResultsReached", articles: [], totalResults: 0 };
        })
    : getTopUKNews(page, pageSize);
  return res;
};

export const getTopUKNews = async (page, pageSize) => {
  const data = await axios
    .get(`${URL}top-headlines?country=gb&apiKey=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}&pageSize=${pageSize}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log("Err: ", err);
      return { articles: [], totalResults: 0 };
    });
  return data;
};
