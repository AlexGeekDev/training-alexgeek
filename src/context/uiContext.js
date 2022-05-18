/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext } from "react";

export const UiDataContext = createContext();

export const UiDataProvider = (props) => {
  const [active, setActive] = useState(false);
  const [verified, setVerified] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [role, setRole] = useState();
  const [language, setLanguage] = useState("en");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [courses, setCourses] = useState();

  const defaultContext = {
    active,
    setActive,
    loading,
    setLoading,
    error,
    setError,
    role,
    setRole,
    language,
    setLanguage,
    isDataLoaded,
    setIsDataLoaded,
    courses,
    setCourses,
  };

  return (
    <UiDataContext.Provider value={defaultContext}>
      {props.children}
    </UiDataContext.Provider>
  );
};

export const useUiDataContext = () => {
  return useContext(UiDataContext);
};

export default UiDataProvider;
