// .length
function getTotalBooksCount(books) {
  return books.length
}

// .length
function getTotalAccountsCount(accounts) {
  return accounts.length
}

// .forEach
function getBooksBorrowedCount(books={}) {
  //look at books array
  //set a counter variable to hold the total num of books checked out rn
  let counter = 0;
  //look at/get access to book object
  books.forEach((bookObj)=>{
    //look at borrows
    const {borrows} = bookObj
    //look at returned value of first instance
    if(borrows[0].returned === false){
      counter++
    }  
  })
  return counter;
}


function getMostCommonGenres(books) {
  const countObj = books.reduce((count, { genre }) => {
    count[genre] = (count[genre] || 0) + 1;
    return count;
  }, {});
  const results = Object.entries(countObj)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  return results;
}

function getMostPopularBooks(books) {
    const popularBooks = {};
    books.forEach((bookObj)=>{
      const {borrows} = bookObj;
      popularBooks[bookObj.title] = borrows.length;
    })
    const bookNames = Object.keys(popularBooks);
    const results = bookNames.map((bookTitles)=>{
      return {name: bookTitles, count: popularBooks[bookTitles]}
    })
    results.sort((bookA, bookB)=>{
      return bookB.count - bookA.count
    })
    return results.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
    const popularAuthor = {};
    books.forEach((bookObj)=>{
      const {borrows} = bookObj;
      if(popularAuthor[bookObj.authorId] === undefined){
        popularAuthor[bookObj.authorId] = borrows.length;
      }else{
        popularAuthor[bookObj.authorId] += borrows.length;
      }
    })
    const authorIdArr = Object.keys(popularAuthor);

    const results = authorIdArr.map((authorIdNum)=>{
      return {name: formatAuthorName(authorIdNum,authors), count: popularAuthor[authorIdNum]}
    })
    results.sort((authorA, authorB)=>{
      return authorB.count - authorA.count
    })
    return results.slice(0,5);
}

//helper
function formatAuthorName(authorId = 0, authors = []){
  const authorObj = authors.find((authorObj)=>{
    return (authorObj.id - authorId === 0)
  })
    const {name} = authorObj
    return `${name.first} ${name.last}`
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
