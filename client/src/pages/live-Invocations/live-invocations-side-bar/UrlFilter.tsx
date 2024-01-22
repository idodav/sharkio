import { TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { searchParamFilters } from "./LiveInvocationsSideBar";

const UrlFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSearch = (url: string) => {
    setSearchParams((prev) => {
      const newSearchParams = new URLSearchParams(prev);
      newSearchParams.set(searchParamFilters.url, url);
      return newSearchParams;
    });
  };

  return (
    <TextField
      label="URL"
      variant="outlined"
      size="small"
      onChange={(e) => handleSearch(e.target.value)}
      value={searchParams.get(searchParamFilters.url)}
    />
  );
};

export default UrlFilter;
