import type { Metadata } from "next";
import QuizView from "./QuizView";

export const metadata: Metadata = {
  title: "Heritage Quiz & Challenges | Balaju Living Heritage",
  description:
    "Interactive quiz, detective game, and 22 spouts explorer to test your knowledge of Balaju 22 Dhara, Pyatho Ajima, and Newar living heritage.",
};

export default function QuizPage() {
  return <QuizView />;
}
