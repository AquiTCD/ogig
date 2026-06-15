# ogig Conventions

- Template components:
  - Must export a React component representing the OGP card.
  - OGP components must follow Vercel OG restrictions (e.g. subset of flexbox CSS properties, inline styles, no standard HTML images if they require complex fetching, only standard fonts registered in the API route).
- Route params:
  - Extract properties in `src/app/api/og/route.tsx` and pass them to the template component.