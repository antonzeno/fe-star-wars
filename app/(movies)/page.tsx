'use client'

import MovieList from "@/components/movies/MovieList";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function MoviesPage() {
  return (
    <Provider store={store}>
      <MovieList />
    </Provider>
  );
}
