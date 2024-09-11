import PageDynamicWrapper from "@/app/[locale]/_components/PageDynamicWrapper";
import BreadcrumbSchema from "@/SEO/BreadcrumbSchema";
import DefineTermSchema from "@/SEO/DefineTermSchema";
import Schema from "@/SEO/Schema";
import SearchActionSchema from "@/SEO/SearchActionSchema";

function HomePage({ searchParams }: { searchParams: Record<string, string> }) {
  const { keyword = "" } = searchParams;
  return (
    <>
      <PageDynamicWrapper />
      <Schema />
      <BreadcrumbSchema keyword={keyword} />
      <DefineTermSchema keyword={keyword} />
      <SearchActionSchema />
    </>
  );
}

export default HomePage;
