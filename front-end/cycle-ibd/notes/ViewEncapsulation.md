# ViewEncapsulation and the DOM

Angular components look encapsulated, but by default they are **not** separated
into their own DOM trees. The default mode, `ViewEncapsulation.Emulated`, only
scopes *CSS* — Angular tags each element in a component's template with an
`_ngcontent-*` attribute and rewrites that component's styles to match those
attributes, so its CSS doesn't leak out and other components' CSS doesn't leak
in.

It does **not** put the template's elements behind a boundary in the DOM.
When `<app-hero-section>` renders, its template's real elements become actual
light-DOM children right there on the page. So a plain `document.querySelectorAll(...)`
(or `gsap.utils.toArray(...)`) called from a parent component — e.g. in
`hero-page.ts` — sees one single flattened DOM tree and can match elements
living inside any descendant component, no matter how deeply nested.

This is why `hero-page.ts` can query things like `.outer` or `.inner` and get
back elements that actually live inside `<app-what-im-doing>`'s or
`<app-my-mission>`'s own templates.

The one mode where this would break is `ViewEncapsulation.ShadowDom`
(opt-in, rare) — that puts a component's content inside a real `ShadowRoot`,
which a plain `querySelectorAll` from outside cannot pierce. None of the
`hero-page` section components use it.
