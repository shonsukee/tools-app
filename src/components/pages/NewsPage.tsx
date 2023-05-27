import React, { useState } from "react";
import { Masonry } from "@mui/lab";
import { useLocation } from "react-router-dom";
import GenericTemplate from "../topsidebar/GenericTemplate";
import NewsList from "../newsApp/newsList";
import NewsDetail from "../newsApp/newsDetail";
import NewsSearch from "../newsApp/newsSearch";

function NewsPage() {
  const location = useLocation();
  const isDetailPage = location.search.includes("url=");
  const { search } = location;
  const params = new URLSearchParams(search);
  const title = params.get("title") || "";
  const image = params.get("image") || "";
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = (result) => {
    setSearchResult(result);
  };

  return (
    <GenericTemplate title="ニュースページ">
      {isDetailPage ? (
        <NewsDetail title={title} image={image} />
      ) : (
        <div>
          <NewsSearch onSearch={handleSearch} />
          {searchResult ? null : (
            <Masonry columns={4} spacing={2}>
              <NewsList />
            </Masonry>
          )}
        </div>
      )}
    </GenericTemplate>
  );
}

export default NewsPage;
