"use client";
import FormInput from "@/components/control/input/FormInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useQueryString } from "@/hooks/use-query-string";
import { permutationWord } from "@/utils";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  keyword: z.string().min(1, "Required"),
});

type Schema = z.infer<typeof schema>;

export default function Home() {
  const { filter, searchParams } = useQueryString();
  const [debug, setDebug] = useState<any>();
  const [result, setResult] = useState<string[]>();
  const forms = useForm<Schema>({
    defaultValues: {
      keyword: searchParams.get("keyword") || "",
    },
  });
  const keyword = searchParams.get("keyword");

  const t = useTranslations("Home");

  const onSubmit = (values: Schema) => {
    filter({ keyword: values.keyword });
  };

  useEffect(() => {
    if (!!keyword) {
      const words = keyword.trim().split(" ");
      if (!words.length) return;
      const data = permutationWord(words);
      setResult(data.validWords);
      setDebug(data);
    }
  }, [keyword]);

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
                  <Button className="w-fit" type="submit">
                    {t("search")}
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                {keyword && result?.length === 0 ? (
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

                {/* <ReactJson src={debug} /> */}
              </CardContent>
            </Card>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
