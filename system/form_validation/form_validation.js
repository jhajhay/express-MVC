const Rules = require("../form_validation/rules.js");

class FormValidation extends Rules{
	constructor(){
		super();
		this.rule_list = ["required","matches","differs","min_length","max_length","exact_length","greater_than","greater_than_equal_to","less_than","less_than_equal_to","in_list","alpha","alpha_numeric","alpha_numeric_spaces","alpha_dash","numeric","integer","decimal","is_natural","valid_url","valid_email","valid_ip"];
		this.no_param_rules = ["required","alpha","alpha_numeric","alpha_numeric_spaces","alpha_dash","numeric","integer","decimal","is_natural","valid_url","valid_email"];
		this.has_param_rules = ["matches","differs","min_length","max_length","exact_length","greater_than","greater_than_equal_to","less_than","less_than_equal_to","in_list","valid_ip"];
		this.errors = [];
		this.temp_errors = [];
		this.syntax_errors = [];
		this.rules = [];
		this.run = 0;
	}
	set_rules(field,label,rules){
		let flag = 0;
		for(let rule of this.rules){
			if(rule.label === label){
				rule.field = field;
				flag = 1;
				break;
			}
		}
		if (flag === 0){
			let result = this.check_rules(rules);
			if (result === "clear"){
				this.rules.push({
					field: field,
					label: label,
					rules: rules
				})
			}else{
				console.log(result.stack);
			}
		}
	}
	validate(){
		if(this.syntax_errors.length === 0){
			this.errors = [];
			for(let element of this.rules){
				for(let rule of element.rules){
					if(this.no_param_rules.includes(rule[0])){
						let result = this[rule[0]](element.field);
						if(result !== true){
							this.errors.push(element.label+result);
							break;
						}
					}else if(this.has_param_rules.includes(rule[0])){
						let result = this[rule[0]](element.field,rule[1]);
						if(result !== true){
							this.errors.push(element.label+result);
							break;
						}
					}
				}
			}
			if(this.errors.length !== 0){
				return false;
			}
			return true;
		}else{
			console.log(this.syntax_errors);
		}
	}
	check_rules(rules){
		for(let rule of rules){
			if(rule.length === 0){
				this.syntax_errors.push(new Error("There must no empty rule!"));
				return new Error("There must no empty rule!");
				break;
			}
			if(!this.rule_list.includes(rule[0])){
				this.syntax_errors.push(new Error("\""+rule[0]+"\" is an Invalid rule!"));
				return new Error("\""+rule[0]+"\" is an Invalid rule!");
				break;
			}
			if(this.no_param_rules.includes(rule[0]) && rule.length > 1){
				this.syntax_errors.push(new Error("\""+rule[0]+"\" don't accept any parameter!"));
				return new Error("\""+rule[0]+"\" don't accept any parameter!");
				break;
			}
			if(this.has_param_rules.includes(rule[0]) && rule.length !== 2){
				this.syntax_errors.push(new Error("\""+rule[0]+"\" don't accept more than or less than 1 parameter!"));
				return new Error("\""+rule[0]+"\" don't accept more than or less than 1 parameter!");
				break;
			}
			if(rule[0] === "is_unique" && Array.isArray(rule[1]) === false){
				this.syntax_errors.push(new Error(rule[0]+"rule must have an array parameter!"));
				return new Error(rule[0]+"rule must have an array parameter!");
				break;
			}else if(rule[0] === "is_unique" && rule[1].length !== 2){
				this.syntax_errors.push(new Error(rule[0]+" rule must have 2 parameters!"));
				return new Error(rule[0]+" rule must have 2 parameters!");
				break;
			}
			if(rule[0] === "in_list" && Array.isArray(rule[1]) === false){
				this.syntax_errors.push(new Error(rule[0]+"rule must have an array parameter!"));
				return new Error(rule[0]+"rule must have an array parameter!");
				break;
			}
		}
		return "clear";
	}
}

module.exports = FormValidation;