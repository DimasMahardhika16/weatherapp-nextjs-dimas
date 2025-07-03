"use client";

import styles from "../Weather/Weatherapp.module.css";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  handleSearch: () => void;
};

export default function Search({ search, setSearch, handleSearch }: Props) {
  return (
    <div className={styles.searchEngine}>
      <input
        type="text"
        placeholder="Enter city name"
        name="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button onClick={handleSearch}>Search Weather</button>
    </div>
  );
}
