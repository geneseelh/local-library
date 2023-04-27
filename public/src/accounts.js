// .find()
function findAccountById(accounts, id) {
  const result = accounts.find((accountElement)=>{
    return accountElement.id === id
  })
  return result
}

// .sort()
function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB)=>{
    return accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  })
  return accounts
}  

// .reduce()
function getTotalNumberOfBorrows(account={}, books=[]) {
//set counter variable to hold how many total books will be borrowed
  //use reduce method to loop thru each book in the list and do something w each item, while also keeping track of a running total(accumulator) 
const counter = books.reduce((accumulator, bookObj)=>{
  //need to access borrows array
  const {borrows} = bookObj;
  //then go thru each borrow obj using forEach loop
  borrows.forEach((borrowsObj)=>{
    //to check if the borrower's id matches the id of the given account
    if(borrowsObj.id === account.id){
      //if it does, the running total is incremented by 1
      accumulator++
    }
   }) 
   //return the running total
   return accumulator
},0) //starting counter value
//lastly, return the counter  which holds the total amount of times a given acct borrowed any of the books
return counter
}


function getBooksPossessedByAccount(account=[], books=[], authors=[]) {
   //find books checked out for given account 
  //push book items into checked out array
  //match author to each book object in checked out array
  
  //variable to hold array of reformatted books
  const result = [];
  //forEach loop to go through each book to find what books the acct has checked out
  // can write const accountId = account.id; but dont need to
  books.forEach((bookObj)=>{
    //get borrows array to check return status and user id
    const {borrows} = bookObj;
    //loop to check return and id
    borrows.forEach((borrowsObj)=>{
      if(borrowsObj.id === account.id && !borrowsObj.returned){
        const authorId = bookObj.authorId
        bookObj.author = authors.find((authorObj)=>{
          return authorId === authorObj.id
        })
        result.push(bookObj);
      }
    })
  })
  return result
}
 

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
