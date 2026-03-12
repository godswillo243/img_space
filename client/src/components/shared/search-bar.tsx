import { LucideSearch } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

const SearchBar = () => {
  return (
    <div>
      <div className="max-w-md mx-auto flex items-center gap-1">
        <Input placeholder="Search..." className="flex-1 rounded-l-full" />
        <Button variant={"outline"} className="rounded-r-full">
          <LucideSearch className="size-5 max-sm:hidden" />
          Search
        </Button>
      </div>
      <ScrollArea></ScrollArea>
    </div>
  );
};

export default SearchBar;
