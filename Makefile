install:
	npm install

publish:
	npm publish --dry-run

link:
	sudo npm link

unlink:
	sudo npm unlink

lint:
	npx eslint .

build:
	rm -rf dist
	npm run build

test:
	npm test

test-coverage:
	npm test -- --coverage

run:
	npx babel-node src/bin/gendiff.js -f nested '__fixtures__/first.ini' '__fixtures__/second.ini'
