import { qsStringify } from "@/utils/query-string";
import { kebabCase } from "lodash";

type TDefineTermSchemaProps = {
  keyword: string;
};
const DefineTermSchema = ({ keyword }: TDefineTermSchemaProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: keyword,
    description: `Đảo từ của "${keyword}"`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Tìm kiếm, tra cứu từ đảo - từ lái tiếng Việt | Tra từ đảo",
      url: "https://www.tratudao.online/vi",
    },
    termCode: kebabCase(keyword),
    url: `https://www.tratudao.online/vi?${qsStringify({ keyword })}`,
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

export default DefineTermSchema;
