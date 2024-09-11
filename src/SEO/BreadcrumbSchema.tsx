type TBreadcrumbSchemaProps = {
  keyword: string;
};
const BreadcrumbSchema = ({ keyword }: TBreadcrumbSchemaProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Tra từ đảo",
        item: "https://www.tratudao.online/vi",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: keyword,
        item: `https://www.tratudao.online/vi?keyword=${keyword}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
};

export default BreadcrumbSchema;
