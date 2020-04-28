install:
	npm install

start:
	node dist/bin/gendiff.js -f [json] before.json after.json

publish:
	npm publish --dry-run

link:
	sudo npm link

lint:
	npx eslint .

build:
	npm run build