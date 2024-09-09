// utils/responseHandler.ts
import { HTTP_STATUS_CODE } from "@/data";
import { NextResponse } from "next/server";

export function handleSuccess<T>(data: T, status: number = HTTP_STATUS_CODE.OK) {
  return NextResponse.json({ data, code: status }, { status });
}

export function handleError(message: string, code: number = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
  return NextResponse.json({ message, code }, { status: code });
}
