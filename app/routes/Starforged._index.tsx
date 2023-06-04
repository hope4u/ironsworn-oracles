import type { LoaderArgs, V2_MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import styles from "~/styles/_index.css";
import { getModule, getModules, getElementId } from "~/dataforged/dataforged";
import { marked } from "marked";


export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function loader({ params }: LoaderArgs) {
  const modules = getModules().map(module => getModule(getElementId(module.$id)));
  return json({modules});
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <main>
      {data.modules.map((module) => (
        <div
          key={`main-{module.$id}`}
          dangerouslySetInnerHTML={{
            __html: marked.parse(module.Description),
          }}
        />
      ))}
    </main>
  );
}
