install:
	npm install

start:
	node src/bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .
