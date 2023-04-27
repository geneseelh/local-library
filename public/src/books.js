// .find()
function findAuthorById(authors, id) {
  const result = authors.find((authorsElement)=>{
    return authorsElement.id === id
  })
  return result
}

// .find()
function findBookById(books, id) {
  const result = books.find((bookElement)=>{
    return bookElement.id === id
  })
  return result
}

function partitionBooksByBorrowedStatus(books={}) {
  const inLibrary = books.filter((bookObj)=>{
    const {borrows} = bookObj;
    return borrows[0].returned === true
  })
  const outLibrary = books.filter((bookObj)=>{
    const {borrows} = bookObj
    return borrows[0].returned === false
  })
  return [outLibrary,inLibrary]
}

function getBorrowersForBook(book={}, accounts=[]) {
  const {borrows} = book;
  const whoBorrowed=[]
  let counter = 0;
  //borrows loop to get id for each time book was borrowed
  borrows.forEach((borrowsObj)=>{
      const borrowerId = borrowsObj.id
      accounts.find((account)=>{
        //push found account onto whoBorrowed
        if(account.id === borrowerId && counter < 10){
          whoBorrowed.push({...borrowsObj,...account});
          counter++
        }else{
          return;
        }
      })
  })
    return whoBorrowed
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
