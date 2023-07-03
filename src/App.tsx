import { useContext, useEffect } from "react";
import "./App.css";
import CurrentMonthBox from "./components/CurrentMonthBox";
import { account } from "./utils/Appwrite";
import { useToast } from "@chakra-ui/react";
import LoginBox from "./components/LoginBox";
import UserContext from "./utils/contexts/UserContext";
import PreviousMonthBox from "./components/PreviousMonthBox";

function App() {
  const { user, updateUser } = useContext(UserContext);
  const toast = useToast();

  useEffect(() => {
    const promise = account.get();

    promise.then(
      function (response: any) {
        updateUser({
          name: response.name,
          email: response.email,
          id: response.$id,
        });
      },
      function (error: any) {
        console.log(error);
        toast({
          title: "Sorry, no user was found",
          status: "error",
          isClosable: true,
        });
        updateUser(null);
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center gap-y-5">
      <p className="font-extrabold text-6xl lg:text-8xl text-center">
        Expense Tracker
      </p>
      <p className="text-center font-bold text-3xl lg:text-5xl">
        Get your Finances correct!
      </p>
      {user ? (
        <div className="w-full">
          <CurrentMonthBox />
          <PreviousMonthBox />
        </div>
      ) : (
        <LoginBox />
      )}
    </div>
  );
}

export default App;
