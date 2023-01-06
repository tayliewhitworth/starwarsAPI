import './style.css'
import axios from 'axios'

axios.get('https://swapi.dev/api/people/')
.then((res) => {handleResults(res)})
.catch(e => console.log(e))

const starwars = document.getElementById('starwars')

function handleResults(data) {
  console.log(data)
  const peopleData = data.data.results.map(person => ({
    name: person.name,
    dob: person.birth_year,
    gender: person.gender,
    url: person.url
  }))
  console.log(peopleData)
  peopleData.forEach(person => {
    const divItem = document.createElement('div');
    divItem.innerHTML = `<h1>${person.name}</h1><h3>DOB: ${person.dob}</h3> <h3>Gender: ${person.gender}</h3>`
    divItem.classList.add('person-box')
    divItem.addEventListener('click', async () => {
      console.log('click')
      try {
        const response = await axios.get(`${person.url}`)
        const data = response.data
        const infoBox = document.createElement('div');
        infoBox.classList.add('info-box');
        infoBox.innerHTML = `
        <p><strong>Name: </strong>${data.name}</p>
        <p><strong>Gender:</strong> ${data.gender}</p>
        <p><strong>Birth Year:</strong> ${data.birth_year}</p>
        <p><strong>Eye Color:</strong> ${data.eye_color}</p>
        <p><strong>Hair Color:</strong> ${data.hair_color}</p>
        <p><strong>Height:</strong> ${data.height} cm</p>
        <p><strong>Mass:</strong> ${data.mass} kg</p>
        <button class='close-btn'>Close</button>
        `
        document.body.appendChild(infoBox)

        const top = divItem.offsetTop;
        const left = divItem.offsetLeft;
        infoBox.style.top = `${top}px`;
        infoBox.style.left = `${left}px`;

        const closeButton = document.querySelector('.close-btn');
        closeButton.addEventListener('click', () => {
          infoBox.remove();
        })
      } catch(e) {
        console.error(e)
      }
    })
    starwars.appendChild(divItem)
  })
}

