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

- Create a free cluster on mongodb official website (MongoDB Atlas)
- Install mongoose library
- Connect you application to the database "Connection-url"/devTinder
  Call the connectDB function and connect to database before starting application on specific PORT.
  - Create the userSchema and user Model
- Create POST /signup API to add daat to the database
- Push some documents using API call from postman
- Make sure when make API then wrap all code inside the try catch block. It's very easy to detect any error during the data insertion.
- Error handling using try catch
- JS Object vs JSON (Difference)
Add the express.json middleware to your app
Make your signup API dynamic to receive data from the postman/end user
- Make your signup API dynamic to receive data from the end user.
- User.findOne() with Duplicate email IDs, which object returned.
- API - Get user by Email ID
- API - Feed API - GET/feed - get all the users from the database.
- Get user By ID.
- Difference Between PUT and PATCH
- API - Update a user
- Explore the Mongoose Documents for Model methods.
- What are option in a model.findOneAndUpdate method, Explore more about it. 
- API - Update the user with email ID.
- Explore schema types options from the documentation
- Add required, unique, lowercase, minLength, trim.
- Add default value.
- Create custorm validate function
for gender. 
- Improve the DB schema - PUT all appropiate validations on each field un schema.
- Add timestamp to the user Schema
- Add API level validation on PATCH and PUT Request and Signup Post API.
- Add API validation for each field.
- Data Sanitization - Add API validation for each.
- Install Joi Library and use Email,Password and URL validation. 