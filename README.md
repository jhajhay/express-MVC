# express-MVC
This MVC is one of the project I made in my training in Village88. I use NodeJS and express to build this MVC.
## Folders
1. **assets** - it is a folder for static files like images, JS, and CSS.
2. **controllers** - this folder is for all controllers that the user will going to create.
3. **model**s - this folder if for all models that the user will going to create.
4. **node_modules** - this folders contain nodeJS modules.
5. **system** - this foldel is the most important folder of the MVC. It contains sub folder named core and form_validation.
   * **core** - this is the brain of the whole MVC. It has files like controller for managing all controllers made, model that will manage all models, routes file that will handle created routes and profiler for showing the profile information.
   * **form_validation** - contains the form_validation file that will be used for form validation feature of the MVC and rules file that contains all available validation method.
6. **views** - this folder will contain all ejs file template.

## Files
1. **app.js** - this file runs the server and other configuration.
2. **config.js** - this file contains all app configuration. It can be editable based on the user preference
3. **package.json** - this file contains project information including the author and installed modules.
4. **package-lock.json** - this file contains all all modules information
5. **route.js** - this file will contains all users created routes.
6. **controller.js** - this file contains the controller class that extended for all created controllers. This file should not be editted because it is one of the core file of the MVC. It manages all created controllers as well as rendering and redirecting pages. It also handle sessions data and data encryption. 
7. **model.js** - this file contains the model class that extended for all created models. This file should not be editted because it is one of the core file of the MVC. It manages all created models as well as validation of forms and and queries.
8. **routes.js** - this file is also one of the system file that should not be editted. This file manages all routes created by the user.
9. **profiler.js** - this file is also one of the system file that should not be editted. This file manages all profiler output if the profiler is enabled. 
10. **form_validation.js** - this file is also one of the system file that should not be editted. This file manages all form validation as well as setting rules for inputs.
11. **rules.js** - this file is also one of the system file that should not be editted. This file contains all validation rule methods.

## How to use?
#### 1. Download this express MVC template [here](https://github.com/jhajhay/express-MVC/archive/refs/heads/master.zip)
#### 2. Edit configuration in ``config.js`` file
- You can set some configurations for database, session, cookieSession, enableProfiler, csrf, bodyParser and port.
    ##### Default Configuration: 
    ```
    config["database"] = {
        "host": "localhost",
        "user": "",
        "password": "",
        "database": "",
        "port": 3306
    };
    
    config["session"] = {
        secret: 'keyboardkitteh',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
    };
    
    config["cookieSession"] = {
      name: 'session',
      secret: 'express',
      maxAge: 24 * 60 * 60 * 1000
    }
    
    config["enableProfiler"] = false;
    config["ProfilerList"] = {
        benchmark: true,
        get: true,
        memory_usage: true,
        post: true,
        session: true,
        query: true,
        uri: true,
        headers: true,
        controller: true
    }
    
    config["csrf"] = { cookie: true };
    config["bodyParser"] = { extended: true };
    config["cookieParserKey"] = "secret";
    config["port"] = 8888;
    ```
### 3. Create routes in `routes.js` file
- In `routes.js` you can add some routes that are being stored in the route object variable. The syntax for adding is `route[<path>] = [<request method>,<controller>,<controller method>]` for example `route['/'] = ['get','users','index']`.
- Routes can also include Middleware. The syntax if there is addition middleware is `route[<path>] = [<request method>,[<middlewares here>], <controller>,<controller method>]` for example `route['/'] = ['get',[csrfMiddleware,otherMiddleware],'users','index']`.
### 4. Create controller in `controller` folder and create method for viewing the page
- After creating a controller file, `const Controller = require('../system/core/controller.js');` add first this code in the first line of the file. After adding that, you can now make your controller class using ES6 syntax like this:
    ```
    class Mycontroller extends Controller{
    	constructor(req,res){
    		super(req,res);
    	}
    
    	async index(){
    		this.view('index')
    	}
    }
    ```
- Notice that it has constructor method that has a `req`(request) and `res` (response) arguments that pass to the parent class(Controller) using `super()` method. This constructor method must be present in every controllers.
- After adding some logic in the controller, exporting it as a module is a must. To export it you must include this code `module.exports = Mycontroller` at the last part of your file.
    #### Final output
    ```
    const Controller = require('../system/core/controller.js');
    
    class Mycontroller extends Controller{
    	constructor(req,res){
    		super(req,res);
    	}
    
    	async index(){
    		this.view('index')
    	}
    }
    
    module.exports = Mycontroller;
    ```
- **Built-in functions that can use in every controller**
    - `this.post.data()` - it is method for getting the post data inside the `request.body` object. To get all the post data, the syntax is `this.post.data()` that will return an object consist of post data. For getting specific post data for example the value of first_name input the syntax is like this `this.post.data('first_name')` then it will return the value of first_name field.
    - `this.get.data()` - it is a method for getting the get data inside the `request.params` object. To get the data, the syntax is `this.get.data()` is getting all data and `this.get.data('id')` for specific data.
    - `this.model()` - it is a method for loading specific model. You can include it after calling `super(req,res)` inside the constructor of your controller. The syntax is `this.model('Mymodel')`. After loading the model, you can now use the methods inside your loaded model like this `this.Mymodel.get_all_users()`.
    - `this.view()` - it is a method for rendering a view page. It takes two parameters, the view file name and the object data to be pass(optional). The syntax is like this `this.view('index',{data: "pass this data"})`.
    - `this.redirect()` - it is a method for redirecting to a view page. It takes one parameter which is the route to be redirected. The syntax is like this `this.redirect('/')` that will be redirected to the default page that has a route like this '/'.
    - `this.session()` - it is a method for creating and getting a session. For creating session the syntax is like this `this.session('mysession','data')`. It takes two parameters which is the session key name and the data to be stored. To get the session data, the syntax is like this `this.session('mysession')` that takes one parameter which is the session key.
    - `this.delete_session()` - it is a method for deleting a session. The syntax is like this `this.delete_session('mysession')` that takes the key name to be deleted as a parameter.
    - `this.flash()` - it is a method for creating a flash session. Flash session is a session that will be deleted after using it. The syntax for this is like creating a session but instead of using session keyword, flash keyword must be use like this `this.flash('mysession','data')` for creating and `this.flash('mysession')` for getting the flash data.
- **Important to know**
    - `async` and `await` - since javascript execute the program asynchronously, `async` and `await` must be use in your controller especially when connecting to the database. For example, you want to get all the users data in the database. The first thing you will do is to load the model using `this.model('Users')`. Then create `get_users` method in the model that has some logic to get the data in the database. Furthermore, you will now call the model method in the controller and store it to a variable `result` and the code will look like this `let result = this.Users.get_users();`. This code will return a `promise` instead of the data you expected because this is how javascript works. To get the expected data, you must wait the `promise` to be done by adding `async` to the method and `await` to the called model method. Your controller method will look like this now:
        ```
        async fetch(){
            let result = await this.Users.get_users();
            some code here....
        }
        ```
    - `this.req` and `this.res` - to preserve the original syntax of express, you can use the `this.req` and `this.res` object to access some functionality in the request and response object like `this.res.render()`, `this.res.redirect()`, `this.req.body()`, `this.req.params()` and many more.
    - Use ES6 syntax in creating methods.
### 5. Create model in `model` folder
- After creating a model file, the first thing you must do is to include import the parent model class using this syntax `const Model = require("../system/core/model.js");`. After that you can now create your model by extending the `Model` you imported and add the constructor. The code must look like this:
    ```
    class Mymodel extends Model{
    	constructor(req,res){
    		super(req,res);
    	}
    }
    ```
- Notice that its like creating a controller that needs to have a constructor that pass the request and response to the parent class(Model).
- You can now create some methods inside your model using the ES6 syntax.
- The most important part of creating model is to have it exported as a module. The code must look like this `module.exports = Mymodel;`
- **Built-in functions that can use in every model**
    - `this.form.set_rules()` - it is a method for form validation. It is used to set rules before validation. To set a rule the syntax is like this `this.form.set_rules(data.password,"Password",[["required"],["min_length",8]]);`, the first parameter is the data to be validated, second parameter is the Field name use for error handling, the third parameter is an array containing the rules.
    - `this.form.validate()` - it is a method for form validation. It is the final process in form validation. It validate all the data that has been set and return true if valid and return false if not valid. The syntax is simply like this `this.form.validate()`.
    - `this.errors` - it is a variable that contains all validation errors.
    - `this.security.encrypt()` - it is a method for encrypting data using the `bcryptjs` module. It takes one parameter which is the data to be encrypted and the syntax of it is like this `this.security.encrypt(password)`.
    - `this.security.decrypt()` - it is a method for decrypting data and return true or false. It takes two parameter, the data to be compared and the encrypted data using `this.security.encrypt()`. The syntax is like this `this.security.decrypt(password,password_from_db)` and it will return true if they are the same and false if not.
    - `this.query()` - it is a method for querieng data to database. It takes two parameter which is the query string and array data for parameterized query. The syntax of this method is like this `this.query(query_string, data_array)`
- **Form Validation Rules**
    |   Rules  | Syntax | Has Parameter | Description |
    | -------- | ------ | ----------|------------|
    | required | ["required"] | No | Returns error message if the form element is empty.
    | matches | ["matches", data] | Yes | Returns error message if the form element does not match the one in the parameter.
    | differs  | ["differs", data]  | Yes  | Returns error message if the form element does not differ from the one in the parameter.  |
    | min_length  | ["min_length", length]  | Yes  | Returns error message if the form element is shorter than the parameter value.  |
    | max_length  | ["max_length", length]  | Yes  | Returns error message if the form element is longer than the parameter value.  |
    | exact_length  | ["exact_length", length]  | Yes  | Returns error message if the form element is not exactly the parameter value.  |
    | greater_than  | ["greater_than", number]  | Yes  | Returns error message if the form element is less than or equal to the parameter value or not numeric.  |
    | greater_than_equal_to  | ["greater_than_equal_to", number]  | Yes  | Returns error message if the form element is less than the parameter value, or not numeric.  |
    | less_than  | ["less_than", number]  | Yes  | Returns error message if the form element is greater than or equal to the parameter value or not numeric.  |
    | less_than_equal_to  | ["less_than_equal_to", number]  | Yes  | Returns error message if the form element is greater than the parameter value, or not numeric.  |
    | in_list  | ["in_list", array_list]  | Yes  | Returns error message if the form element is not within a predetermined list.  |
    | alpha  | ["alpha"]  | No  | Returns error message if the form element contains anything other than alphabetical characters.  |
    | alpha_numeric  | ["alpha_numeric"]  | No  | Returns error message if the form element contains anything other than alpha-numeric characters.  |
    | alpha_numeric_spaces  | ["alpha_numeric_spaces"]  | No  | Returns error message if the form element contains anything other than alpha-numeric characters or spaces. Should be used after trim to avoid spaces at the beginning or end.  |
    | alpha_dash  | ["alpha_dash"]  | No  | Returns error message if the form element contains anything other than alpha-numeric characters, underscores or dashes.  |
    | numeric  | ["numeric"]  | No  | Returns error message if the form element contains anything other than numeric characters.  |
    | integer  | ["integer"]  | No  | Returns error message if the form element contains anything other than an integer.  |
    | decimal  | ["decimal"]  | No  | Returns error message if the form element contains anything other than a decimal number.  |
    | is_natural  | ["is_natural"]  | No  | Returns error message if the form element contains anything other than a natural number: 0, 1, 2, 3, etc.  |
    | valid_url  | ["valid_url"]  | No  | Returns error message if the form element does not contain a valid URL.  |
    | valid_email  | ["valid_email"]  | No  | Returns error message if the form element does not contain a valid email address.  |
    | valid_ip  | ["valid_ip"]  | No  | Returns error message if the supplied IP address is not valid. |
### 6. Create pages in `views` folder
- Created file in views must be an ejs file extension
### 7. Add your static file in `assets` folder
- Static files like images, css, js and many more must be placed in the `assets` folder.

## How to run?
* Open command promp
* Navigate your project folder
* Type this command `nodemon app.js` 
* Open browser and enter the URL `localhost:<port here>/<route here>`
