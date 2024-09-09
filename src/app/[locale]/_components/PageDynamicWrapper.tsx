"use client";
import PageSkeleton from "@/app/[locale]/_components/PageSkeleton";
import dynamic from "next/dynamic";

const Page = dynamic(() => import("./Page"), {
  ssr: false,
  loading: () => <PageSkeleton />,
});

const PageDynamicWrapper = () => {
  return <Page />;
};

export default PageDynamicWrapper;
