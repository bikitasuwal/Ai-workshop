import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { INITIAL_APPROVED_STORIES } from "@/lib/communityStories";
import PageLayout from "@/components/ui/PageLayout";

export async function generateStaticParams() {
  return INITIAL_APPROVED_STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = INITIAL_APPROVED_STORIES.find((s) => s.slug === slug || s.id === slug);
  if (!story) return { title: "Story Not Found" };

  return {
    title: `${story.title.en} | Balaju Living Heritage`,
    description: story.summary.en,
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = INITIAL_APPROVED_STORIES.find((s) => s.slug === slug || s.id === slug);

  if (!story) {
    notFound();
  }

  const firstPhoto = story.photographs && story.photographs.length > 0 ? story.photographs[0] : null;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-wood via-brick-deep to-brick px-5 pb-16 pt-24 text-center text-cream">
        <div className="lattice absolute inset-0 opacity-[0.07]" aria-hidden />
        <div className="relative mx-auto max-w-3xl">
          <Link
            href="/stories"
            className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-cream/20 bg-cream/10 px-4 py-1.5 text-xs text-cream/90 transition hover:bg-cream/20"
          >
            ← Back to Stories
          </Link>
          <p className="font-deva text-xs font-semibold uppercase tracking-wider text-marigold">
            {story.heritageLocation.name.en}
          </p>
          <h1 className="font-display mt-2 text-3xl sm:text-5xl leading-tight">
            {story.title.en}
          </h1>
          <p className="font-deva mt-1 text-lg text-cream/80">
            {story.title.ne}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-cream/80">
            <span>By: {story.contributor.name}</span>
            <span>•</span>
            <span>{story.publicationDate}</span>
            {story.era && <span>• ({story.era})</span>}
          </div>
        </div>

        <svg
          viewBox="0 0 400 24"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 block h-6 w-full text-cream"
          aria-hidden
        >
          <path d="M0 24V12q25-14 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0V24Z" fill="currentColor" />
        </svg>
      </section>

      <PageLayout variant="narrow" underHero>
        <PageLayout.Section>
          <article className="wood-frame space-y-6 rounded-3xl bg-paper p-6 text-wood shadow-xl sm:p-10">
            {firstPhoto && (
              <div className="space-y-2">
                <div className="wood-frame relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-wood">
                  <Image
                    src={firstPhoto.url}
                    alt={firstPhoto.caption?.en || story.title.en}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {firstPhoto.caption && (
                  <p className="text-xs text-wood/75 italic">
                    {firstPhoto.caption.en} — 📷 {firstPhoto.credit}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-4 font-body text-base leading-relaxed text-wood/90 whitespace-pre-line border-t border-wood/10 pt-6">
              {story.content.en}
            </div>

            <div className="space-y-4 font-deva text-base leading-relaxed text-wood/90 whitespace-pre-line border-t border-wood/15 pt-6 bg-cream/50 p-6 rounded-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-brick font-mono">
                नेपाली भाषामा:
              </p>
              {story.content.ne}
            </div>

            <div className="pt-6 border-t border-wood/10 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/stories"
                className="text-xs font-semibold text-brick hover:underline"
              >
                ← Return to Community Archive
              </Link>
              <Link
                href="/stories/submit"
                className="rounded-full bg-marigold px-5 py-2 text-xs font-semibold text-wood shadow-sm hover:brightness-105"
              >
                Share Your Story →
              </Link>
            </div>
          </article>
        </PageLayout.Section>
      </PageLayout>
    </>
  );
}
