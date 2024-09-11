const SearchActionSchema = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.tratudao.online",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.tratudao.online/vi?keyword={search_term}",
      "query-input": "required name=search_term",
    },
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

export default SearchActionSchema;
