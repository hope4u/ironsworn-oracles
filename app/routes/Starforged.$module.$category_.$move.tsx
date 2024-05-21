import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";


import { getMove } from "~/dataforged/dataforged";

export async function loader({ params }: LoaderArgs) {
  console.log(params)
  if (!params.category || !params.move) throw new Response("Not Found", { status: 404 });
  const move = getMove(params.category, params.move);
  return json({move})
}

export default function Move() {
  const data = useLoaderData<typeof loader>();
  return (
    <article className="move">
      <h1>{data.move?.Name}</h1>        
    </article>
  );
}
