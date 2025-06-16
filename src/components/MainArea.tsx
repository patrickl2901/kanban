import React, { FC } from "react";

type MainAreaProps = {
  title: string;
};

const MainArea: FC<MainAreaProps> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default MainArea;
