import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


export default function RenderText({markdown}) {
  return (
    <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
  );
}
