const config = require('../../config.js');
module.exports = function profiler(req,res){
	return function(err,html){
		if (err !== null ){
			res.send(err);
		}
		const memory_process = require('process')
		const NS_PER_SEC = 1e9;
		const MS_PER_NS = 1e-6;
		const diff = process.hrtime(req.start_etime);
		let top = html.substr(0, html.indexOf("</body>"));
		let down = html.substr(html.indexOf("</body>"), html.length - 1);
		let get_data;
		let post_data = "";
		let session_data = "";
		let query_data = "";
		let memory_usage_data = "";
		let uri_data = "";
		let headers_data = "";
		let controller_data = "";
		let protocol = req.protocol;
	    let host = req.hostname;
	    let url = req.originalUrl;
	    let port = config.port;
		let fullUrl = `${protocol}://${host}:${port}${url}`

		uri_data +=  '<p><b>Protocol: </b>'+protocol+'</p>'
					+'<p><b>    Host: </b>'+host+'</p>'
					+'<p><b>     URL: </b>'+url+'</p>'
					+'<p><b>    Port: </b>'+port+'</p>'
					+'<p><b>     URI: </b>'+fullUrl+'</p>';

		controller_data += '<table style="border-collapse: collapse; text-align: left; color: #3FA796;">'
					 +'<thead>'
					 +'<tr>'
					 +'<th style="padding: 10px; text-align: center; border-bottom: 1px solid #3FA796;">Controller</th>'
					 +'<th style="padding: 10px; text-align: center; border-bottom: 1px solid #3FA796;">Method</th>'
					 +'</tr>'
					 +'</thead>'
					 +'<tbody>';

		for(let controller of req.session.controller_info){
		    controller_data += '<tr>'
							  +'<td style="padding: 10px;  border-bottom: 1px solid #3FA796;">'+controller[0]+'</td>'
							  +'<td style="padding: 10px; text-align: center; border-bottom: 1px solid #3FA796;">'+controller[1]+'</td>'
							  +'</tr>';
		}
		delete req.session.controller_info;
		controller_data += '</tbody>'
						  +'</table>';

		for (const [key,value] of Object.entries(req.headers)){
		    headers_data += '<p style="word-break: break-all; white-space: normal; word-wrap: break-word;"><b>'+key+': </b>'+value+'</p>';
		}

		if (Object.keys(req.params).length !==0){
			for (const [key,value] of Object.entries(req.params)){
			    get_data += '<p><b>'+key+': </b>'+value+'</p>';
			}
		}else{
			get_data = "No GET data exists";
		}

		if(Object.keys(req.body).length !==0){
			for (const [key,value] of Object.entries(req.body)){
			    post_data += '<p><b>'+key+': </b>'+value+'</p>';
			}
		}else if(req.session.hasOwnProperty('post') && Object.keys(req.session.post).length !== 0){
			for (const [key,value] of Object.entries(req.session.post)){
			    post_data += '<p><b>'+key+': </b>'+value+'</p>';
			}
			delete req.session.post;
		}else{
			delete req.session.post;
			post_data = "No POST data exists";
		}
		
		if(req.session.queries === undefined && req.mysql_queries === undefined){
			query_data = "No QUERY data exists";
		}else if(req.session.queries !== undefined && req.session.queries.length !==0){
			if(req.mysql_queries !== undefined && req.mysql_queries.length !==0){
				for(let query of req.mysql_queries){
					req.session.queries.push(query);
				}
				query_data += '<table style="border-collapse: collapse; text-align: left; color: #790252;">'
							 +'<thead>'
							 +'<tr>'
							 +'<th style="padding: 10px; text-align: center; border-bottom: 1px solid #790252;">Query</th>'
							 +'<th style="padding: 10px; text-align: center; border-bottom: 1px solid #790252;">Result size</th>'
							 +'</tr>'
							 +'</thead>'
							 +'<tbody>';
				for(let query of req.session.queries){
					query_data += '<tr>'
								 +'<td style="padding: 10px;  border-bottom: 1px solid #790252;">'+query[0]+'</td>'
								 +'<td style="padding: 10px; text-align: center; border-bottom: 1px solid #790252;">'+query[1]+'</td>'
								 +'</tr>'
				}
				query_data += '</tbody>'
							 +'</table>';
			}
		}else if(req.mysql_queries !== undefined && req.mysql_queries !==0){
			query_data += '<table style="border-collapse: collapse; text-align: left; color: #790252;">'
						 +'<thead>'
						 +'<tr>'
						 +'<th style="padding: 10px; text-align: center; border-bottom: 1px solid #790252;">Query</th>'
						 +'<th style="padding: 10px; text-align: center; border-bottom: 1px solid #790252;">Result size</th>'
						 +'</tr>'
						 +'</thead>'
						 +'<tbody>';
			for(let query of req.mysql_queries){
				query_data += '<tr>'
							 +'<td style="padding: 10px;  border-bottom: 1px solid #790252;">'+query[0]+'</td>'
							 +'<td style="padding: 10px; text-align: center; border-bottom: 1px solid #790252;">'+query[1]+'</td>'
							 +'</tr>'
			}
			query_data += '</tbody>'
						 +'</table>';
			req.mysql_queries = [];
		}
		delete req.session.queries;

		if(Object.keys(req.session).length !==0){
			for (const [key,value] of Object.entries(req.session)){
			    session_data += '<p><b>'+key+': </b>'+value+'</p>';
			}
		}else{
			session_data = "No SESSION data exists";
		}

		for (const [key,value] of Object.entries(process.memoryUsage())){
		    memory_usage_data += '<p><b>'+key.toUpperCase()+': </b>'+value/1000000+'MB</p>';
		}

		let benchmark = '<fieldset style="display: block; width: 1000px; margin: auto; margin-top: 100px; margin-bottom: 30px; color: red; border: 3px solid red; padding: 10px;">'
							+'<legend style="font-size: 25px; font-weight: bolder;">BENCHMARK</legend>'
							+'<p><b>Total execution time:</b> '+(diff[0] * NS_PER_SEC + diff[1])  * MS_PER_NS+' milliseconds</p>'
						+'</fieldset>';
		let get = '<fieldset style="display: block; width: 1000px; margin: auto; margin-bottom: 30px; color: orange; border: 3px solid orange; padding: 10px;">'
							+'<legend style="font-size: 25px; font-weight: bolder;">GET DATA</legend>'
							+get_data
						+'</fieldset>';
		let memory_usage = '<fieldset style="display: block; width: 1000px; margin: auto; margin-bottom: 30px; color: #D800A6; border: 3px solid #D800A6; padding: 10px;">'
							+'<legend style="font-size: 25px; font-weight: bolder;">MEMORY USAGE</legend>'
							+memory_usage_data
						+'</fieldset>';
		let post = '<fieldset style="display: block; width: 1000px; margin: auto; margin-bottom: 30px; color: green; border: 3px solid green; padding: 10px;">'
							+'<legend style="font-size: 25px; font-weight: bolder;">POST DATA</legend>'
							+post_data
						+'</fieldset>';
		let session = '<fieldset style="display: block; width: 1000px; margin: auto; margin-bottom: 30px; color: blue; border: 3px solid blue; padding: 10px;">'
							+'<legend style="font-size: 25px; font-weight: bolder;">SESSION DATA</legend>'
							+session_data
						+'</fieldset>';
		let query = '<fieldset style="display: block; width: 1000px; margin: auto; margin-bottom: 30px; color: #790252; border: 3px solid #790252; padding: 10px;">'
							+'<legend style="font-size: 25px; font-weight: bolder;">MYSQL QUERY DATA</legend>'
							+query_data
						+'</fieldset>';
		let uri = '<fieldset style="display: block; width: 1000px; margin: auto; margin-bottom: 30px; color: #F94892; border: 3px solid #F94892; padding: 10px;">'
							+'<legend style="font-size: 25px; font-weight: bolder;">URI DATA</legend>'
							+uri_data
						+'</fieldset>';
		let headers = '<fieldset style="display: block; width: 1000px; margin: auto; margin-bottom: 30px; color: #C55300; border: 3px solid #C55300; padding: 10px;">'
							+'<legend style="font-size: 25px; font-weight: bolder;">HEADERS DATA</legend>'
							+headers_data
						+'</fieldset>';
		let controller = '<fieldset style="display: block; width: 1000px; margin: auto; margin-bottom: 30px; color: #3FA796; border: 3px solid #3FA796; padding: 10px;">'
							+'<legend style="font-size: 25px; font-weight: bolder;">CONTROLLER/METHOD DATA</legend>'
							+controller_data
						+'</fieldset>';
		let profiler_list = {
		    benchmark: benchmark,
		    get: get,
		    memory_usage: memory_usage,
		    post: post,
		    session: session,
		    query: query,
		    uri: uri,
		    headers: headers,
		    controller: controller
		}

	    req.start_etime = process.hrtime();
	    for (const [key,value] of Object.entries(config.ProfilerList)){
	    	if(value){
	    		top += profiler_list[key];
	    	} 
		}
		res.send(top+down);
	}
}