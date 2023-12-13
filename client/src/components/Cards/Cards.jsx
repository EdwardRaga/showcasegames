import React from "react";
import Card from "../Card/Card";

export default function Cards(props) {
  const { paginate } = props;

  return (
    <>
      {paginate?.map((game) => {
        const { id, name, background_image, genres } = game;
        return (
          <Card
            id={id}
            name={name}
            image={background_image}
            genres={genres}
            key={id}
          />
        );
      })}
    </>
  );
}
