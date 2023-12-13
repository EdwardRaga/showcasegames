import style from "./Form.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPlaforms, getGenres, addGame } from "../../redux/action/action";
import validate from "./validate";
import Loading from "../Loading/Loading";

export default function Form() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const state = useSelector((state) => ({
    genres: state.genres,
    platforms: state.platforms,
  }));

  const [input, setInput] = useState({
    name: "",
    description: "",
    release: "",
    background_image: null,
    platforms: [],
    genres: [],
    rating: "",
    platformsName: [],
  });

  useEffect(() => {
    dispatch(getPlaforms());
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    setError(validate(input));
  }, [input]);

  const handleChange = (event) => {
    const { name, value, files, options } = event.target;

    if (name === "background_image") {
      setInput({
        ...input,
        background_image: files[0],
      });

      const imgShow = document.getElementById("selected-image");
      console.log(imgShow);
      const reader = new FileReader();

      reader.addEventListener("load", (event) => {
        console.log(event);
        imgShow.src = event.target.result;
      });

      reader.readAsDataURL(files[0]);
    } else if (name === "platforms") {
      const selectedValuesid = [];
      const selectedValuesname = [];

      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedValuesid.push(options[i].id);
          selectedValuesname.push(options[i].value);
        }
      }
      setInput({
        ...input,
        platforms: [...selectedValuesid],
        platformsName: [...selectedValuesname],
      });
    } else if (name === "genres") {
      const selectedValues = [];
      const checkboxes = document.getElementsByName("genres");
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          selectedValues.push(checkboxes[i].id);
        }
      }
      setInput({
        ...input,
        genres: [...selectedValues],
      });
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = new FormData();
    form.append("name", input.name);
    form.append("description", input.description);
    form.append("release", input.release);
    form.append("background_image", input.background_image);
    form.append("platforms", input.platforms);
    form.append("genres", [...input.genres]);
    form.append("rating", input.rating);
    console.log(form);

    if (Object.keys(error).length === 0) {
      //hacer el post
      setLoading(true);
      addGame(form).then((response) => {
        setLoading(false);
        setMessage(response?.data);

        //limpiar el formulario
        setInput({
          ...input,
          name: "",
          description: "",
          release: "",
          background_image: null,
          platforms: [],
          genres: [],
          rating: "",
          platformsName: [],
        });
      });
    }
  };
  return (
    <div className={style.wrapper}>
      {loading && <Loading />}
      {!loading && (
        <form
          onSubmit={handleSubmit}
          action="/videogames"
          method="post"
          encType="multipart/form-data"
        >
          {message && <p id={style.msg}>{message?.msg}</p>}
          <div className={style.name_wrapper}>
            <div className={style.name}>
              <label>Name*</label>
              <input
                onChange={handleChange}
                name={"name"}
                type="text"
                value={input.name}
                id={error?.name ? style.error : null}
              />
            </div>
            <div>{error && <p>{error?.name}</p>}</div>
          </div>

          <div className={style.background_image_wrapper}>
            <div className={style.background_image}>
              <label>Image*</label>
              <input
                title="Please select an image file"
                onChange={handleChange}
                accept="image/*"
                name={"background_image"}
                type="file"
              />
              <img id="selected-image" src="" />
            </div>
            <div>{error && <p>{error?.background_image}</p>}</div>
          </div>

          <div className={style.description}>
            <label>Description*</label>
            <textarea
              onChange={handleChange}
              name={"description"}
              type="text"
            />
            {error && error?.description}
          </div>

          <div className={style.container_genres}>
            <label>Genres*</label>
            <div className={style.genres}>
              {state?.genres.map((genre) => {
                return (
                  <label>
                    <input
                      name={"genres"}
                      onChange={handleChange}
                      id={genre.id}
                      type="checkbox"
                      value={genre.name}
                    />
                    {genre.name}
                  </label>
                );
              })}
            </div>
          </div>
          {error && <p className={style.error}>{error?.genres}</p>}

          <div className={style.release}>
            <label>Release*</label>
            <input onChange={handleChange} name={"release"} type="date" />
          </div>
          {error && <p className={style.error}>{error?.release}</p>}

          <div className={style.platforms}>
            <label>Platforms*</label>
            <select
              multiple
              id="platforms"
              name="platforms"
              onChange={handleChange}
              required
            >
              {state?.platforms.map((platform) => {
                return (
                  <option
                    id={platform.id}
                    key={platform.id}
                    value={platform.nombre}
                  >
                    {platform.name}
                  </option>
                );
              })}
            </select>
            <div className={style.platformsName}>
              {input.platformsName &&
                input.platformsName.map((platform) => {
                  return <p>{platform}</p>;
                })}
            </div>
          </div>
          <p className={style.error}>{error && error?.platforms}</p>

          <div className={style.rating}>
            <label>Rating*</label>
            <input
              onChange={handleChange}
              name={"rating"}
              type="number"
              min="0"
              max="5"
              required
            />
          </div>
          <p className={style.error}>{error && error?.rating}</p>

          <input type="submit" id={style.submit} value={"New Game +"} />
        </form>
      )}
    </div>
  );
}
