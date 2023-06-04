import type { LoaderArgs, V2_MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import styles from "~/styles/_index.css"
import { getModule, getObjectLink } from "~/dataforged/dataforged";
import { marked } from "marked";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function loader({params}: LoaderArgs) {
  const module = getModule(params.module)
  return json({module})
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  return (
    <main>
      <h1>{data.module.Name}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: marked.parse(data.module.Description),
          }}
        />
        <ul>
          {data.module.Data.map((element) => (
            <li key={element.$id}>
              <Link to={getObjectLink(element)}>{element.Name}</Link>
            </li>
          ))}
        </ul>
    </main>
  );
}
