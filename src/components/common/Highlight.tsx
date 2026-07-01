import { Fragment } from "react";

/**
 * Realça termos-chave dentro de um texto com a cor de acento (lilás).
 * Preserva o texto ao redor e funciona dentro de headings animados por
 * SplitText (que divide por linhas, mantendo os spans internos).
 *
 * Uso: <Highlight text={line} terms={["sistemas"]} />
 */
interface HighlightProps {
  text: string;
  terms: readonly string[];
}

export function Highlight({ text, terms }: HighlightProps) {
  if (terms.length === 0) return <>{text}</>;

  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        terms.some((t) => t.toLowerCase() === part.toLowerCase()) ? (
          <span key={i} className="text-pastel-lilac">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
