import { IPokemon } from "interfaces";
import { useEffect, useState, ChangeEvent } from "react";
import { from, BehaviorSubject } from "rxjs";
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  mergeMap,
} from "rxjs/operators";
import { searchAndFilter } from "./services/api";

const searchSubject = new BehaviorSubject("");
const searchResultObservable = searchSubject.pipe(
  filter((val) => val.length > 2),
  debounceTime(750),
  distinctUntilChanged(),
  mergeMap((val) => from(searchAndFilter(val))),
);

const useObservable = (observable, handler) => {
  useEffect(() => {
    const subscription = observable.subscribe((res: any) => {
      handler(res);
    });

    return () => {
      if (subscription?.unsubscribe) subscription.unsubscribe();
    };
  }, [observable, handler]);
};

const App = (): JSX.Element => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<IPokemon[]>([]);

  useObservable(searchResultObservable, setData);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearch(newValue);
    searchSubject.next(newValue);
  };

  return (
    <main>
      <h1>React + RxJS + PokeAPI</h1>
      <h3>about</h3>
      <p>
        Примитивное приложение, которое запускает поиск как результат наблюдения
        за изменением инпута с задержкой 750 ms. Обрабатываются поисковые
        запросы от 3х символов. Фильтр результатов на стороне клиента.
      </p>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={searchHandler}
      />
      <ul>
        {data.map((pokemon: IPokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
      <h3>raw data</h3>
      <div>{JSON.stringify(data, null, 2)}</div>
    </main>
  );
};

export default App;
