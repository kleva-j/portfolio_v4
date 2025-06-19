import { AnimatedUnderline } from "@/components/ui/animated-underline";
import { Text } from "@/components/ui/text";

import ProfilePic from "app/michael.jpg";
import Image from "next/image";

export default async function Page() {
  return (
    <section className="my-20 px-4 flex flex-col gap-y-4">
      <Text as="h1" variant="h1" className="font-semibold text-3xl lg:text-4xl">
        Michael Obasi
      </Text>
      <Text
        as="h3"
        variant="h3"
        className="font-medium text-xl lg:text-2xl tracking-tighter text-pretty font-mono w-max mb-4"
      >
        <span className="">👋</span> Hi, I'm{" "}
        <AnimatedUnderline className="inline-flex">Michael</AnimatedUnderline>
      </Text>
      <div className="text-lg text-pretty text-gray-700 dark:text-gray-400">
        <Image
          className="rounded-full ml-2 border border-dashed p-1 overflow-hidden size-[180px] object-cover object-top-left float-right"
          alt="Michael Obasi"
          src={ProfilePic}
          height={180}
          width={180}
        />
        <Text as="p" className="mt-0!">
          I'm a software engineer with a passion for building innovative and
          user-friendly applications.
        </Text>
        <Text as="p">
          I'm a problem solver at heart and love the idea of using technology to
          solve real-world problems. I'm passionate about building applications
          that are both aesthetically pleasing and user-friendly.
        </Text>
        <Text as="p" className="">
          I'm excited about the prospect of working with a company that shares
          my values and is committed to using technology to make a positive
          impact on society. I'm looking for a company that will challenge me,
          provide opportunities for growth and allow me to contribute to the
          development of innovative solutions.
        </Text>
      </div>
    </section>
  );
}
