const Model = require("../system/core/model.js");

class User extends Model{
	constructor(req,res){
		super(req,res);
	}

	get_all(){
		let query = "SELECT * FROM users";
		return this.query(query);
	}
}

module.exports = User;
