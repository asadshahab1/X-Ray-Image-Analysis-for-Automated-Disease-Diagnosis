const { error } = require('console');
const bcrypt = require('bcrypt')
const mysql = require('mysql2')
const pool = mysql.createPool({
    host: 'localhost',   // Your MySQL host
    user: 'root',        // Your MySQL user
    password: 'mere125meinpetrolkesedalwaunga',// Your MySQL password
    database: 'xray' // Your MySQL database name
  });

class User{
    constructor(fName, lName, hospitalName, phoneNo, email,password){
        this.fName = fName;
        this.lName = lName;
        this.hospitalName = hospitalName;
        this.phoneNo = phoneNo;
        this.email = email;
        this.password = password;
    }

    save(){
        const data = {"FirstName":this.fName, 
                "LastName":this.lName,
                "HospitalName":this.hospitalName,
                "PhoneNumber":this.phoneNo,
                "Email":this.email,
                "Password":this.password
        }
        console.log(data)
        const sql = "INSERT INTO USERS SET ?";
        pool.getConnection((err, connection) => {
            if (err) {
              console.error('Error getting connection from pool: ' + err.stack);
              return;
            }
           connection.query(sql, data, (err, results) => {
            // Release the connection back to the pool
            connection.release();
        
            if (err) {
              console.error('Error executing query: ' + err.stack);
              return;
            }
        
            // Print the results (e.g., insertId)
            console.log('Insert ID:', results.insertId);
          });
    });
}}

class Authenticate{

    constructor(){
    }
    
    async getUserByEmail(email) {
        // Use a Promise to ensure that the connection is released correctly
        return new Promise((resolve, reject) => {
          pool.getConnection((err, connection) => {
            if (err) {
              reject(err);
              return;
            }
      
            // SQL query with a parameter
            const sql = 'SELECT * FROM users WHERE email = ?';
      
            // Execute the query with the parameter
            connection.query(sql, [email], (err, results) => {
              // Release the connection back to the pool
              connection.release();
      
              if (err) {
                reject(err);
                return;
              }
      
              // Resolve with the results
              resolve(results);
            });
          });
        });
      }
      
     async signIn(email,password){
        const user = await this.getUserByEmail(email);
        if(bcrypt.compareSync(password, user[0].password)){
            return {"message":0,"user":user}
        }
        else{
            return {"message":1}
        }
      }
}

module.exports = {User, Authenticate}