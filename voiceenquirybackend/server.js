const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const port = process.env.PORT || 3001;

var mysql = require('mysql');

const app = express();

app.use(cors())
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "database-1.czuepjtqzk8i.us-east-1.rds.amazonaws.com", 
  user:"admin", 
  password:"dbmsvoip",
  database: "dbms"
});
 
// make to connection to the database.
con.connect(function(err) {
  if (err) console.log(err)
  // if connection is successful
  con.query("select * from UserTable where Name='trimath'", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) 
      {
        console.log('error');
        console.log(err)

      }
      console.log('ITS OK');
    // if there is no error, you have the fields object
    // iterate for all th
  });
});


app.get('/',(req,res)=>{res.json('avc')});	

app.get('/COST',(req,res)=>{
  con.query("call totalrevenue()", function (err, result, fields) {
    
    if (err) 
      {
        console.log('error');
        console.log(err)

      }
      
    var resx=[];
      Object.keys(result).forEach(function(key) {
      resx.push((result[key]));
    });
      console.log(resx)
      res.json(JSON.stringify(resx));
  });


})

app.get('/BusStops',(req,res)=>{
  
  con.query("select distinct IntermediateStops from BusStops", function (err, result, fields) {
    
    if (err) 
      {
        console.log('error');
        console.log(err)

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
        console.log(err)

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
        console.log(err)

      }
      
    var resx=[];
      Object.keys(result).forEach(function(key) {
      resx.push((result[key].RouteId.toString()));
    });
      console.log(resx);
      res.json(JSON.stringify(resx));
  });


});	


app.get('/Agencies',(req,res)=>{
  
  con.query("select distinct AgencyName from AgencyDetails", function (err, result, fields) {
    
    if (err) 
      {
        console.log('error');
        console.log(err)

      }
      
    var resx=[];
      Object.keys(result).forEach(function(key) {
      resx.push((result[key].AgencyName.toString()));
    });
      console.log(resx);
      res.json(JSON.stringify(resx));
  });


}); 


app.get('/fetchBuses/:id',(req,res)=>{
  
  console.log(req.params.id);

  con.query(`select * from BusSchedule natural join BusInfo where RouteID=${req.params.id}`, function (err, result, fields) {
    
    if (err) 
      {
        console.log('error');
        console.log(err)
      }
      
    var resx=[];
      Object.keys(result).forEach(function(key) {
      resx.push((result[key]));
      
    });
      console.log(resx);
      res.json(JSON.stringify(resx));
  });
}); 




app.post('/BookedSeats',(req,res)=>{
  
  var tdate=new Date(req.body.traveldate);
  var bno=req.body.busregnno;
  var dd=tdate.getUTCDate()+1;
  var mm=tdate.getUTCMonth()+1;
  var yyyy=tdate.getUTCFullYear();

var xyz= yyyy+"-"+mm+"-"+dd;
console.log(xyz)
console.log(`select BookedSeats from Ticket natural join SeatsBooked where TravelDate='${xyz}' and BusRegnNo='${bno}'`);
  con.query(`select BookedSeats from Ticket natural join SeatsBooked where TravelDate='${xyz}' and BusRegnNo='${bno}'`, function (err, result, fields) 
  {

      if (err) 
      {
        console.log('error');
        console.log(err)

      }
      
    var resx=[];
      Object.keys(result).forEach(function(key) {
      resx.push((result[key].BookedSeats.toString()));
    });
      console.log(resx);
      res.json(JSON.stringify(resx));
  });

  
}); 

app.post('/Tickets',(req,res)=>{

var rid=req.body.routeid;
var regn=req.body.busregnno

var bdate=new Date();
var dd=bdate.getUTCDate()+1;
var mm=bdate.getUTCMonth()+1;
var yyyy=bdate.getUTCFullYear();
var xyz= yyyy+"-"+mm+"-"+dd;

var tdate=new Date(req.body.traveldate);
var dd=tdate.getUTCDate()+1;
var mm=tdate.getUTCMonth()+1;
var yyyy=tdate.getUTCFullYear();
var xyz2= yyyy+"-"+mm+"-"+dd;

 
 console.log(`insert into Ticket (BusRegnNo,BookingDate,TravelDate) values ('${regn}','${xyz}','${xyz2}')`)
          con.query(`insert into Ticket (BusRegnNo,BookingDate,TravelDate) values ('${regn}','${xyz}','${xyz2}')`, function (err, result, fields) {

              if (err) 
              {
                console.log('error in Ticket');
                console.log(err)

              } 
              else
              {
                 con.query(`select max(TicketPNR) as TicketPNR from Ticket`, function (err, res2, fields) {

                      if (err) 
                      {
                        console.log('error');
                        console.log(err)

                      }

                      var resx=[];
                      Object.keys(res2).forEach(function(key) {
                      resx.push((res2[key].TicketPNR.toString()));
                      });
                      console.log(resx);
                      var abc={
                        pnr:resx,
                        error:err
                      }
                      res.json(JSON.stringify(abc));
                      }); 
                 console.log(result)  
              }
             
})
});

app.post('/Through',(req,res)=>{

var rid=req.body.routeid;
var did=req.body.driverid;
var regn=req.body.busregnno
var pnr=req.body.pnr;
var st=req.body.starttime

    console.log(st)

        console.log(`insert into Through values(${rid},${did},${st},'${regn}',${pnr})`)
         
       con.query(`insert into Through values(${rid},${did},${st},'${regn}',${pnr})`, function (err, result, fields) {

              if (err) 
              {
                console.log('error in Through');
                console.log(err)
              }
              else
              {
                  console.log("Insert done")
              }

           var abc={
                res:result,
                error:err
              }
              res.json(JSON.stringify(abc));
          });
      
   

}
)



app.post('/SeatsBooking',(req,res)=>{

var pnr=req.body.pnr;
var filled=req.body.seatsbooked;
var f=0;
  for(var i=0;i<filled.length;i++)
  {
  console.log(`insert into SeatsBooked values(${pnr},${filled[i]})`);
  con.query(`insert into SeatsBooked values(${pnr},${filled[i]})`, function (err, result, fields) {

      if (err) 
      {
        f=1;
        console.log('error in SeatsBooked');
        console.log(err)

      }

  });
}
var abc;
 f==1? abc={ res:"",error:"Some error"}: abc={ res:"",error:null}
   res.json(JSON.stringify(abc));

}); 



app.get('/BusRegnNo',(req,res)=>{
  
  con.query("select distinct BusRegnNo from BusInfo", function (err, result, fields) {
    
    if (err) 
      {
        console.log('error');
        console.log(err)

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
        console.log(err)

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
    if (err) console.log(err)
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
if(err) console.log(err)

    Object.keys(result).forEach(function(key) {
      var res = result[key];
		var	Id=(res.count+1);
			var q= "insert into UserTable (Id, email,Name, Password,UserType) values (?,?,?,?,?);"

			console.log(q);

			con.query(q, [Id,email,user,pass,address, phone, gender], function (err, result, fields) {
			if (err) console.log(err)
			
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

var q="select * from UserTable where email='"+user+"' and Password='"+pass+"'"+" and Usertype='A'";
console.log(q)
      con.query(q, function (err, result, fields) {
        if (err) console.log(err)
			

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
   if (err) console.log(err);
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
  
   	var routeid = req.body.routeid;
    var driverid = req.body.driverid;
    var starttime = req.body.starttime;
    var esttraveltime = req.body.esttraveltime;
    var reservedseats = req.body.reservedseats;
    var busregnno = req.body.busregnno;
	var fare = req.body.fare;

starttime=(starttime/60/60);

     console.log(`insert into BusSchedule (BusRegnNo, RouteID, DriverID, StartTime, fare, ReservedSeats, TravelTime) values (${busregnno},${routeid},${driverid},${starttime},${fare},${reservedseats},${esttraveltime})`);

      con.query("insert into BusSchedule (BusRegnNo, RouteID, DriverID, StartTime, fare, ReservedSeats, TravelTime) values (?,?,?,?,?,?,?);", [busregnno, routeid, driverid, starttime, fare,reservedseats,esttraveltime], function (err, result, fields) {
        if (err) console.log(err);
        if(result.length === 1){
          console.log('Invalid credentials');
        }
        else{
            
          console.log('Successful');
          }
        });

            console.log('Insertion Done into BusSchedule');

	    		var abc={
	    			error:'',
	    			response:''
	    		}

		    	res.json(JSON.stringify(abc));
    
});

app.post('/bus', async (req, res) => {
   
   	var busregno = req.body.busregnno;
	var agencyname = req.body.agencyname;
	var capacity = req.body.capacity;
	var ac = req.body.ac;
	var LocationName=""
	var Latitude=""
	var Longitude=""
	
	console.log(busregno+" "+agencyname+" "+capacity+" "+ac+" "+LocationName+" "+Latitude+" "+Longitude);

	con.query("insert into BusInfo (BusRegnNo, AgencyName, TotalSeats, AC,LocationName,Latitude,Longitude) values (?,?,?,?,?,?,?);", [busregno, agencyname,capacity, ac,LocationName, Latitude,Longitude], function (err, result, fields) {
        if (err) console.log(err);
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
  var age=req.body.age;
  var date_of_join = req.body.date_of_join;

console.log(drivername+" "+driverphone+" "+age+" "+date_of_join)

   con.query("insert into DriverDetails (drivername, driverphone, age , date_of_join) values (?,?,?,?);", [drivername, driverphone,age,date_of_join], function (err, result, fields) {
        if (err) console.log(err)
        if(result.length){
          console.log('Successful');
        }
        else{
          console.log('Invalid credentials');
        }
      });
        var abc={
              error:'',
              response:''
            }

          console.log(abc);
          res.json(JSON.stringify(abc));


    });
    


app.listen(port, () => console.log(`Listening on port ${port}`));
