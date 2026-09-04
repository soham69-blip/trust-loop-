// Client-side file export helpers (no server round trip needed for the demo).

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function downloadJSON(filename: string, data: unknown) {
  triggerDownload(
    new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
    filename.endsWith(".json") ? filename : `${filename}.json`,
  );
}

function csvCell(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function downloadCSV(
  filename: string,
  rows: Record<string, unknown>[],
  columns?: string[],
) {
  const cols = columns ?? (rows[0] ? Object.keys(rows[0]) : []);
  const body = [
    cols.join(","),
    ...rows.map((r) => cols.map((c) => csvCell(r[c])).join(",")),
  ].join("\n");
  triggerDownload(
    new Blob([body], { type: "text/csv;charset=utf-8" }),
    filename.endsWith(".csv") ? filename : `${filename}.csv`,
  );
}

export function downloadText(filename: string, text: string) {
  triggerDownload(new Blob([text], { type: "text/plain;charset=utf-8" }), filename);
}

/** Serialises an inline <svg> node to a standalone .svg file. */
export function downloadSVGElement(el: SVGSVGElement | null, filename: string) {
  if (!el) return false;
  const clone = el.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const source = `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(clone)}`;
  triggerDownload(new Blob([source], { type: "image/svg+xml" }), filename);
  return true;
}

/** Simple deterministic hash used for demo "SHA-256 bundle" labels. */
export function demoHash(input: string): string {
  let h1 = 0x811c9dc5;
  let h2 = 0x1000193;
  for (let i = 0; i < input.length; i++) {
    h1 = (h1 ^ input.charCodeAt(i)) * 0x01000193;
    h2 = (h2 + input.charCodeAt(i) * (i + 7)) >>> 0;
  }
  const hex = (n: number) => (n >>> 0).toString(16).padStart(8, "0");
  return `${hex(h1)}${hex(h2)}${hex(h1 ^ h2)}${hex(h1 + h2)}`;
}
