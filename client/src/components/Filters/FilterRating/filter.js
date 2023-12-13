export default function filter(videogames, rating) {
  if (rating === "buttom") {
    for (let i = 0; i < videogames.length; i++) {
      for (let j = i + 1; j < videogames.length; j++) {
        if (videogames[j].rating < videogames[i].rating) {
          let aux = videogames[i];
          videogames[i] = videogames[j];
          videogames[j] = aux;
        }
      }
    }
    return videogames;
  } else {
    for (let i = 0; i < videogames.length; i++) {
      for (let j = i + 1; j < videogames.length; j++) {
        if (videogames[j].rating > videogames[i].rating) {
          let aux = videogames[i];
          videogames[i] = videogames[j];
          videogames[j] = aux;
        }
      }
    }
    return videogames;
  }
}
