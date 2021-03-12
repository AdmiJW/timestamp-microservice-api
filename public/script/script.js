


//=============================
//  CLOCK LOGICS
//=============================
const [ hourHTML, colonHTML, minutesHTML, ampmHTML] = document.querySelector('#nav-clock__time').children;

let showToggler = true;
let time = new Date();


const setTime = () => {
    if (!showToggler) 
        time = new Date();

    hourHTML.innerText = `${time.getHours() < 10? `0${time.getHours()}`: time.getHours()}`;
    colonHTML.innerText = showToggler? ':': '';
    minutesHTML.innerText = `${time.getMinutes() < 10? `0${time.getMinutes()}`: time.getMinutes()}`;
    ampmHTML.innerText = `${time.getHours() < 12? 'a.m': 'p.m'}`;

    showToggler = !showToggler;
}

setInterval(() => {
    setTime();
}, 500);




//=====================
//  FORM Handler
//=====================
const form = document.querySelector('#api__form__form');
const formDateInput = document.querySelector('#form__date');
const formDateStrInput = document.querySelector('#form__date_str');

form.addEventListener('submit', (e)=> {
    e.preventDefault();

    const dateValue = formDateInput.valueAsNumber || formDateStrInput.value;
    const date = Math.floor( new Date(dateValue) / 1000);
    
    if ( !Number.isNaN(date) ) 
        window.location.href = `./api/timestamp/${formDateInput.valueAsNumber || formDateStrInput.value}`;
    else 
        window.alert('Invalid Date Input');
});