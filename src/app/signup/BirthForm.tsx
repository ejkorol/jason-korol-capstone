import { DateInput, TimeInput, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { personalityTypes } from "@/lib/data/mbtis";

interface Country {
  value: string;
  displayValue: string;
}

interface State {
  value: string;
  displayValue: string
}

interface City {
  value: string;
  displayValue: string;
}

interface BirthFormProps {
  dobDate: any;
  dobTime: any;
  countries: Country[];
  cities: City[];
  states: State[];
  countryCode: string;
  stateCode: string;
  city: string;
  mbti: string;
  setDobDate: (e: any) => void;
  setDobTime: (e: any) => void;
  setCountryCode: (e: any) => void;
  setStateCode: (e: any) => void;
  setCity: (e: any) => void;
  setMbti: (e: any) => void;
}

export default function BirthForm({ dobDate, dobTime, countries, states, cities, countryCode, stateCode, city, mbti, setDobDate, setDobTime, setCountryCode, setStateCode, setCity, setMbti }: BirthFormProps) {

  return (
    <>
      <h1 className="text-4xl tracking-wide">Let's get personal</h1>
      <h2 className="text-2xl tracking-wide font-light mt-4">We'll calculate your birth chart for you.</h2>
      <DateInput size="lg" label={"Birth date"} isRequired value={dobDate} onChange={(e) => { setDobDate(e) }} />
      <TimeInput fullWidth size="lg" label="Time of birth" isRequired value={dobTime} onChange={(e: any) => setDobTime(e)} />
      <Autocomplete autoComplete="off" size="lg" label="Select country" isRequired defaultItems={countries} selectedKey={countryCode ?? undefined} onSelectionChange={(key) => { setCountryCode(key) }}>
        {(country) => <AutocompleteItem key={country.value}>{country.displayValue}</AutocompleteItem>}
      </Autocomplete>
      <Autocomplete size="lg" autoComplete="off" label="Select state" isRequired defaultItems={states} selectedKey={stateCode ?? undefined} onSelectionChange={(key) => setStateCode(key)}>
        {(state) => <AutocompleteItem key={state.value}>{state.displayValue}</AutocompleteItem>}
      </Autocomplete>
      <Autocomplete size="lg" autoComplete="off" label="Select city" isRequired defaultItems={cities} selectedKey={city ?? undefined} onSelectionChange={setCity}>
        {(city) => <AutocompleteItem key={city.value}>{city.displayValue}</AutocompleteItem>}
      </Autocomplete>
      <Autocomplete size="lg" label="MBTI" isRequired defaultItems={personalityTypes} selectedKey={mbti ?? undefined} onSelectionChange={setMbti}>
        {(mbti) => <AutocompleteItem key={mbti.type}>{mbti.type}</AutocompleteItem>}
      </Autocomplete>
    </>
  );
};
