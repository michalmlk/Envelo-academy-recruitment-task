let phoneNum, userCode, time, submitButton,
    startButton, collectNewButton, noMoreButton, inputs, popup, errorInfo, wrapper, startTime, stopTime, startComunicate, container
const validNumberSigns = /[0-9]/i
const special = /[!@#$%^&*()-+=]/i
const letters = /[a-z]/i
const errorMessage = 'Ups! Chyba wkradł się błąd 🤔'
const start = () => {
    startTime = Date.now()
    inputs.classList.remove('hidden')
    inputs.classList.add('new')
    startButton.classList.add('hidden')
    submitButton.classList.remove('hidden')
    submitButton.textContent='ODBIERZ PACZKĘ'
    startComunicate.classList.add('hidden')
}
const validPhone = () => {
    const phoneNumVal = phoneNum.value
    if (phoneNumVal.length == 9 && phoneNumVal.match(validNumberSigns) && !phoneNumVal.match(letters) && !phoneNumVal.match(special)) {
        phoneNum.style.backgroundColor = 'rgba(0,255,0,.2)'
        errorInfo.textContent = '';
        return true
    } else if (phoneNumVal == '') {
        errorInfo.textContent = ''
        phoneNum.style.backgroundColor = 'transparent'
        return false
    } else {
        errorInfo.textContent = errorMessage
        phoneNum.style.backgroundColor = 'rgba(255,0,0,.2)'
        return false
    }
}
const validCode = () => {
    const userCodeVal = userCode.value;
    if (userCodeVal.length == 4 && !userCodeVal.match(letters) && !userCodeVal.match(special)) {
        //errorInfo.textContent='';
        userCode.style.backgroundColor = 'rgba(0,255,0,.2)'
        return true
    } else if (userCodeVal == '') {
        errorInfo.textContent = ''
        userCode.style.backgroundColor = 'transparent'
        return false
    } else {
        errorInfo.textContent = errorMessage
        userCode.style.backgroundColor = 'rgba(255,0,0,.2)'
        return false
    }
}
const newPromise = () =>{
    // submitButton.textContent=""
    submitButton.classList.add('loading')
    return new Promise((resolve,reject) =>{
        submitButton.textContent=''
            resolve(setTimeout(()=>{
                validation()
            },1000))
            reject(()=>errorInfo.textContent=errorMessage)
    })
}
const validation = () => {
    const phoneNumVal = phoneNum.value;
    const userCodeVal = userCode.value;
    //jeżeli kod będzie krótszy niż cyfry lub numer będzie nieprawidłowy, zostanie wyświetlony błąd
    if ((phoneNumVal.length == 9 && phoneNumVal.match(validNumberSigns) && !phoneNumVal.match(letters) && !phoneNumVal.match(special)) && (userCodeVal.length == 4 && !userCodeVal.match(letters) && !userCodeVal.match(special))) {
        popup.classList.remove('hidden')
        popup.classList.add('success')
        errorInfo.textContent = ''
        wrapper.classList.add('success')
        errorInfo.classList.remove('new')
        stopTime = Date.now()
        seconds = Math.abs(((stopTime - startTime) / 1000).toFixed(2))
        time.textContent = seconds

        return true
    }
    // walidacja na wypadek nizgodności danych.
    else {
        errorInfo.textContent = 'Ups! Wprowadzone dane są nieprawidłowe 🙁'
        errorInfo.classList.add('new')
        submitButton.classList.remove('loading')
        submitButton.textContent='ODBIERZ PACZKĘ'

        return false
    }
}
const collectNew = () => {
    startTime = Date.now()
    phoneNum.value = ''
    userCode.value = ''
    popup.classList.remove('success')
    wrapper.classList.remove('success')
    popup.classList.add('hidden')
    userCode.style.backgroundColor = 'transparent'
    phoneNum.style.backgroundColor = 'transparent'
    submitButton.classList.remove('loading')
    submitButton.textContent='ODBIERZ PACZKĘ'
    startComunicate.classList.add('hidden')
}
const all4Today = () => {
    phoneNum.value = ''
    userCode.value = ''
    inputs.classList.remove('new')
    inputs.classList.add('hidden')
    submitButton.classList.add('hidden')
    submitButton.classList.remove('loading')
    startButton.classList.remove('hidden')
    popup.classList.add('hidden')
    wrapper.classList.remove('success')
    popup.classList.remove('success', 'appear')
    userCode.style.backgroundColor = 'transparent'
    phoneNum.style.backgroundColor = 'transparent'
    startComunicate.classList.remove('hidden')
    seconds = 0;
}

const prepareDOMElements = () => {
    wrapper = document.querySelector('body')
    container = document.querySelector('.wrapper')
    phoneNum = document.querySelector('.grid-area-1')
    userCode = document.querySelector('.grid-area-2')

    submitButton = document.querySelector('.get-package')
    startButton = document.querySelector('.get-package-start')
    collectNewButton = document.querySelector('.next-package')
    noMoreButton = document.querySelector('.no-more')

    inputs = document.querySelector('.inputs')
    popup = document.querySelector('.popup')
    time = document.querySelector('.time')
    startComunicate = document.querySelector('.wrapper>h3:nth-of-type(2)')
    errorInfo = document.querySelector('.error-info')
    seconds = 0
}
const prepareDOMEvents = () => {
    startButton.addEventListener('click', start)
    collectNewButton.addEventListener('click', collectNew)
    noMoreButton.addEventListener('click', all4Today)
    submitButton.addEventListener('click', newPromise)
    container.addEventListener('click', validPhone)
    container.addEventListener('click', validCode)
}
const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}
window.addEventListener('DOMContentLoaded', main);