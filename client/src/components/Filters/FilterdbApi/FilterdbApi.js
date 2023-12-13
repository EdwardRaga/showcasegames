function filter(videogames, type) {
  if (Array.isArray(videogames)) {
    if (videogames) {
      if (type === "database") {
        return videogames.filter((game) => typeof game.id !== "number");
      } else if (type === "api") {
        return videogames.filter((game) => typeof game.id === "number");
      }
    }
  }
  return "allgames";
}

export default filter;
