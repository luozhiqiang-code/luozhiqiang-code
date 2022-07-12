// 1.fetcch()获得Jason数据
// 2.将获取的数据存为对象并用于初始化页面initialize()
// 3.监听search按钮，根据按钮更新页面，同时监听所选类别筛选search范围


// 需要initialize(),updateDisply(),selectCategory(),selectProduct(),fetchBlob(),showProduct(),等函数。

//创建变量存储从数据库获取的Jason数据
let products;

// 用fetch方法获取资源
fetch('products.json').then(function(response){
   if(response.ok){
       response.json().then(function(json){
           products = json;
          //  获取json对象后将数据传入initia函数初始化页面
           initialize();
       })
   } else {
        //  如果资源获取失败则通过日志打印
       console.log('Network request for products.json failed with response '+ response.status + ': '+ response.statusText);   
   }
});

// 初始化函数，获取页面的元素，根据用户的操作选择相应的数据，将数据渲染到页面上
function initialize(){

  // 获取页面的分类选择框、搜索框、搜索按钮、数据填充位置
    let category = document.querySelector('#category');
    let searchTerm = document.querySelector('#searchTerm');
    let searchBtn = document.querySelector('button');
    let main = document.querySelector('main');

    // 记录下最后选择的分类项和搜索项，方便后续更新数据是判断数据发生变化没
    let lastCategory = category.value;
    let lastSearch = '';

    // 声明分类数据组存储选择类别限制后的筛选数据范围，最终数据组选择类别和搜索限制后的最终数据范围。
    let categoryGroup;
    let finalGroup;

    // 首次打开页面应该初始页最终数据组为所有数据
    finalGroup = products;
    // 通过更新函数初始化页面
    updateDisplay();

      // 初始化页面后，将分类数据组和最终数据组清空初始化，以免后续操作出现错误
    categoryGroup = [];
    finalGroup = [];

    // 给搜索按钮设置监听事件，以相应用户的筛选请求
    searchBtn.onclick = selectCategory;
    // category.onclick = selectCategory;


    // 筛选类别函数，根据用户请求将数据的范围缩小到一个类别
    function selectCategory(e){
      //  利用preveDefault函数阻止表单提交，否则未经验证的表单直接提交影响效率和体验
      e.preventDefault();

      // 再次将分类数据组和最终数据组清空，清除上一次的搜索历史，以免后续操作出现错误
      categoryGroup = [];
      finalGroup = [];
      // 判断本次的类别和搜索内容是否没有发生改变，如果未改变则直接返回，无需更新，提高效率
      if(category.value === lastCategory && searchTerm.value.trim() === lastSearch){
        return;
      } else {
       
      // 本次的类别和搜索内容都发生了改变，则纪录本次类别和搜索内容为最后一次内容，方便持续判断
        lastCategory = category.value;
        // trim()函数用于清空字符串开头和结尾的空格
        lastSearch = searchTerm.value.trim();
        // 首先更新分类数据组,在这个基础上再更新搜索数据组
        if(category.value === 'All'){
          categoryGroup = products;
          selectProducts();
        }else{
          //  页面的字符串区分大小写,而数据中的字符串统一小写,所以要转换为小写才能进行比较等操作
          let categoryLowerCase = category.value.toLowerCase();
          for(let i = 0; i < products.length; i++){

            if(products[i].type === categoryLowerCase){
              categoryGroup.push(products[i]);
            }
          }
          // 调用选择商品函数,实际就是在分类后的数据中搜索
          selectProducts();
        }
      }

    }


    //  选择商品函数,也就是搜索数据函数
    function selectProducts(){
      // 判断本次搜索是否为空
      if(searchTerm.value.trim() === ''){
          finalGroup = categoryGroup;
          updateDisplay();
      } else {
        // 本次搜索不为空则先转换搜索框的关键字字符串为小写无空格,再从分类数据组中检索关键字,并添加到最终数据组
        let SearchTermLowerCase = searchTerm.value.trim().toLowerCase();

        for(let i = 0; i < categoryGroup.length; i++){
          if(categoryGroup[i].name.indexOf(SearchTermLowerCase) !== -1){
            finalGroup.push(categoryGroup[i]);
          }
        }

        updateDisplay();
      }
    }

    // 展示函数,用于将选择好的数据渲染到页面上
    function updateDisplay(){
        while(main.firstChild){
            main.removeChild(main.firstChild);
        }

        if(finalGroup.length === 0){
            let para = document.createElement('p');
            para.textContent = 'No results to display!';
            main.appendChild(para);
        } else{
            for(let i = 0; i < finalGroup.length; i++){
                fetchBlob(finalGroup[i]);
            }
        }
    }

    //  渲染页面需要向服务区索取图片等内容,通过fetchBlob函数来获取url
    function fetchBlob(product){

        let url = 'images/' + product.image;

        fetch(url).then(function(response){
             if(response.ok){
                 response.blob().then(function(blob){
                     let objectURL = URL.createObjectURL(blob);
                      
                     showProduct(objectURL,product);
                 });
             } else {
                 console.log('Network request for "' + product.name + '" image faile with response ' + response.status + ': ' + response.statusText);
             }
        });

    }
    
    // 获得URL和对象的数据后，直接渲染网页
    function showProduct(objectURL, product){

        let section = document.createElement('section');
        let heading = document.createElement('h2');
        let para = document.createElement('p');
        let image = document.createElement('img');

        section.setAttribute('class',product.type);

        heading.textContent = product.name.replace(product.name.charAt(0),product.name.charAt(0).toUpperCase());
        
        para.textContent = '$'+ product.price.toFixed(2);

        image.src = objectURL;
        image.alt = product.name;

        main.appendChild(section);
        section.appendChild(heading);
        section.appendChild(para);
        section.appendChild(image);
    }

}