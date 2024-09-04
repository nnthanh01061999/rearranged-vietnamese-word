"use client";
import FormInput from "@/components/control/input/FormInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useQueryString } from "@/hooks/use-query-string";

import { permutationWord } from "@/utils";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  keyword: z.string().min(1, "Required"),
});

type Schema = z.infer<typeof schema>;

export default function Page() {
  const { filter, searchParams } = useQueryString();

  const [result, setResult] = useState<string[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const forms = useForm<Schema>({
    defaultValues: {
      keyword: searchParams.get("keyword") || "",
    },
  });

  const t = useTranslations("Home");

  const onSubmit = async (values: Schema) => {
    filter({ keyword: values.keyword });
  };

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    if (!!keyword) {
      setLoading(true);
      const words = keyword.trim().split(" ");
      if (!words.length) return;
      permutationWord(words).then(({ validWords }) => {
        setResult(validWords);
        setLoading(false);
      });
    }
  }, [searchParams]);

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
                  <Button disabled={loading} className="w-fit" type="submit">
                    {t("search")}
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                {result?.length ? <h5>{t("result")}</h5> : null}
                {result?.map((item, index) => (
                  <div key={index}>
                    <Label>
                      {index + 1}.{item}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
