"use client";
import FormInput from "@/components/control/input/FormInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { arrayUnique, checkValidStruct, destructWord, generateAllCase, getSimilarUniqueWord, permutationWord, shuffleWordToCompleteWord, structWord } from "@/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ReactJson from "react-json-view";
import { z } from "zod";
import vi from "@/data/vi.dic.json";

const schema = z.object({
  keyword: z.string().min(1, "Required"),
});

type Schema = z.infer<typeof schema>;

export default function Page() {
  const [result, setResult] = useState<string[]>();
  const [debug, setDebug] = useState<any>();
  const forms = useForm<Schema>({
    defaultValues: {
      keyword: "",
    },
  });

  const t = useTranslations("Home");

  const onSubmit = (values: Schema) => {
    const words = values.keyword.trim().split(" ");
    if (!words.length) return;
    const destructWords = words.map((word) => destructWord(word));
    const generates = generateAllCase(destructWords);
    const newWords = generates.map((word) => structWord(word));
    const uniqueNewWords = arrayUnique(newWords) as string[];
    const similarUniqueWords = getSimilarUniqueWord(uniqueNewWords);
    const validSpells = similarUniqueWords.filter((word) => {
      return vi?.[word as keyof typeof vi];
    });
    const completeWords = shuffleWordToCompleteWord(validSpells, words.length);

    setResult(checkValidStruct(words.join(" "), destructWords, completeWords));

    setDebug({
      destructWords,
      validSpells,
      completeWords,
    });
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
                  <Button className="w-fit" type="submit">
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
                <ReactJson src={debug} />
              </CardContent>
            </Card>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
