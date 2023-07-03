import { Expense } from "my-module";
import expenses from "../dummy-data/expenses";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  Box,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import TableRowWrapper from "./TableRowWrapper";

function sortExpensesAsPerMonth(expenses: Expense[]) {
  const monthsHashMap = {
    january: [],
    february: [],
    march: [],
    april: [],
    may: [],
    june: [],
    july: [],
    august: [],
    september: [],
    october: [],
    november: [],
    december: [],
  };
  expenses.map((expense: Expense) => {
    const { month } = expense;

    (monthsHashMap as Record<string, any>)[month.toLowerCase()].push(expense);
  });
  return monthsHashMap;
}

function getTotalCost(expenses: Expense[]) {
  let sum = 0;
  expenses.map((expense) => (sum += expense.cost));
  return sum;
}

function firstLetterCapital(name: string) {
  let capitalisedName = "";
  for (let i = 0; i < name.length; i++) {
    if (i === 0) {
      capitalisedName += name[i].toUpperCase();
    } else {
      capitalisedName += name[i];
    }
  }
  return capitalisedName;
}

function PreviousMonthBox() {
  const sortedExpenses = sortExpensesAsPerMonth(expenses);
  return (
    <div className="px-2 my-5 w-full md:w-4/5 mx-auto">
      <Accordion allowMultiple>
        {Object.entries(sortedExpenses).map(([month, expenses], index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Heading as={"h3"} size={"lg"}>
                    {firstLetterCapital(month)}
                  </Heading>{" "}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {expenses.length === 0 ? (
                <Alert status="warning">
                  <AlertIcon />
                  Seems like you didn't spend a penny during {month}!
                </Alert>
              ) : (
                <TableContainer>
                  <Table variant="simple">
                    <TableCaption>Expenses List</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th isNumeric>Cost</Th>
                        <Th>Type</Th>
                        <Th>Descriptions, if any!</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {expenses.map((expense: Expense, index) => (
                        <Tr key={index}>
                          <Td>{expense.name}</Td>
                          <Td isNumeric>{expense.cost}</Td>
                          <Td>{expense.type}</Td>
                          <TableRowWrapper
                            description={expense?.description}
                            name={expense.name}
                          />
                        </Tr>
                      ))}
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th>Total cost:</Th>
                        <Th isNumeric>{getTotalCost(expenses)}</Th>
                      </Tr>
                    </Tfoot>
                  </Table>
                </TableContainer>
              )}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default PreviousMonthBox;
