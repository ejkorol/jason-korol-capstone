import { useMemo } from "react";
import { Input } from "@nextui-org/react";

interface CredentialsFormProps {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
  setEmail: (e: string) => void;
  setPassword: (e: string) => void;
  setConfirmPassword: (e: string) => void;
};

export default function CredentialsForm({firstName, email, password, confirmPassword, setEmail, setPassword, setConfirmPassword}: CredentialsFormProps) {

  const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const validatePassword = (value: string) => value.length >= 8;

  const isEmailInvalid = useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]); 

  const isPasswordInvalid = useMemo(() => {
    if (password === "") return false;
    return validatePassword(password) ? false : true;
  }, [password]);

  const isConfirmPasswordInvalid = useMemo(() => {
    if (confirmPassword === "") return false;
    return password === confirmPassword ? false : true;
  }, [password, confirmPassword]);

  return (
    <>
      <h1 className="text-4xl tracking-wide">You're doing great,<br/>{firstName}</h1>
      <h2 className="text-2xl tracking-wide font-light mt-4">We'll need your email so you can log back in</h2>
      <Input fullWidth size="lg" label="Email" type="email" isInvalid={isEmailInvalid} color={isEmailInvalid ? "danger" : "default"} errorMessage="Please enter a valid email" isRequired value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input className="mt-4" type="password" fullWidth size="lg" isInvalid={isPasswordInvalid} color={isPasswordInvalid ? "danger": "default"} label="Password" isRequired errorMessage="Password must be at least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input fullWidth size="lg" type="password" label="Confirm Password" isRequired isInvalid={isConfirmPasswordInvalid} color={isConfirmPasswordInvalid ? "danger" : "default"} value={confirmPassword} errorMessage="Passwords do not match" onChange={(e) => setConfirmPassword(e.target.value)} />
    </>
  );
};
