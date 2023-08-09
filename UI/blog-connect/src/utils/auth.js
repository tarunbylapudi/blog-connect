import { redirect, useNavigate } from "react-router-dom";

export function getAuthToken() {
  return localStorage.getItem("token");
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    console.log("in checkAuthLoader");
    return redirect("/login");
  }
}
