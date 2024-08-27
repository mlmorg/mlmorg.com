# Personal Site

## Deploy docs

1. Make changes on master
2. `git checkout gh-pages`
3. `rm -rf *`
4. `git checkout master -- static`
5. `cp -a static/. .`
6. `rm -rf static`
7. `git add .`
8. `git commit "..."`
9. `git push origin gh-pages`