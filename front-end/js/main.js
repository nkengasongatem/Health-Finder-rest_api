function find (event) {
  event.preventDefault()

  let latitude = document.getElementById('lat').value
  let longitude = document.getElementById('long').value
  const fetchURL = `/api/health-units?lng=${longitude}&lat=${latitude}`

  // Remove existing results from the dom before new search
  let list = document.getElementById('result-list').hasChildNodes(); 
  if (list) {
    document.getElementById('result-list').innerHTML = "";
  } 

  // TEST: http://127.0.0.1:4000/api/health-units?lng=-53.7&lat=37.055
  fetch(fetchURL)
    .then(data => {
      return data.json()
    })
    .then(json => {
      console.log(json);
      if (json === undefined || json.length == 0) {
        swal("No Health units were found in this area!");
        return false;
      }
      json.forEach(unit => {        
        
        let ul = document.getElementById('result-list');
        ul.setAttribute("class", "collection");

        let li = document.createElement("li");
        li.setAttribute("class", "collection-item avatar");
        li.innerHTML =  
        `<i class="material-icons circle ${unit.available}"></i>
            <span class="title">${unit.name}</span>
            <p style="font-size: 0.9rem;">${parseInt(unit.distance/1000)} km away<br>
            ${unit.desc}
            </p>
        <p class="secondary-content">${unit.category}<br>
        <span style="font-size: 0.9rem; color: grey;">Rating: ${unit.rating}</span>
        </p>`;
        ul.appendChild(li); 
      });
    })
    .catch(() =>
      swal(
        'Ooops!',
        'We could not perform the search. Check your connection and try again',
        'error'
      )
    )
}

/*
<li class='collection-item'>Alvin</li>
<li class="collection-item avatar">
      <img src="images/yuna.jpg" alt="" class="circle">
      <span class="title">Title</span>
      <p>First Line <br>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    </li>

    <li class="collection-item avatar">
      <i class="material-icons circle green">insert_chart</i>
      <span class="title">Title</span>
      <p>First Line <br>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    </li>
*/
