let mainText = document.querySelector('.mainText')
let mainTextValue = document.querySelector('.mainText').innerHTML

const regex = '\n'
const formattedText = mainTextValue.replaceAll(regex, '<br>')

console.log(mainText.innerHTML = formattedText)