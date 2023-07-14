import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import GenericTemplate from "../topsidebar/GenericTemplate";
import NewsList from "../newsApp/newsList";
import NewsDetail from "../newsApp/newsDetail";
import NewsSearch from "../newsApp/newsSearch";
import { Bars } from "react-loader-spinner";

function NewsPage() {
  const location = useLocation();
  const isDetailPage = location.search.includes("url=");
  const { search } = location;
  const params = new URLSearchParams(search);
  const title = params.get("title") || "";
  const image = params.get("image") || "";
  const [searchResult, setSearchResult] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  const handleSearch = (result) => {
    setSearchResult(result);
    setIsSearch(true);
    console.log("isSearch");
  };

  return (
    <GenericTemplate title="News">
      {isDetailPage ? (
        <NewsDetail title={title} image={image} />
      ) : (
        <div>
          <NewsSearch onSearch={handleSearch} />
          {isSearch ? null : searchResult ? (
            <Bars
              height="80"
              width="80"
              color="#"
              ariaLabel="bars-loading"
              wrapperClass="#C0C0C0"
              visible={true}
            />
          ) : (
            <NewsList />
          )}
        </div>
      )}
    </GenericTemplate>
  );
}

export default NewsPage;
