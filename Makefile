install:
	npm ci
lint:
	npx eslint . --fix
test:
	npm test
publish:
	npm publish --dry-run
gendiff:
	node bin/gendiff.js