import { V2_MetaFunction, json } from "@remix-run/cloudflare";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import styles from "~/styles/_index.css"
import { getMoveCategories, getObjectLink } from "~/dataforged/dataforged";

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
  const moveCategories = getMoveCategories()
  return json({moveCategories})
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  return (
    <div className="container">
      <nav>
        <ul>
          {data.moveCategories.map(category => 
          <li key={category.$id}>
            <Link to={getObjectLink(category)}>{category.Name}</Link>
          </li>
          )}

        </ul>
      </nav>
        <Outlet />
    </div>
  );
}
