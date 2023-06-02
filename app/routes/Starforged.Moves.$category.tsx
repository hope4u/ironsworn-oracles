import { json } from "@remix-run/cloudflare";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/cloudflare";
import { marked } from "marked";
import { getMoveCategory } from "~/dataforged";

export async function loader({ params }: LoaderArgs) {
  if (!params.category) throw new Response("Not Found", { status: 404 });
  return getMoveCategory(params.category);
}

export default function MoveCategory() {
  const data = useLoaderData<typeof loader>();
  return (
      <main>
        <h1>{data.moveCategory.Name}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: marked.parse(data.moveCategory.Description),
          }}
        />
        <ul>
          {data.moveCategory.Moves.map((move) => (
            <li key={move.$id}>
              <Link to={`/${move.$id}`}>{move.Name}</Link>
            </li>
          ))}
        </ul>
      </main>
  );
}
