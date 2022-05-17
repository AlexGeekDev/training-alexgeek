/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { createContext, useState, useContext } from "react";

export const UserDataContext = createContext();

export const UserDataProvider = (props) => {
  const [userDb, setUserDb] = useState();
  const [timeZoneDiff, setTimeZoneDiff] = useState();
  const [nameTimeZone, setNameTimeZone] = useState();

  const defaultContext = {
    userDb,
    setUserDb,
    timeZoneDiff,
    setTimeZoneDiff,
    nameTimeZone,
    setNameTimeZone,
  };

  return (
    <UserDataContext.Provider value={defaultContext}>
      {props.children}
    </UserDataContext.Provider>
  );
};

export const useUserDataContext = () => {
  return useContext(UserDataContext);
};

export default UserDataProvider;
