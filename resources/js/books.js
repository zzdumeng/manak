$ = document.querySelector.bind(document)

bookList = $('#books-list')
bookDetail = $('.content')

function stringify(data) {
  res = []
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key];
      res.push(`${key}=${element}`)
    }
  }
  return res.join("&")
}
function makeRequest(method /* string */, url, opts, success, error) {
  method = method.toUpperCase()

  const xhr = new XMLHttpRequest()
  actions = ['POST', 'DELETE', 'PATCH', 'PUT']
  if (actions.indexOf(method) > -1) {
    xhr.open(method, url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify())
  } else {

    xhr.open(method, `${url}?${stringify(opts)}`)
  }
  xhr.onreadystatechange = (function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        success(xhr.responseText)

      } else {
        error = error || (() => { })
        error(xhr.responseText)
      }
    }
  })
}

const request = {}

request.get = makeRequest.bind(this, 'GET')
request.post = makeRequest.bind(this, 'POST')

// make a request 
request.post(
  '/manak/api/book/all',
  {},
  function (res) {
    json = JSON.parse(res)
    if (!json.error) {
      json.forEach(function (book) {
        const li = document.createElement('li')
        li.innerHTML = `<b>${book.title}</b>  <span>${book.author} </span>`
        li.dataset['title'] = book.title
        li.addEventListener('click', function(e) {
          // 
          request.post('/manak/api/book/'+li.dataset['title'], {},
          function(res) {
            const detail = JSON.parse(res)
            bookDetail.innerHTML = `<pre> ${detail.content}</pre>`
          })
        })
        bookList.appendChild(li)
      })
    } else {
      alert("error occured: ", json.error)
    }
  }
)