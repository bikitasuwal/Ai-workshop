import { SectionTitle } from "@/components/ui";
import AdminQueue from "@/components/AdminQueue";

export default function Page() {
  return (
    <>
      <SectionTitle titleKey="adminPosts" />
      <p className="mx-auto mb-8 mt-3 max-w-md text-center text-wood/80">
        You approve or reject what visitors send. Nothing appears on the website until you approve it.
      </p>
      <AdminQueue />
    </>
  );
}
