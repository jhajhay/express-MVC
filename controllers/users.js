const Controller = require('../system/core/controller.js');

class Users extends Controller{
	constructor(req,res){
		super(req,res);
	}

	async index(){
		this.view('index');
	}
}

module.exports = Users;
