const Express = require("express");
const route = require("../../route");
const Router = Express.Router();



function Controller_loader(c_name,c_method){
	return function(req,res){
		if (req.session.controller_info === undefined){
			req.session.controller_info = [];
			req.session.controller_info.push([c_name,c_method]);
		}else{
			let flag = 0;
			for(let controller of req.session.controller_info){
			    if(controller[0].includes(c_name) && controller[1].includes(c_method)){
			    	flag = 1;
			    	break;
			    }
			}
			if(flag === 0){
				req.session.controller_info.push([c_name,c_method]);
			}
		}
		const controller = require("../../controllers/"+c_name);
		new controller(req,res)[c_method]();
	}
}

for(let key in route){
	if(Array.isArray(route[key][1]) === true){
		Router[route[key][0]](key, route[key][1], Controller_loader(route[key][2],route[key][3]));
	}else{
		Router[route[key][0]](key, Controller_loader(route[key][1],route[key][2]));
	}
}

module.exports = Router;