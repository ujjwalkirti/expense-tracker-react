import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { account } from "../utils/Appwrite";
import UserContext from "../utils/contexts/UserContext";

function LoginBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);

  const toast = useToast();

  const handleClick = () => setShow(!show);

  const { updateUser } = useContext(UserContext);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const promise = account.createEmailSession(email, password);

    promise.then(
      function (response: any) {
        updateUser({
          name: response.name,
          email: response.email,
          id: response.$id,
        });
      },
      function (error: any) {
        toast({
          title: error.message,
          status: "error",
          isClosable: true,
        });
      }
    );
  };
  return (
    <VStack className="w-full sm:w-4/5 md:w-3/5 mx-auto">
      <form onClick={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel>Email address</FormLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button colorScheme="teal" type="submit">
          Submit
        </Button>
      </form>
    </VStack>
  );
}

export default LoginBox;
