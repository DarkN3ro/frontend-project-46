install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx jest

jest-coverage:
	npx jest --coverage

test-coverage:
	npm test -- --coverage --coverageProvider=v8