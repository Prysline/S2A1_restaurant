const address = document.querySelector('#location')
const mapButton = document.querySelector('#map-button')
address.addEventListener('change', function onLocationChanged (e) {
  const value = e.target.value
  if (value !== '') {
    mapButton.setAttribute('href', 'https://www.google.com.tw/maps/place/' + value)
    mapButton.setAttribute('target', '_blank')
  } else {
    mapButton.setAttribute('href', '#')
    mapButton.removeAttribute('target')
  }
})
