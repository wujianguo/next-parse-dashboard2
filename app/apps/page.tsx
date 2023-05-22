'use client';
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AppCard, AppCardProps } from "./app-card";

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) {
    throw new Error(res.statusText);    
  }
  return res.json()
});

export default function IndexPage() {
  const { data, error, isLoading } = useSWR("/parse-dashboard-config.json", fetcher);
  if (error) return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      {error.toString()}
    </section>
  );
  if (isLoading) {
    return (
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">

      <Card>
        <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
          <div className="space-y-1">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div>
                <Skeleton className="h-4 w-[250px]" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </CardContent>
      </Card>
      </section>
    );
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      {data.apps.map((app: AppCardProps) => (
        <a href={`/apps/${app.appName}`}><AppCard key={app.appId} app={app} /></a>
      ))}
    </section>
  );
}
