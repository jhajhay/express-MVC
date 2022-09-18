class Rules{
	required(field){
		if(field === "" || field === null){
			return " is required!";
		}
		return true;
	}
	matches(field,param){
		if(field !== param){
			return " is not match!";
		}
		return true;
	}
	differs(field,param){
		if(field !== param){
			return " is the same as "+param+"!";
		}
		return true;
	}
	min_length(field,min){
		if(field.length < min){
			return " must be greater than or equal to "+min+" in length!";
		}
		return true;
	}
	max_length(field,max){
		if(field.length < max){
			return " must be less than or equal to "+max+" in length!";
		}
		return true;
	}
	exact_length(field,len){
		if(field.length < len){
			return " must be exactly "+len+" in length!";
		}
		return true;
	}
	greater_than(field,len){
		if(typeof field !== "number"){
			return " must be a number!";
		}else if(field < len){
			return " is not greater than "+len+"!";
		}
		return true;
	}
	greater_than_equal_to(field,len){
		if(typeof field !== "number"){
			return " must be a number!";
		}else if(field < len && field !== len){
			return " is not greater than or equal to "+len+"!";
		}
		return true;
	}
	less_than(field,len){
		if(typeof field !== "number"){
			return " must be a number!";
		}else if(field > len){
			return " is not less than "+len+"!";
		}
		return true;
	}
	less_than_equal_to(field,len){
		if(typeof field !== "number"){
			return " must be a number!";
		}else if(field > len && field !== len){
			return " is not less than or equal to "+len+"!";
		}
		return true;
	}
	in_list(field,list){
		if(!list.includes(field)){
			return " is not in the list!";
		}
		return true;
	}
	alpha(field){
		if(/^[a-zA-Z]+$/.test(field) === false){
			return " must contain alphabet characters only!";
		}
		return true;
	}
	alpha_numeric(field){
		if(/^[A-Za-z0-9]*$/.test(field) === false){
			return " must contain alphabet and number characters only!";
		}
		return true;
	}
	alpha_numeric_spaces(field){
		if(/^[A-Za-z\s]*$/.test(field) === false){
			return " must contain alphabet characters and spaces only!";
		}
		return true;
	}
	alpha_dash(field){
		if(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(field) === false){
			return " must contain alphabet and special characters only!";
		}
		return true;
	}
	numeric(field){
		if(/^[0-9]+$/.test(field)){
			return " must contain numeric characters only!";
		}
		return true;
	}
	integer(field){
		if(!Number.isInteger(field)){
			return " in not an integer!";
		}
		return true;
	}
	decimal(field){
		if(typeof field !== "number" || field+"".indexOf(".") !== -1){
			return " in not a decimal value!";
		}
		return true;
	}
	is_natural(field){
		if(!Number.isInteger(field)){
			return " in not a natural number!";
		}
		return true;
	}
	valid_url(url){
		var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
	    if(!!urlPattern.test(url) === false){
	    	return " has an invalid URL!";
	    }
	  	return true;
	}
	valid_email(email){
		let count = 0;
		for (let i = 0; i < email.length; i++) {
			if (email.charAt(i) === '@'){
				count++;
			}
		}
		
		if (count !== 1 || (email.split('@').length !== 2 && email.split('@')[1] === "")){
			return " is invalid email!";
		}
		return true;
	}
	valid_ip(ip){
		const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
		if(!regexExp.test(ip)){
			return " is an invalid IP!";
		}
		return true;
	}
}

module.exports = Rules;