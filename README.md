# Project Hub - Front

Project Hub is a system that makes it possible to create a project with a title and description that can be liked by users, growing up the engagement and support of the community. The idea behind the code came from this [gist](https://gist.github.com/exageraldo/79c9ed99bf3a02bfbde9c517caa2b478).


To use this project on your own machine, you will need the backend from this [repository](https://github.com/matheus-pessoa16/flask-api). To execute the backend, follow the steps described in the repository.

To execute on localhost, follow these steps with the backend executing.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

To deploy the project to Github pages you'll need

### Change Github repository

Search for the line below in the file ```deploy.sh```

```
git push -f git@github.com:matheus-pessoa16/project-front.git master:gh-pages
```

Put your own Github domain and repository after the @ and create a gh-pages branch. 

```
git checkout -b gh-pages
```

### Run the command
```
npm run deploy
```



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)