const images = ['./assets/zergling.png']
const blankImage = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=' 
const defaultSize = 2000
const body = document.querySelector("main")
let y, x, yChange, xChange

images.push(blankImage)

init()

window.addEventListener('scroll', appendImages)

function appendImages(event) {
  const limitY = window.innerHeight
  const limitX = window.innerWidth
  const bodyHeight = document.body.scrollHeight;
  const bodyWidth = document.body.scrollWidth;
  yChange = window.scrollY !== y
  xChange = window.scrollX !== x
  y = window.scrollY
  x = window.scrollX
  let prepend = false
  if (window.scrollY === 0 && yChange) {
    prepend = true
    removeRow(prepend)
    addRow(prepend)
    window.scrollTo(x, defaultSize)
  } else if (window.scrollY >= bodyHeight - limitY - 10 && yChange) {
    removeRow(prepend)
    addRow(prepend)
    window.scrollTo(x, limitY - defaultSize)
  } else if (window.scrollX >= bodyWidth - limitX - 10 && xChange) {
    removeColumn(prepend)
    addColumns(prepend)
    window.scrollTo(defaultSize, y)
  } else if (window.scrollX === 0 && xChange) {
    prepend = true
    removeColumn(prepend)
    addColumns(prepend)
    window.scrollTo(defaultSize, y)
  }
}

function init() {
  addRow(false)
  addRow(false)
  disableScrollRestoration()
  window.scrollTo(1,1)
}

function disableScrollRestoration() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
}

function createImage() {
  const figure = document.createElement('figure')
  const image = document.createElement('img') 
  const imgClass = randomClass()
  image.src = randomUrl() 
  image.classList.add(imgClass)
  figure.appendChild(image)
  return figure
}

function addRow(prepend) {
  const row = document.createElement('div')
  row.classList.add('row')
  const columns = 2
  for (let i = 0; i < columns; i++) {
    addColumn(row, false) 
  }
  if (prepend) {
    body.insertBefore(row, body.firstChild)
  } else {
    body.appendChild(row)
  }
}

function addColumns(prepend) {
  const rows = document.querySelectorAll('.row')
  for (let i = 0; i < rows.length; i++) {
    addColumn(rows[i], prepend)
  }
}

function addColumn(row, prepend) {
  const column = document.createElement('div')
  column.classList.add('column')
  for (let i = 0; i < defaultSize/5; i++) {
    const image = createImage()
    column.appendChild(image)
  }
  if (prepend) {
    row.insertBefore(column, row.firstChild)
  } else {
    row.appendChild(column)
  }
}

function removeRow(prepend) {
  const rows = document.querySelectorAll('.row')
  if (prepend && rows.length > 1) {
    body.removeChild(body.lastChild)
  } else if (rows.length > 1) {
    body.removeChild(body.firstChild)
  }
}

function removeColumn(prepend) {
  const columns = document.querySelectorAll('.column')
  const rows = document.querySelectorAll('.row')
  if (prepend && columns.length > 2) {
    for (let i = 0; i < rows.length; i++) {
      rows[i].removeChild(rows[i].lastChild)
    }
  } else if (columns.length > 2) {
    for (let i = 0; i < rows.length; i++) {
      rows[i].removeChild(rows[i].firstChild)
    }
  }
}

function randomClass() {
  const randomNumber = Math.random()
  if (randomNumber < .33) {
    return 'small'
  } else if (randomNumber < .66) {
    return 'medium'
  } else {
    return 'large'
  } 
}

function randomUrl() {
  const randomIndex = Math.floor(Math.random() * images.length)
  return images[randomIndex]
}
