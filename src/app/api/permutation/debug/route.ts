import { defaultApiDetailResponse, HTTP_STATUS_CODE } from "@/data";
import { IApiDetailResponse } from "@/types";
import { handleError, permutationWord } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";

type TPermutationResponse = IApiDetailResponse<string[]>;
export async function POST(req: NextRequest) {
  try {
    const { keyword } = await req.json();

    const words = keyword.trim().split(" ").filter(Boolean);

    if (!words.length) {
      return handleError("Invalid keyword", HTTP_STATUS_CODE.BAD_REQUEST);
    }

    const data = permutationWord(words);
    const response = {
      ...defaultApiDetailResponse,
      message: "Success",
      data,
    };
    return NextResponse.json(response, { status: HTTP_STATUS_CODE.OK });
  } catch (err: any) {
    const errorResponse = {
      ...defaultApiDetailResponse,
      message: err.message || "An unexpected error occurred",
      code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    };
    return NextResponse.json(errorResponse, { status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR });
  }
}
