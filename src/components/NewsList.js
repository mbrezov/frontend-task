import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { SearchContext } from "../context/SearchContextProvider";
import ArticleCards from "./ArticleCard";
import LatestNews from "./LatestNews";
import "./NewsList.scss";

const NewsList = (props) => {
  const [news, setNews] = useState([]);
  const [section, setSection] = useState("home");
  const { articleSearch } = useContext(SearchContext);
  const apikey = "cggBDj3EwtAQatE8Y47R6YLGF3f5hACT";

  useEffect(() => {
    setSection(props.category);
  }, [props.category]);

  useEffect(() => {
    axios
      .get(
        `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apikey}`
      )
      .then((results) => {
        const fetchedData = results.data.results;
        setNews(fetchedData);
      });
  }, [section]);

  return (
    <div className="newslist-container">
      <div className="newslist-desktop-nav">
        <NavLink to="/Home" className="all-news">
          News
        </NavLink>
        <NavLink to="/favorites" className="fav">
          Favorites
        </NavLink>
      </div>
      <div className="newslist-mobile-nav">
        <NavLink to="/Home" className="fav">
          Featured
        </NavLink>
        <NavLink to="/latest news" className="fav">
          Latest
        </NavLink>
      </div>
      <div className="news">
        <div className="latest-widget">
          <LatestNews />
        </div>
        {Object.entries(news).map(([key, article]) =>
          article.multimedia &&
          article.multimedia.length &&
          article.title.length > 0 &&
          article.title.toLowerCase().includes(articleSearch) ? (
            <ArticleCards
              key={key}
              img={article.multimedia[0].url}
              category={section === "home" ? article.section : section}
              title={article.title}
              author={article.byline}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default NewsList;
