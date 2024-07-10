import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Autocomplete,
  AutocompleteItem,
  Avatar
} from "@nextui-org/react";

import { getSession } from "@/lib/auth";
import { useState, useEffect } from "react";
import sendMessageAction from "./sendMessageAction";
import { useRouter } from "next/navigation";

interface CreateMessageModalProps {
  isOpen: boolean | undefined;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
}

interface User {
  id: number;
  first_name: string;
  username: string;
}

export default function CreateMessageModal({ isOpen, onOpenChange, onClose }: CreateMessageModalProps){

  const router = useRouter();
  const [ query, setQuery ] = useState("");
  const [ foundUsers, setFoundUsers ] = useState<User[]>([]);
  const [ message, setMessage ] = useState("");
  const [ recipientId, setRecipientId ] = useState<any>(null);
  const [ session, setSession ] = useState<any>(null);

  async function querySearch() {
    try {
      setFoundUsers([]);
      const res = await fetch(`http://localhost:3000/api/users/${session.userId}/search/${query}`);
      if (!res.ok) {
        throw new Error("Failed to fetch");
      };
      const data = await res.json()
      setFoundUsers(data);
    } catch (err: any) {
      throw new Error(err);
    };
  };

  async function fetchSession() {
    const data = await getSession();
    setSession(data);
  };

  const handleSend = async () => {
    const formData = {
      recipientId: recipientId,
      message: message
    }
    const sendMessageActionWithData = sendMessageAction.bind(null, formData);
    await sendMessageActionWithData();
    setMessage("");
    onClose();
    router.refresh();
  };

  useEffect(() => {
    fetchSession();
    if (query !== "") {
      querySearch();
    };
  }, [query]);

  return (
    <Modal hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange} placement="center" backdrop="blur" size="sm">
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl capitalize">Send a message</h2>
            <Autocomplete size="md" label="search users" items={foundUsers} inputValue={query} onInputChange={setQuery} selectedKey={recipientId} onSelectionChange={(key: any) => {setRecipientId(key)}} variant="bordered">

              {(user) => <AutocompleteItem key={user.id} textValue={user.username}>
                <div className="flex gap-2 items-center">
                  <Avatar className="flex-shrink-0" size="sm" />
                  <div className="flex flex-col">
                    <span className="text-small">{user.username}</span>
                    <span className="text-tiny text-default-400">{user.first_name}</span>
                  </div>
                </div>
              </AutocompleteItem>}

            </Autocomplete>
            <Textarea color="default" value={message} onChange={(e: any) => setMessage(e.target.value)} placeholder="Message body"></Textarea>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex items-center gap-4">
            <Button onPress={onClose} color="danger" size="md" variant="light">Cancel</Button>
            <Button onPress={handleSend} color="primary" size="md" variant="shadow">Send</Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
