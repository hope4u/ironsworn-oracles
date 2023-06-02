import type { V2_MetaFunction } from "@remix-run/cloudflare";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import styles from "~/styles/_index.css"
import { getModules, getMoveCategories } from "~/dataforged";

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
  return getMoveCategories()
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  return (
    <div className="container">
      <nav>
        <ul>
          {data.moveCategories.map(category => 
          <li key={category.$id}>
            <Link to={category.$id}>{category.Name}</Link>
          </li>
          )}

        </ul>
      </nav>
      <main>
        <h1>Welcome to Remix</h1>
        <Outlet />
      </main>
    </div>
  );
}
