MOCHA=@NODE_ENV=test ./node_modules/.bin/mocha

install:
	@NODE_ENV=development npm install .

test: install
	$(MOCHA) ./test/*.mocha.js

test-cov: install
	$(MOCHA) --require blanket --reporter html-cov ./test/*.mocha.js > coverage.html
	$(MOCHA) --require blanket --reporter travis-cov ./test/*.mocha.js

test-all: test test-cov

.PHONY: install test test-cov test-all
