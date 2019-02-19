const keys = require('./config/keys');
const mysql = require('mysql');

// connect to mysql db
let con = mysql.createConnection({
	host: 'localhost',
	user: keys.dbUser,
	password: keys.dbPassword,
	database: 'teamgoals'
});

con.connect(function(err) {
	if (err) throw err;
	console.log('Connected to db');

	// create users table if it does not already exist
	let createUserTable = `CREATE TABLE IF NOT EXISTS users (
		id VARCHAR (50) PRIMARY KEY NOT NULL, 
		googleId VARCHAR (50) NOT NULL,
		displayName VARCHAR (100),
		points INT DEFAULT 0)`;


	let createTeamsTable = `CREATE TABLE IF NOT EXISTS teams (
		teamID VARCHAR (50) PRIMARY KEY NOT NULL,
		teamName VARCHAR (100),
		teamInviteToken VARCHAR (50))`;

	let createGoalsTable = `CREATE TABLE IF NOT EXISTS goals (
		goalId VARCHAR (50) PRIMARY KEY NOT NULL,
		userId VARCHAR (50),
		TeamId VARCHAR (50),
		FOREIGN KEY (userId)
			REFERENCES users(id),
		FOREIGN KEY (teamId)
			REFERENCES teams(teamId),
		goal VARCHAR (500),
        markedComplete TINYINT)`;
        
    let createTeamUserTable = `CREATE TABLE IF NOT EXISTS teamUser (
        userId VARCHAR (50),
        TeamId VARCHAR (50),
        FOREIGN KEY (userId)
            REFERENCES users(id),
        FOREIGN KEY (teamId)
            REFERENCES teams(teamId))`;

    let createCommentsTable = `CREATE TABLE IF NOT EXISTS comments (
        commentId VARCHAR (50) PRIMARY KEY NOT NULL,
        userId VARCHAR (50),
        goalId VARCHAR (50),
        FOREIGN KEY (userId)
            REFERENCES users(id),
        FOREIGN KEY (goalId)
            REFERENCES goals(goalId),
        comment VARCHAR (500))`;

	con.query(createUserTable, (err) => {
		if (err) {
			console.log(err.message);
		} else {
			console.log('User table created');
		}
	})

	con.query(createTeamsTable, (err) => {
		if (err) {
			console.log(err.message);
		} else {
			console.log('Teams table created');
		}
	})

	con.query(createGoalsTable, (err) => {
		if (err) {
			console.log(err.message);
		} else {
			console.log('Goals table created');
		}
    })
    
    con.query(createTeamUserTable, (err) => {
		if (err) {
			console.log(err.message);
		} else {
			console.log('teamUser table created');
		}
    })

    con.query(createCommentsTable, (err) => {
		if (err) {
			console.log(err.message);
		} else {
			console.log('comments table created');
		}
	})
});


module.exports = {
	con
}