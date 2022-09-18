const Controller = require('../system/core/controller.js');

class Users extends Controller{
	constructor(req,res){
		super(req,res);
		this.model('User');
	}

	async index(){
		if (this.session('user_id') === undefined){
			this.view('users/index',{register_errors: this.flash('register_errors'), login_errors: this.flash('login_errors')});
		}else{
			this.redirect('/students/profile');
		}
	}

	async logoff(){
		this.delete_session('user_id');
		this.redirect('/');
	}

	async profile(){
		if (this.session('user_id') !== undefined){
			let user = await this.User.get_user_by_id(this.session('user_id'));
			this.view('users/profile',user[0]);
		}else{
			this.redirect('/');
		}
	}

	async login(){
		let is_valid = this.User.validate_login(this.post.data());
		if(is_valid === true){
			let user = await this.User.get_user_by_email(this.post.data('email'));
			if(user.length === 0){
				this.flash('login_errors',['Email is incorrect!']);
				this.redirect('/');
			}else{
				let is_match = await this.User.validate_password(this.post.data('password'),user[0].password);
				if(is_match === false){
					this.flash('login_errors',['Password is incorrect!']);
					this.redirect('/');
				}else{
					this.delete_session('login_errors');
					this.session('user_id',user[0].id);
					this.redirect('/students/profile');
				}
			}
		}else{
			this.flash('login_errors',is_valid);
			this.redirect('/');
		}
	}

	async register(){
		let is_valid = this.User.validate_registration(this.post.data());
		if(is_valid === true){
			let email = await this.User.is_unique(this.post.data('email'));
			if(email.length !== 0){
				this.flash('register_errors',['Email is not unique!']);
				this.redirect('/');
			}else{
				await this.User.create_user(this.post.data());
				let user = await this.User.get_user_by_email(this.post.data('email'));
				this.delete_session('register_errors');
				this.session('user_id',user[0].id);
				this.redirect('/students/profile');
			}
		}else{
			this.flash('register_errors',is_valid);
			this.redirect('/');
		}
	}
}

module.exports = Users;