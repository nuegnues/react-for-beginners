import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  console.log(movie);
  return (
    <div className={styles.wrapper}>
      {loading ? (
        <h1 className={styles.loading}>Loading...</h1>
      ) : (
        <div
          className={styles.container}
          style={{ backgroundImage: `url(${movie.background_image})` }}
        >
          <img
            className={styles.movie_img}
            src={movie.large_cover_image}
            alt={movie.title}
          />
          <div className={styles.movie_info}>
            <div className={styles.movie_intro}>
              <h1 className={styles.movie_title}>{movie.title}</h1>
              <h3 className={styles.movie_year}>({movie.year})</h3>
            </div>
            <ul className={styles.movie_genres}>
              {movie.genres.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <h3 className={styles.movie_runtime}>
              {movie.runtime === 0
                ? `Runtime: unknown`
                : `Runtime: ${movie.runtime} min`}
            </h3>
            <h3 className={styles.movie_rating}>Rating: {movie.rating}/10</h3>
            <p className={styles.movie_description}>
              {movie.description_full.length > 1030
                ? `${movie.description_full.slice(0, 1030)}...`
                : movie.description_full}
            </p>
            <h3>
              <a href={movie.url}>
                <button className={styles.movie_moreinfo}>more info</button>
              </a>
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
export default Detail;
