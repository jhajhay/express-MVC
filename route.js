const route = {};

route['/'] = ['get','users','index'];
route['/logoff'] = ['get','users','logoff'];
route['/login'] = ['post','users','login'];
route['/register'] = ['post','users','register'];
route['/students/profile'] = ['get','users','profile'];

module.exports = route;