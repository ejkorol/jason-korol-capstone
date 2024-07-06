"use client";
import { useState } from "react";
import { useCountries, useStates, useCities } from "@/utils/hooks/useLocations";

import signupAction from "./signupAction";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import UserForm from "@/app/signup/UserForm";
import CredentialsForm from "@/app/signup/CredentialsForm";
import BirthForm from "@/app/signup/BirthForm";

export default function Signup() {

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");


  const [dobDate, setDobDate] = useState<any>(null);
  const [dobTime, setDobTime] = useState<any>("");
  const [mbti, setMbti] = useState<string>("");

  const [city, setCity] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [stateCode, setStateCode] = useState<string>("");
  const countries = useCountries();
  const states = useStates(countryCode);
  const cities = useCities(countryCode, stateCode);

  const validateUserForm = () => {
    return firstName !== "" && lastName !== "" && username !== "";
  };

  const validateCredentialsForm = () => {
    return email !== "" && password !== "" && confirmPassword !== "" && password === confirmPassword;
  };

  const validateBirthForm = () => {
    return dobDate !== null && dobTime !== null && city !== "" && countryCode !== "" && stateCode !== "" && mbti !== "";
  };

  const handleNavigation = () => {
    if (currentPage === 1 && !validateUserForm()) {
      return;
    };
    if (currentPage === 2 && !validateCredentialsForm()) {
      return;
    };
    if (currentPage === 3 && !validateBirthForm()) {
      return;
    };
    setCurrentPage((prev) => (prev < 3 ? prev + 1 : prev));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!validateUserForm() || !validateCredentialsForm() || !validateBirthForm()) {
      return;
    };

    const formData = {
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
      dobDate: `${dobDate.year}-${dobDate.month.toString().padStart(2, '0')}-${dobDate.day.toString().padStart(2, '0')}`,
      dobTime: `${dobTime.hour.toString().padStart(2, '0')}:${dobTime.minute.toString().padStart(2, '0')}:${dobTime.second.toString().padStart(2, '0')}:${dobTime.millisecond.toString().padStart(2, '0')}`,
      mbti: mbti.toLowerCase(),
      dobLocation: `${city}%${countryCode}%${stateCode}`,
    };
    const signupActionWithData = signupAction.bind(null, formData);
    await signupActionWithData();

  };

  return (
    <section className="flex flex-col h-screen w-screen justify-center">
      <form onSubmit={handleSubmit}>
        <div className="p-6 flex flex-col gap-4">
        {currentPage === 1 &&
            <UserForm {...{ firstName, lastName, username, setFirstName, setLastName, setUsername }} />
          }
        {currentPage === 2 &&
            <CredentialsForm {...{ firstName, email, password, confirmPassword, setEmail, setPassword, setConfirmPassword }} />
          }
        {currentPage === 3 &&
            <BirthForm {...{ dobDate, dobTime, countries, states, cities, countryCode, stateCode, city, mbti, setDobDate, setDobTime, setCountryCode, setStateCode, setCity, setMbti }}/>
          }
        </div>
        <div className="flex gap-2 justify-between p-6">
          <Button
            className="text-neutral-300"
            size="lg"
            isIconOnly={currentPage !== 1 ? true : false}
            variant="light"
            onPress={ currentPage === 1 ? () => router.push("/") : () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
          >
            {currentPage === 1 && (
              "Go back"
            )}
            {currentPage !== 1 && (
              "<--"
            )}
          </Button>
          <Button
            size="lg"
            variant="light"
            type={currentPage === 3 ? "submit" : "button"}
            onPress={currentPage < 3 ? handleNavigation : undefined}
          >
            {currentPage === 1 && "Let's continue -->"}
            {currentPage === 2 && "Almost Done -->"}
            {currentPage === 3 && "Start Dreaming -->"}
          </Button>
        </div>
      </form>
    </section>
  );
};
