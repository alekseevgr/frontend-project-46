install:
	npm ci
lint:
	npx eslint . --fix
publish:
	npm publish --dry-run
gendiff:
	node bin/gendiff.js -h	