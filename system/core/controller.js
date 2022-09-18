const config = require('../../config.js');
const profiler = require('.././core/profiler.js');
class Controller{
	constructor(req,res){
		this.req = req;
		this.res = res;
		this.post = {
			data: function(){
				if (arguments.length === 1){
					return req.body[arguments[0]];
				}
				return req.body;
			}
		}
		this.get = {
			data: function(){
				return req.params[arguments[0]];
			}
		}
	}
	model(model){
		let model_module = require("../../models/"+model.toLowerCase()+".js");
		this[model] = new model_module(this.req,this.res);
	}
	view(page,data){
		if(config.enableProfiler){
			this.res.render(page,data,profiler(this.req,this.res));
		}else{
			this.res.render(page,data);
		}
		
	}
	redirect(route){
		if(this.req.mysql_queries !== undefined){
			this.session("queries",this.req.mysql_queries);
		}
		this.session("post",this.req.body);
		this.res.redirect(route);
	}
	session(name,value){
		this.req.session[name] = value;
	}
	session(){
		if (arguments.length === 2){
			this.req.session[arguments[0]] = arguments[1];
		}else{
			return this.req.session[arguments[0]];
		}
	}
	delete_session(){
		delete this.req.session[arguments[0]];
	}
	flash(){
		if (arguments.length === 2){
			this.req.session[arguments[0]] = arguments[1];
		}else{
			let flash = this.req.session[arguments[0]];
			delete this.req.session[arguments[0]];
			return flash;
		}
	}
}

module.exports = Controller;

