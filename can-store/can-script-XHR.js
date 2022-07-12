const request = new XMLHttpRequest();

request.open('GET', 'products.json');
request.responseType = 'json';

request.onload = function(){
     if(request.status === 200){
         let products = request.response;
         initialize(products);
     } else {
         console.log('Network request for products.json faled with response ' + request.status + ': ' + request.statusText);
     }
}

request.send();

function initialize(products){
       
    const category = document.querySelector('#category');
    const searchTerm = document.querySelector('#searchTerm');
    const mainSection = document.querySelector('main');
    const searchBtn = document.querySelector('button');

    let lastCategory = category.value;
    let lastSearch = searchTerm.value;

    let categoryGroup;
    let finalGroup;

    finalGroup = products;
    updateDisplay();
 
    categoryGroup = [];
    finalGroup = [];

    searchBtn.onclick = selectCategory;

    function selectCategory(e){

        e.preventDefault();

        categoryGroup = [];
        finalGroup = [];

        if(category.value === lastCategory && searchTerm.value.trim() === lastSearch){
            return;
        }else{
            lastSearch = searchTerm.value.trim();
            lastCategory = category.value;

            if(category.value === 'All'){
                categoryGroup = products;
                selectProducts();
            } else {
                let lowerCaseType = category.value.toLowerCase();
                for(let i=0; i<products.length; i++){

                    if(products[i].type === lowerCaseType){
                        categoryGroup.push(products[i]);
                    }
                }
                selectProducts();
            }
        }
    }


    function selectProducts(){
        if(searchTerm.value.trim() === ''){
            finalGroup = categoryGroup;
            updateDisplay();
        } else {
            let lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();
            for(let i = 0; i < categoryGroup.length; i++){
                if(categoryGroup[i].name.indexOf(lowerCaseSearchTerm)!==-1){
                    finalGroup.push(categoryGroup[i]);
                }
            }
            updateDisplay();
        }
    }

    function updateDisplay(){

        while(mainSection.firstChild){
            mainSection.removeChild(mainSection.firstChild);
        }

        if(finalGroup.length === 0){
            const para = document.createElement('p');
            para.textContent = 'No result to display!';
            mainSection.appendChild('para');
        } else {
            for(let i=0; i<finalGroup.length ;i++){
                fetchBlob(finalGroup[i]);
            }
        }
    }

    function fetchBlob(product){
        let url = 'images/' + product.image;

        const request = new XMLHttpRequest();
        request.open('GET',url);
        request.responseType = 'blob';

        request.onload = function(){
            if(request.status === 200){
                let blob = request.response;
                let objectURL = URL.createObjectURL(blob);

                showProduct(objectURL,product);
            } else {
                console.log('Network request for "' + product.name + '" image failed with response ' + request.status + ': ' + request.statusText);
            }
        }
        request.send();
    }

    function showProduct(objectURL,product){
  
        const section = document.createElement('section');
        const heading = document.createElement('h2');
        const para = document.createElement('p');
        const image = document.createElement('img');

        section.setAttribute('class',product.type);

        heading.textContent = product.name.replace(product.name.charAt(0),product.name.charAt(0).toUpperCase());

        para.textContent = '$' + product.price.toFixed(2);

        image.src = objectURL;
        image.alt = product.name;

        mainSection.appendChild(section);
        section.appendChild(heading);
        section.appendChild(para);
        section.appendChild(image);
    }


}