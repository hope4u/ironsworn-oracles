import type { V2_MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import styles from "~/styles/_index.css";
import { getModules, getActiveModule } from "~/dataforged";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function loader() {
  const modules = getModules();
  return json({modules})
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="container">
      <nav>
        <ul>
          {data.modules.map((module) => (
            <li key={module.$id}>
              <Link to={`/${module.$id}`}>{module.Name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
