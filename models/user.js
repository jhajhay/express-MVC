const Model = require("../system/core/model.js");

class User extends Model{
	constructor(req,res){
		super(req,res);
	}

	get_all(){
		let query = "SELECT * FROM users";
		return this.query(query);
	}

	validate_registration(data){
		this.form.set_rules(data.first_name,"First Name",[
				["required"],
				["min_length",2]
			]);
		this.form.set_rules(data.last_name,"Last Name",[
				["required"],
				["min_length",2]
			]);
		this.form.set_rules(data.email,"Email",[
				["required"],
				["valid_email"]
			]);
		this.form.set_rules(data.password,"Password",[
				["required"],
				["min_length",8]
			]);
		this.form.set_rules(data.confirm_password,"Confirm Password",[
				["required"],
				["matches",data.password]
			]);
		if(this.form.validate()){
			return true;
		}else{
			return this.form.errors;
		}
	}

	validate_login(data){
		this.form.set_rules(data.email,"Email",[
				["required"],
				["valid_email"]
			]);
		this.form.set_rules(data.password,"Password",[
				["required"]
			]);
		if(this.form.validate()){
			return true;
		}else{
			return this.form.errors;
		}
	}

	validate_password(password1,password2){
		return this.security.decrypt(password1,password2);
	}

	create_user(data){
		let query = "INSERT INTO users(first_name, last_name, email, password, created_at) VALUES (?,?,?,?,?)";
		let values = [
			data.first_name,
			data.last_name,
			data.email,
			this.security.encrypt(data.password),
			new Date().toISOString().slice(0, 19).replace('T', ' ')
		];
		return this.query(query,values);
	}

	is_unique(email){
		return this.query("SELECT email FROM users WHERE email = '"+email+"'");
	}

	get_user_by_email(email){
		return this.query("SELECT * FROM users WHERE email = '"+email+"'");
	}

	get_user_by_id(id){
		return this.query("SELECT * FROM users WHERE id = ?",[id]);
	}
}

module.exports = User;