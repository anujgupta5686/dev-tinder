- Create a repository
- Initialize the repository
- node_modules, package.json, package.lock.json.
- Install express
- create a server
- listen to port 3000
- write request handler for /test, /hello
- install nodemon and update scripts inside package.json
- what are dependencies
- what is use of the "-g" while npm install
- Difference between caret and tilde (^ VS ~)

////Next Day work

- Initialize git
- gitignore
- create a remote repository on github
- push code in the remote repository
- play with routes and route extensions. ex. /hello, /test, /, hello/2, /xyz
- Install Postman Apps and make a workspace/collection > tes API call
- Make logic to handle GET. POST, DELETE, PATCH, PUT calls and test them on postman
- Explore Routing and use of ?, +, (), \* in the routing.
- Use of regex in routing /a/ /.\*fly$/
- how to reading query params in the routes
- Reading the dynamic routes.

- Multiple Route handler - play with the code
- next()
- next function and error along with res.send();
  app.use("route",rH,[rH1,rH2],rH3);
- Difference between app.all() and app.use()
- What is middleware and why do we need it?
- Write a dummy auth middleware for the admin
- Write a dummy auth middleware for the all user routes, except /user/login
- Error handling using app.use("/", (err, req, res, next) => {
  if (err) {
  res.status(500).send("Something went wrong");
  }
  });
