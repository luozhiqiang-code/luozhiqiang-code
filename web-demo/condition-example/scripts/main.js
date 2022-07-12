let select = document.querySelector('select');
let para = document.querySelector('p');

select.addEventListener('change',SetWeather);

function SetWeather(){
    let chioce = select.value;

    if (chioce === 'sunny'){
        para.textContent = 'It is nice and sunny outside today. Wear shorts! Go to the beach, or the park, and get an ice cream.';
    } else if (chioce ==='rainy'){
        para.textContent = 'Rain is falling outside; take a rain coat and a brolly, and don\'t stay out for too long.';
    } else if (chioce === 'snowing'){
        para.textContent = 'The snow is coming down — it is freezing! Best to stay in with a cup of hot chocolate, or go build a snowman.';
    } else if (chioce === 'overcast'){
        para.textContent = 'It isn\'t raining, but the sky is grey and gloomy; it could turn any minute, so take a rain coat just in case.';
    } else {
        para.textContent = '';
    }
}