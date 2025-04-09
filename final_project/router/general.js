const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  
  if (users.find((user) => {return user.username === username;})) {
    return res.send("user already exists");
  } else if (!username || !password) {
    return res.send("username and password must be provided");
  }else {
    users.push({ "username": username, "password": password});
    return res.send("user registered");
  }
  
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  let bookPromise = new Promise((resolve, reject) => {
    resolve(JSON.stringify(books))
  })
  return bookPromise.then((success) => {res.send(success)});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  //return res.status(300).json({message: "Yet to be implemented"});
  let detailPromise = new Promise((resolve, reject) => {
    resolve(JSON.stringify(books[isbn]))
  });
  return detailPromise.then((success) => {res.send(success);});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let authorPromise = new Promise((resolve, reject) => {
    let i = 1;
  while (i < Object.keys(books).length && books[i].author !== author) {
    i++;
  }
  let index = i;
  resolve(index);
  });
  
  
  return authorPromise.then((index) => {res.send(JSON.stringify(books[index]));});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let titlePromise = new Promise((resolve, reject) => {
    let i = 1;
  while ( i < Object.keys(books).length + 1 && books[i].title !== title){
    i++;
  }
  let index = i;
  resolve(index)
  });
  

  return titlePromise.then((index) => {res.send(JSON.stringify(books[index]))});
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.send(JSON.stringify(books[isbn]));
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
