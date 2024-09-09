const Schema = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Tìm kiếm từ đảo tiếng Việt",
    url: "https://yourwebsite.com",
    description: "Công cụ tìm kiếm từ đảo tiếng Việt nhanh chóng và chính xác.",
    applicationCategory: "Tiện ích",
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
