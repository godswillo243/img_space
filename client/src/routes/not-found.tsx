import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="p-6 w-full h-full flex flex-col  justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon"></EmptyMedia>
          <EmptyTitle>404</EmptyTitle>
          <EmptyDescription>Page not found</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link to={"/"}>
            <Button>Back to home</Button>
          </Link>
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default NotFound;
