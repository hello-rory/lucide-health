# lucide-health

Privately-run fork of [Lucide Icons](https://github.com/lucide-icons/lucide) which converts [healthicons](https://healthicons.org) to Lucide format.

## Usage

1. Download all icons from [healthicons.org](https://healthicons.org)
2. Place the `outline` and `filled` directories from the downloaded dir into `./scripts/healthIcons/downloads-here`
3. run `node ./scripts/healthIcons/healthIcons.mjs`
4. run `pnpm lucide-react build`
5. copy and paste `./packages/lucide-react/src` to wherever you need it.

## Notes

Basic overview of changes from fork:

1. changes icon default `viewBox` from '0 0 24 24' to '0 0 48 48'
2. changes icon default `strokeWidth` from 1 to 2.
3. removes duplicate icon children instead of throwing build errors
4. camelCases svg children attributes
5. only supports react package

## Credits

Thank you to all the people who contributed to Lucide and healthicons!

<a href="https://github.com/lucide-icons/lucide/graphs/contributors">
<img src="https://opencollective.com/lucide-icons/contributors.svg?width=890" /></a>
