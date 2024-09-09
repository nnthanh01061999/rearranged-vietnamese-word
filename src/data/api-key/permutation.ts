import { PathWithOptionalColon } from "@/data/api-key";

const baseUrl = "/permutation";

export const permutationApiKey = {
  permutationSearch: `${baseUrl}`,
} satisfies Record<string, PathWithOptionalColon>;
