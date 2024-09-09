import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

function PageSkeleton() {
  const t = useTranslations("Home");
  return (
    <main className="flex min-h-screen flex-col items-center justify-start overflow-auto p-4 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center space-y-2 font-mono">
        <form>
          <Card>
            <CardHeader className="gap-4">
              <CardTitle className="text-center">{t("title")}</CardTitle>
              <div className="flex w-full gap-2">
                <Input placeholder={t("placeholder")} className="w-full" />
                <Button className="w-fit" type="submit">
                  {t("search")}
                </Button>
              </div>
            </CardHeader>

            <CardContent></CardContent>
          </Card>
        </form>
      </div>
    </main>
  );
}

export default PageSkeleton;
