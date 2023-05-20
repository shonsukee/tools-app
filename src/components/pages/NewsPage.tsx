import { Masonry } from "@mui/lab";
import { useLocation } from "react-router-dom";
import GenericTemplate from "../topsidebar/GenericTemplate";
import NewsList from "../newsApp/newsList";
import NewsDetail from "../newsApp/newsDetail";

function NewsPage() {
  const location = useLocation();
  const isDetailPage = location.search.includes("url=");
  const { search } = location;
  const params = new URLSearchParams(search);
  const title = params.get("title") || "";
  const urlToImage = params.get("urlToImage") || "";

  return (
    <GenericTemplate title="ニュースページ">
      {isDetailPage ? (
        <NewsDetail title={title} urlToImage={urlToImage} />
      ) : (
        <Masonry columns={4} spacing={2}>
          <NewsList />
        </Masonry>
      )}
    </GenericTemplate>
  );
}

export default NewsPage;
