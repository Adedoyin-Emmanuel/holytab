import React from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (event: { key: string }) => {
    if (event.key === "Enter" && searchQuery.trim()) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  return (
    <input
      placeholder="SEARCH GOOGLE"
      className="mx-auto md:w-1/3 w-11/12 h-10 bg-transparent
          border-b border-[#A6A6A6] border-r-0 border-l-0 border-t-0
          outline-none focus:outline-none
          transition-all duration-300
          focus:border-b-2
          placeholder:text-gray-500 text-sm"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyPress={handleSearch}
    />
  );
};

export default Search;
