// Mini-Pixel-Engine: Sprites sind Zeichenraster, jedes Zeichen ist eine Palettenfarbe.
// '.' ist transparent. Die Farben kommen aus CSS-Variablen (Klasse px-<zeichen>),
// dadurch kann jede "Welt" dieselben Sprites anders einfärben.

export function normalize(rows) {
  const width = Math.max(...rows.map((row) => row.length))
  return rows.map((row) => row.padEnd(width, '.'))
}

// Gleiche Farben in einer Zeile werden zu einem Rechteck zusammengefasst.
export function spriteToRects(rows) {
  const grid = normalize(rows)
  const rects = []
  grid.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      const char = row[x]
      if (char === '.' || char === ' ') { x++; continue }
      let end = x
      while (end + 1 < row.length && row[end + 1] === char) end++
      rects.push({ x, y, w: end - x + 1, c: char })
      x = end + 1
    }
  })
  return { width: grid[0].length, height: grid.length, rects }
}

export function spriteToSvg(rows, { className = '', label = '', scale } = {}) {
  const { width, height, rects } = spriteToRects(rows)
  const size = scale ? ` width="${width * scale}" height="${height * scale}"` : ''
  const a11y = label ? ` role="img" aria-label="${label}"` : ' aria-hidden="true"'
  const body = rects.map((r) => `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="1" class="px-${r.c}"/>`).join('')
  return `<svg class="px ${className}" viewBox="0 0 ${width} ${height}"${size} shape-rendering="crispEdges"${a11y}>${body}</svg>`
}
