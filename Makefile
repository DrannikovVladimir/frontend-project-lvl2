install:
	npm install

publish:
	npm publish --dry-run

run:
	npx babel-node 'src/bin/gendiff.js -f [json] ../before.json ../after.json'

link:
	sudo npm link

lint:
	npx eslint .

build:
	rm -rf dist
	npm run build

test:
	npm test

test-coverage:
	npm test -- --coverage

.PHONY: test
