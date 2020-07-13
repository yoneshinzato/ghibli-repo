//setting the logo and the container 

const app = document.querySelector("#root")

const logo = document.createElement('img') //creating logo image
logo.src = 'logo.png'

const container = document.createElement('div') //creating a div
container.setAttribute('class', 'container') //setting a class .container to the above div

app.appendChild(logo)
app.appendChild(container)


const request = new XMLHttpRequest(); //make an http request.
request.open('GET', "https://ghibliapi.herokuapp.com/films", true) //open a new connection using GET request on the URL endpoint

//onload Execute a JavaScript immediately after a page has been loaded
request.onload = function () {
  //begin accessing json here
  const data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {

    data.forEach(movie => {
      //div with card class
      const card = document.createElement('div')
      card.setAttribute("class", "card")

      //h1 and textContent with film's title
      const h1 = document.createElement('h1')
      h1.textContent = movie.title

      //p description and textContent with film's description
      const p = document.createElement('p')
      movie.description = movie.description.substring(0, 300) //limit to 300 chars
      p.textContent = `${movie.description}...`

      container.appendChild(card)
      card.appendChild(h1)
      card.appendChild(p)

    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = 'Sorry, it is not working. Try again!'
    app.appendChild(errorMessage)
  }

}

request.send()