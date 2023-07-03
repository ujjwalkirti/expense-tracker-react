import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { databases } from "../utils/Appwrite";
import { ID } from "appwrite";

const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const APPWRITE_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

function CurrentMonthBox() {
  const title = React.useRef<HTMLInputElement | null>(null);
  const amount = React.useRef<HTMLInputElement | null>(null);
  const type = React.useRef<HTMLSelectElement | null>(null);
  const monthRef = React.useRef<HTMLSelectElement | null>(null);
  const description = React.useRef<HTMLTextAreaElement | null>(null);
  const [currentMonth, setCurrentMonth] = React.useState<string>();

  React.useEffect(() => {
    const currentDate = new Date();
    setCurrentMonth(months[currentDate.getMonth()]);
  }, []);

  const toast = useToast();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      name: title.current?.value,
      amount: amount.current?.value,
      type: type.current?.value,
      month: monthRef.current?.value,
      description: description.current?.value,
    };
    const promise = databases.createDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      ID.unique(),
      data
    );

    promise.then(
      function (response: any) {
        toast({
          title: `expense added to the list of spendings`,
          status: "success",
          isClosable: true,
        });
      },
      function (error: any) {
        toast({
          title: `failed to add the expense. Reason: ${error.message}`,
          status: "error",
          isClosable: true,
        });
      }
    );
  };
  return (
    <div className="w-full sm:w-4/5 lg:w-3/5 mx-auto px-2">
      <Heading as={"h3"} size={"2xl"} className="text-6xl font-bold mt-5 mb-10">
        {currentMonth}
      </Heading>

      <Box borderWidth={`1px`} borderRadius={"lg"} p={2} className="relative">
        <Heading
          as={"h4"}
          size={"lg"}
          p={2}
          className="absolute text -top-8 bg-white "
        >
          Add Expense
        </Heading>
        <form
          className="flex flex-col items-center mt-5"
          onSubmit={handleSubmit}
        >
          <FormControl isRequired id="name" mb={4}>
            <FormLabel>What was the expense for?</FormLabel>
            <Input
              ref={title}
              type="text"
              placeholder="What was the expense about?"
              size={`md`}
              variant="filled"
            />
          </FormControl>
          <FormControl isRequired id="amount" mb={4}>
            <FormLabel>Amount of expense?</FormLabel>
            <NumberInput defaultValue={0.0} precision={2} step={0.2} min={0}>
              <NumberInputField ref={amount} />
            </NumberInput>
          </FormControl>
          <FormControl id="type" mb={4} isRequired>
            <FormLabel>Type? eg: Daily, Monthly, Annual etc.</FormLabel>
            <Select ref={type} variant={"filled"} placeholder="Select option">
              <option value="Daily">Daily</option>
              <option value="Monthly">Monthly</option>
              <option value="Annual">Annual</option>
            </Select>
          </FormControl>
          <FormControl id="type" mb={4} isRequired>
            <FormLabel>in which month, did the expense occur?</FormLabel>
            <Select
              ref={monthRef}
              variant={"filled"}
              placeholder="Select option"
            >
              {months.map((month, index) => (
                <option key={index} value={month.toLowerCase()}>
                  {month}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="description" mb={4}>
            <FormLabel>Any other details about the expense?</FormLabel>
            <Textarea
              ref={description}
              placeholder="Start typing here..."
              size={"md"}
            />
          </FormControl>
          <Button colorScheme="teal" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default CurrentMonthBox;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
