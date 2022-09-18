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

## Ho to use?
1. Download this express MVC template
2. Edit configuration in `config.js` file
3. Create routes in `routes.js` file
4. Create controller in `controller` folder and create method for viewing the page
5. Create model in `model` folder
6. Create pages in `views` folder
7. Add your CSS file in `assets` folder

## To run?
* Open command promp
* Navigate your project folder
* type this command `nodemon app.js` 
