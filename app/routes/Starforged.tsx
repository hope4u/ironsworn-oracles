import type { V2_MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import styles from "~/styles/_index.css";
import { getModules, getObjectLink } from "~/dataforged/dataforged";
import { marked } from "marked";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Ironsworn:Starforged - Rules" },
    {
      name: "description",
      content: "All rules form Ironsworn:Starforged by Shawn Tomkin",
    },
  ];
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function loader() {
  const modules = getModules();
  return json({ modules });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="container">
      <nav>
        <ul>
          {data.modules.map((module) => (
            <li key={`nav-{module.$id}`}>
              <Link to={getObjectLink(module)}>{module.Name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}
