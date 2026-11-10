import type { ReactNode } from "react";
import { useEffect } from "react";

const v = (n: string): string => `var(--${n})`;
const THEME = {
  bg: { base: v("bg-base"), elevated: v("bg-elevated") },
  text: { primary: v("text-primary"), secondary: v("text-secondary"), tertiary: v("text-tertiary"), danger: v("danger"), success: v("success"), onColor: "#ffffff" },
  border: { default: v("border"), strong: v("border-strong"), subtle: v("border-subtle") },
  fill: { accent: v("accent") },
};
export function useGrokTheme(): typeof THEME { return THEME; }

export function Page(p: { title: string; summary?: string; width?: string; lang?: string; children?: ReactNode }) {
  useEffect(() => { document.title = p.title; if (p.lang) document.documentElement.lang = p.lang; }, [p.title, p.lang]);
  return (
    <main className="page">
      <header className="page-head"><h1>{p.title}</h1>{p.summary ? <p className="summary">{p.summary}</p> : null}</header>
      <div className="stack">{p.children}</div>
    </main>
  );
}
export function Section(p: { heading?: string; children?: ReactNode }) {
  return <section className="section">{p.heading ? <h2>{p.heading}</h2> : null}<div className="stack">{p.children}</div></section>;
}
export function Text(p: { children?: ReactNode }) { return <p className="text">{p.children}</p>; }
export function Button(p: { label: string; variant?: string; onClick?: () => void }) {
  return <button type="button" className={`btn ${p.variant === "primary" ? "btn-primary" : ""}`} onClick={p.onClick}>{p.label}</button>;
}
export function Segmented(p: { options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="seg" role="tablist">
      {p.options.map((o) => (
        <button type="button" role="tab" aria-selected={o.value === p.value} key={o.value} className={o.value === p.value ? "on" : ""} onClick={() => p.onChange(o.value)}>{o.label}</button>
      ))}
    </div>
  );
}
export function Floating(p: { edge?: string; bar?: boolean; children?: ReactNode }) {
  return <div className="floating">{p.children}</div>;
}
export function Table(p: { columns: string[]; rows: ReactNode[][] }) {
  return (
    <div className="table-wrap"><table>
      <thead><tr>{p.columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>
      <tbody>{p.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
    </table></div>
  );
}
export function Metrics(p: { metrics: { value: string; label: string; tone?: string }[] }) {
  return (
    <div className="metrics">
      {p.metrics.map((m, i) => <div key={i} className="metric"><div className={`mv ${m.tone ?? ""}`}>{m.value}</div><div className="ml">{m.label}</div></div>)}
    </div>
  );
}
export function Properties(p: { items: { label: string; value: ReactNode }[] }) {
  return <dl className="props">{p.items.map((it, i) => <div key={i}><dt>{it.label}</dt><dd>{it.value}</dd></div>)}</dl>;
}
export function LinkCards(p: { links: { title: string; site?: string; href: string }[] }) {
  return (
    <div className="links">
      {p.links.map((l, i) => <a key={i} className="linkcard" href={l.href} target="_blank" rel="noopener noreferrer"><span className="lt">{l.title}</span>{l.site ? <span className="ls">{l.site}</span> : null}</a>)}
    </div>
  );
}
export function Toggle(p: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={p.value} onChange={(e) => p.onChange(e.target.checked)} />
      <span className="track"><span className="knob" /></span>
      <span>{p.label}</span>
    </label>
  );
}
export function Callout(p: { tone?: string; children?: ReactNode }) {
  return <div className={`callout ${p.tone ?? "info"}`}>{p.children}</div>;
}
