import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Sign my guestbook and leave your mark.",
};

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function GuestbookPage() {
  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">
        sign my guestbook
      </h1>
    </section>
  );
}
