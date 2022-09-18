const config = require('../../config.js');
const bcrypt = require('bcryptjs');
const Mysql = require('mysql');
const Form = require("../form_validation/form_validation.js");

class Model{
	constructor(req,res){
		this.req = req;
		this.res = res;
		this.connection = req.connection;
		this.form = new Form();
		this.security = {
			encrypt: function(data){
				var salt = bcrypt.genSaltSync(10);
				return bcrypt.hashSync(data, salt);
			},
			decrypt: function(data1,data2){
				return bcrypt.compare(data1, data2);
			}
		}
	}
	query(query, data){
		let query_format = Mysql.format(query+';',data);
		this.req.mysql_queries = [];

		return this.executeQuery(query_format,this.req,this.res).then(function(result){
					let query_data = [];
					if(result.length > 1){
						for(let data of result){
						    query_data.push(JSON.parse(JSON.stringify(data)));
						}
					}else if (result.length === 1){
						query_data.push(JSON.parse(JSON.stringify(result[0])));
					}
					return query_data;
				}).catch((err)=>{ 
					let sql_error  = '<table style="width: 800px; margin: auto; border-collapse: collapse; margin-top: 100px; border: 3px solid black; border-raduis: 10px; padding: 20px; text-align: left;">';
					for (const [key,value] of Object.entries(err)){
					    sql_error += '<tr>'
					    			+'<th style="paddingt: 10px; padding-left: 10px; text-align: right; border: 1px solid black;">'+key+': </th>'
					    			+'<td style="padding: 10px;  border: 1px solid black;">'+value+'</td>'
					    			+'</tr>';
					}
					sql_error += '</table>';
					this.res.end(sql_error);
				});
	}
	executeQuery(query,req,res){
		return new Promise((resolve,reject) => {
	        this.connection.query(query, function (err, result) {
	            if (err){
	                reject(err);
	            }else{
	            	req.mysql_queries.push([query,result.length]);
	                resolve(result);
	            }
	        }); 
	    });
	}
}

module.exports = Model;