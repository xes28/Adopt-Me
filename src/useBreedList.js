import { useState, useEffect } from "react";

//Sirve para que no se haga una petición extra si esta ya se ha realizado
//Ej: elegimos dog, después bird y luego otra vez dog, solo se harán dos peticiones en vez de tres
const localCache = {};

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("Unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }
    async function requestBreedList() {
      setBreedList([]);
      setStatus("Loading...");

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );

      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("Loaded");
    }
  }, [animal]);

  return [breedList, status];
}
