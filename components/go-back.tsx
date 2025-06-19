"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const GoBack = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="group w-fit mb-6 text-gray-600 dark:text-gray-400"
      variant="outline"
    >
      <ArrowLeftIcon
        className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
        aria-hidden="true"
        size={16}
      />
      Back
    </Button>
  );
};
