import { serviceDetails, caseStudies, articles } from '../data/pages.js'

const base = 'https://erniez28.de'
const today = '2026-09-29'

export function GET() {
  const pages = [
    ['/', '1.0'], ['/leistungen/', '0.9'], ['/portfolio/', '0.8'], ['/whoami/', '0.8'],
    ['/journal/', '0.7'], ['/qualifikationen/', '0.6'], ['/projekt-besprechen/', '0.7'],
    ...serviceDetails.map((s) => [`/leistungen/${s.slug}/`, '0.9']),
    ...caseStudies.map((c) => [`/portfolio/${c.slug}/`, '0.7']),
    ...articles.map((a) => [`/journal/${a.slug}/`, '0.6', a.date]),
  ]
  const body = pages.map(([path, prio, date]) => `  <url><loc>${base}${path}</loc><lastmod>${date || today}</lastmod><priority>${prio}</priority></url>`).join('\n')
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
