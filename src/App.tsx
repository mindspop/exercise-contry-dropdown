import { useEffect, useState } from "react";
import { Country } from "./types/api";
import { fetchCountries } from "./utils/fetch-countries";

import Select from "./Select";

function App() {
  const [isLoadingCountries, setIsLoadingCountries] = useState<boolean>(false);
  const [countriesLoadingError, setCountriesLoadingError] =
    useState<Error | null>(null);

  const [countries, setCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState<string>("");
  const [countryForDefaultValueCase, setCountryForDefaultValueCase] =
    useState<string>("");

  useEffect(() => {
    setIsLoadingCountries(true);
    fetchCountries()
      .then((countries) => {
        setCountries(Object.values(countries).map((country) => country));
      })
      .catch((e) => setCountriesLoadingError(e))
      .finally(() => {
        setIsLoadingCountries(false);
      });
  }, []);

  function getTip(country: string) {
    return country ? `I am going to ${country}!` : "Where will you go?";
  }

  return (
    <div className="demo">
      <div className="select-demo">
        <h1>Controlled select</h1>
        <Select
          label="Country:"
          value={country}
          helperText="Controlled select"
          placeholder="Please select one country"
          isLoadingOptions={isLoadingCountries}
          errorMessage={countriesLoadingError?.message}
          onChange={(v) => setCountry(v as string)}
        >
          {countries.map((c) => {
            return (
              <Select.Option
                isDisabled={c.name === "Anguilla"}
                key={c.name}
                value={c.name}
              >
                {c.name}
              </Select.Option>
            );
          })}
        </Select>
        <p>{getTip(country)}</p>
      </div>

      <div className="select-demo">
        <h1>Controlled select with default value</h1>
        <Select
          label="Country:"
          value={countryForDefaultValueCase}
          defaultValue="New Zealand"
          helperText="Controlled select with default value"
          placeholder="Please select one country"
          onChange={(v) => setCountryForDefaultValueCase(v as string)}
        >
          {countries.map((c) => {
            return (
              <Select.Option key={c.name} value={c.name}>
                {c.name}
              </Select.Option>
            );
          })}
        </Select>
        <p>{getTip(countryForDefaultValueCase)}</p>
      </div>

      <div className="select-demo">
        <h1>Uncontrolled select</h1>
        <Select
          label="Country:"
          helperText="Uncontrolled select"
          placeholder="Please select one country"
        >
          {countries.map((c) => {
            return (
              <Select.Option key={c.name} value={c.name}>
                {c.name}
              </Select.Option>
            );
          })}
        </Select>
      </div>

      <div className="select-demo">
        <h1>Uncontrolled select with default value</h1>
        <Select
          label="Country:"
          defaultValue="New Zealand"
          helperText="Uncontrolled select with default value"
          placeholder="Please select one country"
        >
          {countries.map((c) => {
            return (
              <Select.Option key={c.name} value={c.name}>
                {c.name}
              </Select.Option>
            );
          })}
        </Select>
      </div>

      <div className="select-demo">
        <h1>Disabled select</h1>
        <Select
          isDisabled
          label="Country:"
          defaultValue="New Zealand"
          helperText="Select is disabled"
          placeholder="Please select one country"
        >
          {countries.map((c) => {
            return (
              <Select.Option key={c.name} value={c.name}>
                {c.name}
              </Select.Option>
            );
          })}
        </Select>
      </div>

      <div className="select-demo">
        <h1>Select with error</h1>
        <Select
          errorMessage="Something went wrong"
          label="Country:"
          defaultValue="New Zealand"
          helperText="Select with error"
          placeholder="Please select one country"
        >
          {countries.map((c) => {
            return (
              <Select.Option key={c.name} value={c.name}>
                {c.name}
              </Select.Option>
            );
          })}
        </Select>
      </div>
      <style jsx>{`
        .demo {
          display: flex;
          padding: 100px;
          flex-direction: column;
          gap: 50px;
        }
      `}</style>
    </div>
  );
}

export default App;
