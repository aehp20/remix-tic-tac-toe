import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getNbColumns, setNbColumns } from "../data";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const nbColumns = await getNbColumns();
  return json({ nbColumns, q });
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { nbColumns } = useLoaderData<typeof loader>();

  const [size, setSize] = useState(nbColumns);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const element = event.target as HTMLSelectElement;
    console.log("option:", element.value);
    console.log("event.currentTarget:", event.currentTarget);
    const newSize = Number.parseInt(element.value, 10);
    setNbColumns(newSize);
    setSize(newSize);
  };

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Tic Tac Toe game</h1>
      {size}

      <select name="nbColumns" onChange={handleChange}>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
    </div>
  );
}
