"use client";
import BaseLoading from "@/components/skeleton/BaseLoading";
import dynamic from "next/dynamic";
import React from "react";

const Page = dynamic(() => import("./Page"), {
  ssr: false,
  loading: () => <BaseLoading />,
});

const PageDynamicWrapper = () => {
  return <Page />;
};

export default PageDynamicWrapper;
