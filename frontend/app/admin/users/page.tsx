import { SectionTitle } from "@/components/ui";
import AdminUsers from "@/components/AdminUsers";

export default function Page() {
  return (
    <>
      <SectionTitle ne="सदस्यहरू" en="Members" />
      <p className="mx-auto mb-8 mt-3 max-w-md text-center text-wood/80">
        Everyone who has an account. Suspend someone who keeps posting content that breaks the rules.
      </p>
      <AdminUsers />
    </>
  );
}
