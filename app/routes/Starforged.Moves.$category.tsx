import { json } from "@remix-run/cloudflare";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/cloudflare";
import { marked } from "marked";
import {
    getMoveCategory,
    getObjectBaseData,
    getObjectLink,
} from "~/dataforged/dataforged";

export async function loader({ params }: LoaderArgs) {
    if (!params.category) throw new Response("Not Found", { status: 404 });
    const category = getMoveCategory(params.category);
    return json({
        category: {
            ...getObjectBaseData(category),
            Moves: category.Moves.map(move => getObjectBaseData(move)),
        },
    });
}

export default function MoveCategory() {
    const data = useLoaderData<typeof loader>();
    return (
        <main>
            <h1>{data.category.Name}</h1>
            <div
                dangerouslySetInnerHTML={{
                    __html: marked.parse(data.category.Description),
                }}
            />
            <ul>
                {data.category.Moves.map((move) => (
                    <li key={move.$id}>
                        <Link to={getObjectLink(move)}>{move.Name}</Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
