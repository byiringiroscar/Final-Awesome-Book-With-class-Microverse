// reference to markup elements
const bodyEle = document.querySelector('body');
const formsection = document.createElement('section');
bodyEle.appendChild(formsection);

// class

class AwesomeBook {
  constructor() {
    this.bookList = JSON.parse(localStorage.getItem('storedData')) || [];
  }

  addBookAwes(title, author) {
    this.bookList.push({ title, author });
    this.updateLocal();
  }

  removeBookAwes(index) {
    this.bookList.splice(index, 1);
    this.updateLocal();
  }

  updateLocal() {
    localStorage.setItem('storedData', JSON.stringify(this.bookList));
  }
}

const newAwesome = new AwesomeBook();

const bookListSection = document.createElement('section');
bookListSection.classList.add('booklist');
formsection.appendChild(bookListSection);

const formSection = document.createElement('section');
formSection.innerHTML = `
  <form class='booklst'>
    <input type="text" name="title" id="booktitle" placeholder="Title">
    <input type="text" name="author" id="bookauth" placeholder="Author">
    <button type="button"  class='addbtn' onclick="addBook()">Add</button>
  </form>
`;
formsection.appendChild(formSection);

// function to update book list
const update = () => {
  const bookListElem = document.querySelector('.booklist');
  bookListElem.innerHTML = '';

  for (let i = 0; i < newAwesome.bookList.length; i += 1) {
    bookListElem.innerHTML += `
    <ul class = 'booklst'>
      <li>${newAwesome.bookList[i].title}</li>
      <li> ${newAwesome.bookList[i].author}</li>
        <button class ='btnr' type="button" onclick="removeBook(${i})">Remove</button>
      </li>
      <hr class='hr'>
    </ul>
    `;
  }
};
function addBook() {
  const titleInput = document.querySelector('#booktitle');
  const authorInput = document.querySelector('#bookauth');
  newAwesome.addBookAwes(titleInput.value, authorInput.value);
  titleInput.value = '';
  authorInput.value = '';
  update();
}
function removeBook(index) {
  newAwesome.removeBookAwes(index);
  update();
}
window.onload = () => update();
