const Schema = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Tra từ đảo",
    url: "https://yourwebsite.com",
    description: "Công cụ tìm kiếm, tra cứu từ đảo trong tiếng Việt.",
    applicationCategory: "Utility",
    operatingSystem: "Web",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "10",
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

export default Schema;
