YARN := cd app && yarn

dev: install
	$(YARN) dev

install:
	$(YARN)

format: install
	$(YARN) format

stash:
	git add .
	git stash
	
pop:
	git stash pop

commit-changes:
	git commit -a -m "Auto-commit" || echo ""

patch: stash format commit-changes pop
	$(YARN) version --patch
