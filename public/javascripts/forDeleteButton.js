const restaurantsWrapper = document.querySelector('#restaurants-wrapper')
const deleteRestaurant = document.querySelector('#delete-restaurant')
const deleteButtonForm = document.querySelector('#delete-button-form')

restaurantsWrapper.addEventListener('click', function onRestaurantsListClicked (e) {
  const name = e.target.dataset.name
  const id = e.target.dataset.id
  deleteRestaurant.innerText = ''
  deleteButtonForm.setAttribute('action', '')
  deleteRestaurant.innerText = name
  deleteButtonForm.setAttribute('action', `/restaurants/${id}?_method=DELETE`)
})
