import { Input } from "@nextui-org/react";

interface UserFormProps {
  firstName: string,
  lastName: string,
  username: string,
  setFirstName: (e: string) => void;
  setLastName: (e: string) => void;
  setUsername: (e: string) => void;
}

export default function UserForm({ firstName, lastName, username, setFirstName, setLastName, setUsername }: UserFormProps) {
  return (
    <>
      <h1 className="text-4xl tracking-wide">Let’s start with<br/>your name</h1>
      <Input fullWidth size="lg" label="First name" isRequired value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <Input fullWidth size="lg" label="Last name" isRequired value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <Input className="mt-4" fullWidth size="lg" label="Username" isRequired value={username} onChange={(e) => setUsername(e.target.value)} />
    </>
  );
};
