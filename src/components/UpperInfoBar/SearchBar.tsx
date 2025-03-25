import React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Input } from "../ui/normalInput";

type Props = {};

const SearchBar = (props: Props) => {
  return (
    <div className="min-w-[60%] w-fit relative flex items-center border rounded-full bg-primary-90">
      <Button
        type="submit"
        size={"sm"}
        variant={"ghost"}
        className="absolute left-0 h-full rounded-l-none bg-transparent hover:bg-transparent"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
      <div className="w-full">
        <Input
          type="text"
          placeholder="Search by Title"
          className="flex-grow bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 ml-8"
        />
      </div>
    </div>
  );
};

export default SearchBar;
