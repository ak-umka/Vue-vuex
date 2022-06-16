import axios from "@/api/axios";

const getArticle = slug => {
  return axios.get(`/articles/${slug}`).then(res => res.data.article);
}

export default {
  getArticle
}