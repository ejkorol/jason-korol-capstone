import { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';

interface Country {
  value: string,
  displayValue: string,
}

interface City {
  value: string,
  displayValue: string
}

interface State {
  value: string,
  displayValue: string
}

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  
  useEffect(() => {
    const countryData = Country.getAllCountries().map(country => ({
      value: country.isoCode,
      displayValue: country.name,
    }));
    setCountries(countryData);
  }, []);
  
  return countries;
};

export const useStates = (countryCode: string) => {
  const [states, setStates] = useState<State[]>([]);
  
  useEffect(() => {
    if (!countryCode) return;
    const stateData = State.getStatesOfCountry(countryCode).map(state => ({
      value: state.isoCode,
      displayValue: state.name,
    }));
    setStates(stateData);
  }, [countryCode]);
  
  return states;
};

export const useCities = (countryCode: string, stateCode: string) => {
  const [cities, setCities] = useState<City[]>([]);
  
  useEffect(() => {
    if (!countryCode || !stateCode) return;
    const cityData = City.getCitiesOfState(countryCode, stateCode).map(city => ({
      value: city.name,
      displayValue: city.name,
    }));
    setCities(cityData);
  }, [countryCode, stateCode]);
  
  return cities;
};
