start: dev
dev:
	pnpm run dev
build:
	pnpm run build
test.watch:
	pnpm run test:watch
lint:
	pnpm package:lint
	pnpm run lint
lint.fix:
	pnpm package:fix
	pnpm run lint:fix
lint.watch:
	pnpm run lint:watch
clean:
	pnpm run clean
install:
	pnpm install

### => Ooneex app <- ###
apps.ooneex.dev:
	cd apps/ooneex && deno task dev
apps.ooneex.test:
	cd apps/ooneex && deno task test
### -> Ooneex app <- ###

### => Packages <- ###
packages.test:
	cd packages && deno task test
### -> Packages <- ###

#cache.clean:
	#npm cache clean --force && yarn cache clean --all && pnpm store prune && pnpm prune && rm -rf $(pn store path) && rm -rf node_modules
