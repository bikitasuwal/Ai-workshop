import type { Metadata } from "next";
import SignupView from "./SignupView";

export const metadata: Metadata = { title: "Create account | Balaju Living Heritage" };

export default function Signup() {
  return <SignupView />;
}
