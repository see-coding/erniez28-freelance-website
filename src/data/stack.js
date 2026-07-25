// Tech-Stack — gruppiert nach Einsatzbereich, mit Selbsteinschätzung (1–5).
export const stackGroups = [
  {
    group: 'core // shopware & backend',
    items: [
      { name: 'Shopware 6', level: 5, note: 'Schwerpunkt seit 2021' },
      { name: 'PHP', level: 5, note: '10+ Jahre Vollstack' },
      { name: 'Twig', level: 4, note: 'Storefront-Templates' },
    ],
  },
  {
    group: 'infra // betrieb & automation',
    items: [
      { name: 'Docker', level: 4, note: 'Container-Setups, VPS-Betrieb' },
      { name: 'n8n', level: 4, note: 'Workflow-Automation, Integrationen' },
    ],
  },
  {
    group: 'frontend & scripting',
    items: [
      { name: 'React', level: 4, note: 'diese Website läuft damit' },
      { name: 'Python', level: 4, note: 'Middleware, APIs, Skripte' },
    ],
  },
]
