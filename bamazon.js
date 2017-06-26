// Import required packages
var inquirer = require('inquirer');
var mysql = require('mysql');

// Establish server connection with mysql database using local host and user config data
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'Thouman1',
	database: 'bamazon_db'
});

// Confirm the connection was successful
connection.connect(function(err){
	if(err) throw err;
	console.log("Connected as Id: " + connection.threadId + '\n');
})

// Display all the current contents of the database 
function showAllItems(){
	console.log("Showing all items...");
	connection.query('SELECT * FROM products', function(err, res){
		if(err) throw err;
		for(var key in res){
			console.log(res[key].item_id);
			console.log(res[key].product_name);
			console.log(res[key].price);
			console.log();
		}
	})
}

// Pass in the chosen item's data and update the database after the transaction
// Display transaction price and end the connection to prevent a BASH terminal hang up
function buyItems(id, quant, price){
	connection.query('UPDATE products SET stock_quantity = stock_quantity - ' + quant + ' WHERE item_id = ' + id,
	function(err, res){
		if(err) throw err;
		console.log("The total transaction price is " + (price * quant));
		connection.destroy();
	})
}

// Welcome greeting and show all items called to start the program, chooseItems is run on time delay to ensure it's run 
// after items are displayed
console.log("Welcome. Please choose from the following items.");
showAllItems();
setTimeout(chooseItems, 2000);

// The meat of the program, get user input to choose the item and product and use and pass along those choices 
// in subsequent queries and functions
function chooseItems(){
	inquirer.prompt([
	{
		name: 'chooseProd',
		message: 'Please enter the ID of the product you would like to buy.'
	},
	{
		name: 'chooseQuantity',
		message: 'Please enter the quantity of product to buy.'
	}
	]).then(function(replies){
		var chosenId = replies.chooseProd;
		connection.query('SELECT * FROM products WHERE item_id = ' + chosenId,
			function(err, res){
				if(err) throw err;
				// Run only if there is enough to complete the transaction
				if(res[0].stock_quantity >= replies.chooseQuantity){
					buyItems(replies.chooseProd, replies.chooseQuantity, res[0].price);
				}
				// If 0, then custom out of stock reply, prompt for another selection
				else if(res[0].stock_quantity == 0){
					console.log("I'm sorry that item is currently out of stock. Please make another selection.");
					chooseItems();
				}
				// If inventory is less than requested order, prompt for another selection
				else if(res[0].stock_quantity < replies.chooseQuantity){
					console.log("I'm sorry there are only " + res[0].stock_quantity + " of those in stock. Please make a smaller selection.")
					chooseItems();
				}
			})
	})
}