import SearchBar from "@/components/shared/search-bar";
import { ScrollArea } from "@/components/ui/scroll-area";

const Search = () => {
  return (
    <div className="relative w-full h-fit">
      <SearchBar />
      <ScrollArea></ScrollArea>
    </div>
  );
};

export default Search;
