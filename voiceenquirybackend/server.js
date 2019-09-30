const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const port = process.env.PORT || 3001;

var mysql = require('mysql');

const app = express();

var con = mysql.createConnection({
  host: "database-1.czuepjtqzk8i.us-east-1.rds.amazonaws.com", 
  user:"admin", 
  password:"dbmsvoip",
  database: "dbms"
});
 
// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("select * from UserTable where Name='trimath'", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) 
      {
        console.log('error');
        throw err;

      }
      console.log('ITS OK');
    // if there is no error, you have the fields object
    // iterate for all the rows in fields object
    Object.keys(result).forEach(function(key) {
      var res = result[key];
     console.log(res)
    });

  });
});



app.use(cors())
app.use(bodyParser.json());

app.get('/',(req,res)=>{res.json('avc')});	

app.get('/BusStops',(req,res)=>{
  
  con.query("select distinct IntermediateStops from BusStops", function (err, result, fields) {
    
    if (err) 
      {
        console.log('error');
        throw err;

      }
      
    var resx=[];
      Object.keys(result).forEach(function(key) {
      resx.push((result[key]).IntermediateStops);
    });
      res.json(JSON.stringify(resx));
  });


});	

app.get('/RouteId',(req,res)=>{
  
  con.query("select distinct RouteId from RouteDetails", function (err, result, fields) {
    
    if (err) 
      {
        console.log('error');
        throw err;

      }
      
    var resx=[];
      Object.keys(result).forEach(function(key) {
      resx.push((result[key].RouteId.toString()));
    });
      console.log(resx);
      res.json(JSON.stringify(resx));
  });


});	

app.get('/Buses',(req,res)=>{
  
  var from=req.query.from;
  var to=req.query.to;
  
  con.query("select distinct RouteId from RouteDetails", function (err, result, fields) {
    
    if (err) 
      {
        console.log('error');
        throw err;

      }
      
    var resx=[];
      Object.keys(result).forEach(function(key) {
      resx.push((result[key].RouteId.toString()));
    });
      console.log(resx);
      res.json(JSON.stringify(resx));
  });


});	

app.get('/BusRegnNo',(req,res)=>{
  
  con.query("select distinct BusRegnNo from BusInfo", function (err, result, fields) {
    
    if (err) 
      {
        console.log('error');
        throw err;

      }
      
    var resx=[];
      Object.keys(result).forEach(function(key) {
      resx.push((result[key]).BusRegnNo);
    });
      console.log(resx);
      res.json(JSON.stringify(resx));
  });
});	

app.get('/Drivers',(req,res)=>{
  con.query("select distinct DriverID from DriverDetails", function (err, result, fields) {
    
    if (err) 
      {
        console.log('error');
        throw err;

      }
      
    var resx=[];
      Object.keys(result).forEach(function(key) {
      resx.push((result[key]).DriverID.toString());
    });
      console.log(resx);
      res.json(JSON.stringify(resx));
  });


});	


app.post('/login', async (req, res) => {
   

   var user = req.body.email;
   var pass = req.body.password;

var q="select * from UserTable where email='"+user+"' and Password='"+pass+"' and userType='N'"
console.log(q)
 
 	 con.query(q, function (err, result, fields) {
    if (err) throw err;
    	if(result.length == 1)
    	{
    		var abc={
    			error:'',
    			response:'success'
    		}
    	}
    	else
    	{
    		var abc={
    			error:'No Such User Exists. Please Register first',
    			response:'fail'
    		}

    	}
    	res.json(JSON.stringify(abc));

  });
    
});

var Id;
app.post('/signup', async (req, res) => {
   
   var email = req.body.email;
   var address = req.body.address;
   var gender = req.body.gender;
   var phone = req.body.phone;
   var user = req.body.username;
   var pass = req.body.pass;
   var gender = "Male";
   var UserType="NA";
   
   console.log(req.body);
con.query("select count(*) as count from UserTable", function (err, result, fields) {
if(err) throw err;

    Object.keys(result).forEach(function(key) {
      var res = result[key];
		var	Id=(res.count+1);
			var q= "insert into UserTable (Id, email,Name, Password,UserType) values (?,?,?,?,?);"

			console.log(q);

			con.query(q, [Id,email,user,pass,address, phone, gender], function (err, result, fields) {
			if (err) throw err;
			
			else
			{
			var q1="insert into NonAdmin (Id, Gender, Phone, Address ) values (?,?,?,?)"
			con.query(q1, [Id, gender, phone, address], function (err, result, fields) {
									const abc={
							  			error:err,
							  			result:result
							  		}
							  		
			});

    		}
		});
});

    const abc={
	  			error:err,
	  			result:result
	  		}
	  		
    res.json(JSON.stringify(abc));	



          });
        
});

app.post('/adminLogin', async (req, res) => {
   
   var user = req.body.username;
   var pass = req.body.password;

var q="select * from UserTable where Name='"+user+"' and Password='"+pass+"'"
console.log(q)
      con.query(q, function (err, result, fields) {
        if (err) throw err;
			

			if(result.length >= 1)
		    	{
		    		var abc={
		    			error:'',
		    			response:'success'
		    		}
		    			
		    
		    	}
		    	else
		    	{
		    		var abc={
		    			error:'No Such User Exists',
		    			response:'fail'
		    		}

		    
		    	}
		    	res.json(JSON.stringify(abc));
		      }

      );
    
    
});

app.post('/CheckRoute', async (req, res) => {
   

  var fromP = req.body.fromSelect;
  var toP = req.body.toSelect;

var q="SELECT distinct RouteId FROM BusStops WHERE RouteId IN (SELECT RouteId FROM BusStops Where IntermediateStops='"+fromP+"' and RouteId in (SELECT RouteId FROM BusStops Where IntermediateStops='"+toP+"'))";
console.log(q)

   con.query(q, function (err, result, fields) {
   if (err) throw err;
     if(result.length >= 1)
     {
      var resx=[];
      Object.keys(result).forEach(function(key) {
        resx.push((result[key]).RouteId);
      });

       var abc={
         error:'',
         response:resx
       }
     }
     else
     {
       var abc={
         error:'No Such Route Exists',
         response:'fail'
       }

     }
     res.json(JSON.stringify(abc));

 });
   
});


app.post('/busSchedule', async (req, res) => {
   res.writeHead(200, { "Content-Type": "text/html" });

   	var routeid = req.body.routeid;
    var driverid = req.body.driverid;
    var starttime = req.body.starttime;
    var endtime = req.body.endtime;
    var drivername = req.body.drivername;
    var esttraveltime = req.body.esttraveltime;
    var reservedseats = req.body.reservedseats;
    var busregnno = req.body.busregnno;
	var fare = req.body.fare;


      con.query("insert into BusSchedule111 (BusRegnNo, RouteID, DriverID, StartTime, fare, ReservedSeats, TravelTime) values (?,?,?,?,?,?,?);", [busregnno, routeid, driverid, starttime, fare,reservedseats,esttraveltime], function (err, result, fields) {
        if (err) throw err;
        if(result.length === 1){
          console.log('Invalid credentials');
        }
        else{
          
        console.log('Successful');
        }
      });

      console.log('Insertion Done into BusSchedule111');
    

      con.query("insert into BusSchedule112 (TravelTime, StartTime, EndTime) values (?,?,?);", [esttraveltime,starttime,endtime], function (err, result, fields) {
        if (err) throw err;
        if(result.length === 1){
          console.log('Successful');
        }
        else{
          console.log('Invalid credentials');3
        }
      });

      console.log('Insertion Done into BusSchedule112');
    

		    		var abc={
		    			error:'',
		    			response:''
		    		}

		    	res.json(JSON.stringify(abc));
    
});

app.post('/bus', async (req, res) => {
   
   	var busregno = req.body.busregnno;
	var agencyaddr = req.body.agencyaddr;
	var agencyname = req.body.agencyname;
	var capacity = req.body.capacity;
	var ac = req.body.ac;
	var LocationName=""
	var Latitude=""
	var Longitude=""
	
	console.log(busregno+" "+agencyname+" "+capacity+" "+ac+" "+LocationName+" "+Latitude+" "+Longitude);

	con.query("insert into Bus1 (BusRegnNo, AgencyName, TotalSeats, AC,LocationName,Latitude,Longitude) values (?,?,?,?,?,?,?);", [busregno, agencyname,capacity, ac,LocationName, Latitude,Longitude], function (err, result, fields) {
        if (err) throw err;
        if(result.length === 1){
          console.log('Invalid credentials');

        }
        else{
          console.log('Successful');
        }
      });
    
  
      con.query("insert into Bus2 (AgencyName,AgencyAddress) values (?,?);", [agencyname,agencyaddr], function (err, result, fields) {
        if (err) throw err;
        if(result.length === 1){
          console.log('Invalid credentials');
        }
        else{
          
        	console.log('Successful');
        }
      });
  
  	    		var abc={
		    			error:'',
		    			response:''
		    		}

		    	console.log(abc);
		    	res.json(JSON.stringify(abc));
    			

});

app.post('/driver', async (req, res) => {
   
   	var driverid = req.body.driverid;
	var drivername = req.body.drivername;
	var driverphone = req.body.driverphone;

   con.query("insert into BusSchedule23 (driverid, drivername, driverphone) values (?,?,?);", [driverid, drivername, driverphone], function (err, result, fields) {
        if (err) throw err;
        if(result.length === 1){
          console.log('Successful');
        }
        else{
          console.log('Invalid credentials');
        }
      });
    });
    




app.listen(port, () => console.log(`Listening on port ${port}`));