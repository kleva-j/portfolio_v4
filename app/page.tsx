import { AnimatedUnderline } from "@/components/ui/animated-underline";
import { Text } from "@/components/ui/text";

export default async function Page() {
  return (
    <section className="my-20">
      <AnimatedUnderline
        as="h1"
        className="font-bold text-2xl tracking-tighter text-pretty mb-8 font-mono w-max"
      >
        Hi, I'm Michael
      </AnimatedUnderline>
      <div className="text-justify text-pretty text-muted-foreground">
        <Text as="p">
          I'm a software engineer with a passion for building innovative and
          user-friendly applications.
        </Text>
        <Text as="p">
          I'm a problem solver at heart and love the idea of using technology to
          solve real-world problems. I'm passionate about building applications
          that are both aesthetically pleasing and user-friendly.
        </Text>
      </div>
      <Text as="p" className="text-muted-foreground">
        I'm excited about the prospect of working with a company that shares my
        values and is committed to using technology to make a positive impact on
        society. I'm looking for a company that will challenge me, provide
        opportunities for growth and allow me to contribute to the development
        of innovative solutions.
      </Text>
    </section>
  );
}
