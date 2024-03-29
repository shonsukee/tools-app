import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchTemplate({ isPhone }) {
  const navigate = useNavigate();
  const location = useLocation();

  const urlToValue = {
    "/home": 0,
    "/products": 1,
    "/news": 2,
  };
  const value = urlToValue[location.pathname] || 0;

  const handleNavigation = (url) => {
    navigate(url);
  };

  if (isPhone) {
    return (
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={2}
      >
        <BottomNavigation showLabels value={value}>
          <BottomNavigationAction
            label="Bookmark"
            icon={<BookmarkIcon />}
            value={0}
            onClick={() => handleNavigation("/home")}
          />
          <BottomNavigationAction
            label="News"
            icon={<NewspaperIcon />}
            value={2}
            onClick={() => handleNavigation("/news")}
          />
        </BottomNavigation>
      </Paper>
    );
  }
  return null;
}
