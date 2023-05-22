'use client';
import useSWR from "swr";
import { Circle } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface AppCardProps {
  appName: string;
  appId: string;
  masterKey: string;
  serverURL: string;
  iconName?: string;
}

const fetcher = (data: string[]) => fetch(`${data[1]}${data[0]}`, { headers: {'X-Parse-Application-Id': data[2], 'X-Parse-Master-Key': data[3]}}).then((res) => {
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
})

export function AppCard({ app }: { app: AppCardProps}) {
  const { data, error, isLoading } = useSWR(["/serverInfo", app.serverURL, app.appId, app.masterKey], fetcher);
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={`/icons/${app.iconName}`} />
              <AvatarFallback>{app.appName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none"><CardTitle>{app.appName}</CardTitle></p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Circle className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            Server URL: {app.serverURL} {data?.parseServerVersion ? `Server version: ${data?.parseServerVersion}` : ''} { error ? `${error}` : ''}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
