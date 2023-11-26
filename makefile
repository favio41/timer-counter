local:
	npx http-server -c-1

tests:
	npx jest

tests-watch:
	nodemon main.test.mjs