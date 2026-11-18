import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";
import { Reveal, SectionTitle } from "@/components/ui";

export const metadata: Metadata = { title: "Sign in | Balaju Living Heritage" };

export default function Login() {
  return (
    <section className="mx-auto max-w-md px-5 pb-12 pt-24">
      <Reveal>
        <SectionTitle titleKey="signIn" />
        <p className="mx-auto mt-3 text-center text-wood/80">Welcome back. Sign in to share your visit.</p>
      </Reveal>
      <Reveal className="mt-8" delay={0.1}>
        <AuthForm mode="login" />
      </Reveal>
    </section>
  );
}
