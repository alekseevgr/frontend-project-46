install:
	npm ci
lint:
	npx eslint . --fix
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
publish:
	npm publish --dry-run
gendiff:
	node bin/gendiff.js