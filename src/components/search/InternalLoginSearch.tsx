import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  onSearch: (value: string) => void;
}

const InternalLoginSearch: React.FC<Props> = ({ onSearch }) => {
  const [input, setInput] = useState("");

  // Live search effect (on typing)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(input);
    }, 1000); // Debounce to avoid too frequent calls

    return () => clearTimeout(delayDebounce);
  }, [input, onSearch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    onSearch(input); // Also trigger on enter or button click
  };

  return (
    <div className=" flex sm:justify-end justify-start  p-4">
      <form
        onSubmit={handleSubmit}
        className="flex px-3 bg-white border-2 items-center gap-2 rounded-2xl sm:w-60 w-full justify-between"
      >
        <input
          type="text"
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 outline-none rounded-l-2xl"
        />

        <SearchIcon type="submit" className="bg-gray-50 rounded-full" />
      </form>
    </div>
  );
};

export default InternalLoginSearch;
