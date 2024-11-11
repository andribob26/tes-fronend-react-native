import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { useSelector } from "react-redux";
import { getAuthIsAuthenticated } from "@/redux/features/auth.slice";
const index = () => {
  const isAuthenticated = useSelector(getAuthIsAuthenticated);
  return (
    <>{isAuthenticated ? <Redirect href={"/home"} /> : <Redirect href={"/login"} />}</>
  );
};

export default index;
