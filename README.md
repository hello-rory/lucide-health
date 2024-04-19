# lucide-health

Privately-run fork of [Lucide Icons](https://github.com/lucide-icons/lucide) which converts [healthicons](https://healthicons.org) to Lucide format.

## Usage

1. Download all icons from [healthicons.org](https://healthicons.org)
2. Place the `outline` and `filled` directories from the downloaded dir into `./scripts/healthIcons/downloads-here`
3. run `node ./scripts/healthIcons/healthIcons.mjs`
4. run `pnpm lucide-react build`
5. copy and paste `./packages/lucide-react/src` to wherever you need it.

## Credits

Thank you to all the people who contributed to Lucide and healthicons!

<a href="https://github.com/lucide-icons/lucide/graphs/contributors">
<img src="https://opencollective.com/lucide-icons/contributors.svg?width=890" /></a>
