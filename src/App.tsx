import { useEffect, useState } from "react";

import { api } from "./services/api";

import "./styles/global.scss";

import "./styles/sidebar.scss";
import "./styles/content.scss";

//precisamos importar os componentes novos
import SideBar from "./components/SideBar";
import Content from "./components/Content";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    //aqui a ideia e so tirar os blocos do return referentes ao sidebar e ao content e recolocar nos devidos lugares.
    //mas pra que isso possa ser feito e o negocio continue a funcionar, e preciso usar os props pra passar a informacao do app.tsx pros componentes novos.
    //por isso temos genres={genres}, por exemplo. Aqui eu estou passando o state genres pra dentro do componente Sidebar pra que ele continue sendo utilizado la.
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        genres={genres}
        handleClickButton={handleClickButton}
        selectedGenreId={selectedGenreId}
      />

      <Content selectedGenre={selectedGenre} movies={movies} />
    </div>
  );
}
