"use client";
import permutationApi from "@/apis/permutation";
import FormInput from "@/components/control/input/FormInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { API_KEY } from "@/data";
import { useQueryString } from "@/hooks/use-query-string";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  keyword: z.string().min(1, "Required"),
});

type Schema = z.infer<typeof schema>;

export default function Home() {
  const { filter, searchParams } = useQueryString();
  const forms = useForm<Schema>({
    defaultValues: {
      keyword: searchParams.get("keyword") || "",
    },
  });
  const keyword = searchParams.get("keyword") || "";

  const t = useTranslations("Home");

  const { data, refetch, isFetching, isError } = useQuery({
    queryKey: [API_KEY, keyword],
    queryFn: () =>
      permutationApi.searchPermutation({
        payload: { keyword },
      }),
    enabled: !!keyword,
  });

  const result = useMemo(() => data?.responseData?.data, [data?.responseData?.data]);

  const onSubmit = (values: Schema) => {
    if (keyword === values.keyword) {
      refetch();
      return;
    }
    filter({ keyword: values.keyword });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start overflow-auto p-4 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center space-y-2 font-mono">
        <FormProvider {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader className="gap-4">
                <CardTitle className="text-center">{t("title")}</CardTitle>
                <div className="flex w-full gap-2">
                  <FormInput
                    name="keyword"
                    childProps={{
                      placeholder: t("placeholder"),
                    }}
                    styles={{ itemClass: "w-full" }}
                  />
                  <Button loading={isFetching} className="w-fit" type="submit">
                    {t("search")}
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                {keyword && !isFetching && (isError || result?.length === 0) ? (
                  <Label>{t("empty")}</Label>
                ) : (
                  <>
                    {result?.length ? <h5>{t("result")}</h5> : null}
                    {result?.map((item, index) => (
                      <div key={index}>
                        <Label>
                          {index + 1}.{item}
                        </Label>
                      </div>
                    ))}
                  </>
                )}
              </CardContent>
            </Card>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
