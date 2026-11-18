import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";
import { Reveal, SectionTitle } from "@/components/ui";

export const metadata: Metadata = { title: "Create account | Balaju Living Heritage" };

export default function Signup() {
  return (
    <section className="mx-auto max-w-md px-5 pb-12 pt-24">
      <Reveal>
        <SectionTitle titleKey="join" />
        <p className="mx-auto mt-3 text-center text-wood/80">
          An account lets you share reviews, photos and concerns. An admin checks every post before it appears.
        </p>
      </Reveal>
      <Reveal className="mt-8" delay={0.1}>
        <AuthForm mode="signup" />
      </Reveal>
    </section>
  );
}
