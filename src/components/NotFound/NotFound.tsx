import React from "react";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div className="flex flex-col min-h-[70vh] w-full justify-center items-center gap-12">
       <div className="flex flex-col items-center justify-center text-center">
        <p className="text-3xl font-semibold text-secondary-foreground">
            Nothing to see here
        </p>
        </div> 
    </div>
  );
};

export default NotFound;
