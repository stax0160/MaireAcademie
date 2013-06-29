// Generated by CoffeeScript 1.6.1
(function(){var e;e={io:null,redis:require("redis"),redisWorker:null,fs:null,httpServer:null,express:null,config:{port:8080,redisHost:"top.30mars.ca",redisPort:6379,wwwPath:"./../",tickerMaxLength:20,twilio:{responses:{intro:"./twilio/intro.xml",outro:"./twilio/outro.xml"}},updateStatsTimer:7e3},stats:{laval:{likes:0,votes:0,total:0},montreal:{likes:0,votes:0,total:0},longueuil:{likes:0,votes:0,total:0},quebec:{likes:0,votes:0,total:0}},tickerData:[],init:function(t){var n;t!=null&&(this.config=this._mergeOptions(this.config(t)));this.fs=require("fs");n=require("express");this.express=n.call(this);this.httpServer=require("http").createServer(this.express);this.httpServer.listen(this.config.port);this.io=require("socket.io").listen(this.httpServer);this.io.set("log level",1);this.express.get("/api/*",this._handleAPICalls);this.express.post("/api/*",this._handleAPICalls);this.express.get("/*",this._handleHttpRequest);this.express.use(n.bodyParser());this.express.use(function(e,t,n,r){console.error(e.stack);return n.send(500,"Oops ! Something went super wrong.")});this.redisWorker=this.redis.createClient(e.config.redisPort,e.config.redisHost);setInterval(function(){e._updateCityStats("laval");e._updateCityStats("longueuil");e._updateCityStats("montreal");return e._updateCityStats("quebec")},this.config.updateStatsTimer);return this.io.on("connection",function(t){var n,r,i,s,o;for(r in e.stats)t.emit("stats",{city:r,stats:e.stats[r]});o=[];for(n=i=0,s=e.tickerData.length;0<=s?i<s:i>s;n=0<=s?++i:--i)o.push(t.emit("vote",e.tickerData[n]));return o})},_handleAPICalls:function(t,n){var r,i,s,o,u;s=t.url.split("?")[0].split("/");if(s.length<4){n.writeHead("500");n.end("API calls expect at least a module/parameter combo.");return}i=s[2];r=s[3];switch(i){case"twilio":e._handleTwilioCall(r,t,n);return!1;case"vote":u={identity:t.connection.remoteAddress,type:"like"};t.headers["X-Real-IP"]!=null&&(u.identity=t.headers["X-Real-IP"]);o=e._registerVote(r,u);if(o){n.writeHead("200");return n.end(JSON.stringify({status:"ok",value:o}))}n.writeHead("500");return n.end(JSON.stringify({status:"failed"}));default:n.writeHead("404");return n.end("Module "+i+" not found")}},_handleTwilioCall:function(t,n,r){var i,s,o;switch(t){case"call":console.log("call");s=e.config.twilio.responses.intro;if(n.query.Digits!=null){i=[null,"laval","montreal","longueuil","quebec"];o={identity:n.query.From,type:"call"};e._registerVote(i[n.query.Digits],o);s=e.config.twilio.responses.outro}return e.fs.readFile(s,function(e,t){if(e){r.writeHead("500");return r.end("Error loading xml file")}r.setHeader("Content-Type","text/xml");r.writeHead("200");return r.end(t)});default:r.writeHead("404");return r.end("Method not found")}},_registerVote:function(t,n){var r,i,s;r={laval:0,montreal:1,longueuil:2,quebec:3};if(t==null||r[t]==null)return!1;i="votes:"+t;console.log("New vote for "+t+" from "+n.identity);s={city:t,type:n.type};if(n.type==="call"){n.identity=(n.identity+"").split(",")[0];s.tel=n.identity.substr(0,n.identity.length-2)}e.io.sockets.emit("vote",s);e.tickerData.push(s);e.tickerData.length>e.tickerMaxLength&&e.tickerData.splice(0,e.tickerData.length-e.tickerMaxLength);return n.type==="call"?e.redisWorker.zadd("maireacademie:votes:"+t,(new Date).getTime(),JSON.stringify(n)):e.redisWorker.zadd("maireacademie:votes:fb:"+t,(new Date).getTime(),JSON.stringify(n))},_updateCityStats:function(t){return e.redisWorker.zcard("maireacademie:votes:"+t,function(n,r){var i;i=require("request");return i("http://api.facebook.com/restserver.php?method=links.getStats&urls=http://"+t+".maireacademie.ca/&format=json",function(n,i,s){var o;o=JSON.parse(s);e.stats[t].votes=r;e.stats[t].likes=o[0].like_count;e.stats[t].total=r+o[0].like_count;return e.io.sockets.emit("stats",{city:t,stats:e.stats[t]})})})},_handleHttpRequest:function(t,n){var r,i;r=t.url.split("?")[0];r=r==="/"?"index.html":r;r=r.split("..").join("");i=__dirname+"/"+e.config.wwwPath+r;return e.fs.readFile(i,function(e,t){if(e){n.writeHead("500");return n.end("Error loading "+r)}n.writeHead("200");return n.end(t)})}};e.init()}).call(this);