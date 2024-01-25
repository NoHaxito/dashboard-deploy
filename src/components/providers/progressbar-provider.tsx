"use client";

import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const ProgressBarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      {children}
      <ProgressBar
        height="2px"
        color="#6366f1"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};
