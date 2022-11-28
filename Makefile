start: dev
dev:
	pnpm run dev
build:
	pnpm run build
test:
	pnpm run test
test.watch:
	pnpm run test:watch
lint:
	pnpm package:lint
	pnpm run lint
lint.fix:
	pnpm package:fix
	pnpm run lint:fix
clean:
	pnpm run clean
install:
	pnpm install
cache:
	npm cache clean --force && yarn cache clean --all && pnpm store prune && pnpm prune && rm -rf $(pn store path) && rm -rf node_modules
cache.reload:
	deno task run cache:reload