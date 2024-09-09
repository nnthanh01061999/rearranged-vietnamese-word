import { IApiDetailResponse } from "@/types";

import { getBeURL } from "@/utils";
import { sendRequest } from "@/utils/fetch/sendRequest";
import { SendRequest } from "@/utils/fetch/type";

function searchPermutation(config: SendRequest<IApiDetailResponse<string[]>, { payload: { keyword: string } }>) {
  return sendRequest({
    method: "POST",
    url: getBeURL("permutationSearch"),
    ...config,
  });
}

const permutationApi = {
  searchPermutation,
};

export default permutationApi;
