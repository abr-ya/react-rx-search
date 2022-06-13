import { useEffect, useState } from "react";
import { from } from "rxjs";
import { map, filter } from "rxjs/operators";

const numbersObservable = from([1, 2, 3, 5]);
const squareNumbers = numbersObservable.pipe(map((val) => val * val));

const App = (): JSX.Element => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const subscription = squareNumbers.subscribe((res) => {
      console.log(res);
      setCurrent(res);
    });

    return () => {
      if (subscription?.unsubscribe) subscription.unsubscribe();
    };
  }, []);

  return (
    <main>
      <h1>Hello, React + RxJS!</h1>
      <p>{`Current number is: ${current}`}</p>
    </main>
  );
};

export default App;
