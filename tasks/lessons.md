# Lessons

## react-leaflet swallows `pathOptions.className` (2026-08-19)

`<CircleMarker pathOptions={{ className: '...' }}>` looks like it sets a class
on the rendered `<path>`. It does not. react-leaflet constructs the Leaflet
layer from the props *minus* `pathOptions`, so `className` is absent when
Leaflet's `_initPath` reads it; afterwards the only thing react-leaflet does
with `pathOptions` is call `setStyle`, which writes presentation attributes and
never touches the class list.

The failure is silent and total: the CSS file looks correct, the component
looks correct, and nothing throws — the rules simply never match. It went
unnoticed long enough for a whole marker state system (entrance stagger, hover
and active scale, match/dim treatment) to be written against classes that were
never applied.

Sync the class list onto `marker._path` yourself (`syncPathClass` in
MapView.tsx) and leave Leaflet's own classes alone.

**General form:** when styling is driven through a library's option bag rather
than the DOM, assert once in a browser that the attribute actually landed.
`document.querySelectorAll('.your-class').length` in a real page would have
caught this in seconds.

## Don't store precision you can't source (2026-08-19)

`firms.ts` carried a distinct lat/lng per firm, clustered around the right
cities but hand-written — `59.362, 18.044` reads as a street address and was
not sourced from anything. It survived review because fabricated coordinates
look exactly like real ones.

Coordinates now come from one `CITY_COORDS` table at the precision that is
actually citable, with `precision` and `address` recording what is known. The
popup says "no street address on record" rather than letting the dot imply one.
