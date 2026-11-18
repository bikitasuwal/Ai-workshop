import type { Metadata } from "next";
import LoginView from "./LoginView";

export const metadata: Metadata = { title: "Sign in | Balaju Living Heritage" };

export default function Login() {
  return <LoginView />;
}
