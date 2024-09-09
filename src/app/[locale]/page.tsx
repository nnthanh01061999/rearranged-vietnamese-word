import PageDynamicWrapper from "@/app/[locale]/_components/PageDynamicWrapper";
import Schema from "@/SEO/Schema";

function HomePage() {
  return (
    <>
      <PageDynamicWrapper />
      <Schema />
    </>
  );
}

export default HomePage;
