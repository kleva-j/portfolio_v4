"use client";

import { useEffect } from "react";

export interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <p>Oh no, something went wrong... maybe try again?</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
