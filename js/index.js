document.addEventListener("DOMContentLoaded", () => {

    const productsList = {
        1: {
            id: 1,
            image: 'images/1.jpg',
            name: 'Product 1',
            price: 500,
        },
        2: {
            id: 2,
            image: 'images/2.jpg',
            name: 'Product 2',
            price: 700,
        },
        3: {
            id: 3,
            image: 'images/3.jpg',
            name: 'Product 3',
            price: 1000,
        },
    }
    const productsInBasket = JSON.parse(localStorage.getItem('basket')) ?? {};
    const productsWrapper = document.querySelector(".products");
    const smallBasket = document.querySelector('.small-basket');
    const buyButtonTextDefault = 'В корзину';
    const buyButtonTextAdd = 'Добавлено';

    function createProduct(product, status, count){
        // Create li
        const productNode = document.createElement('li');
        productNode.classList.add('product__item');
        // Create image 
        const productImageWr = document.createElement('div');
        productImageWr.classList.add('product__item-image');
        const productImage = document.createElement('img');
        productImage.src = product.image;
        // Create name 
        const productName = document.createElement('div');
        productName.innerText = product.name;
        // Create price 
        const productPrice = document.createElement('div');
        productPrice.innerText = product.price + ' р';
        // Create buttons
        const buttonsWr = document.createElement('div');
        const button = document.createElement('button');
        const countInput = document.createElement('input');
        buttonsWr.classList.add('product__item-buttons');
        button.classList.add('buttons__add-basket');
        button.setAttribute('data-id', product.id);
        button.innerText = (status) ? buyButtonTextAdd : buyButtonTextDefault;
        (status) ? button.classList.add('active') : '';

        countInput.classList.add('buttons__count');
        countInput.type = "number";
        countInput.min = 1;
        countInput.value = (count) ? count : 1;
        buttonsWr.append(button);
        buttonsWr.append(countInput);

        productImageWr.append(productImage);
        productNode.append(productImageWr);
        productNode.append(productName);
        productNode.append(productPrice);
        productNode.append(buttonsWr);

        productsWrapper.append(productNode);
    }
    // Basket add 
    function addBasket(productItem){
        const id = productItem.id;
        productsInBasket[id] = productItem;
        localStorage.setItem('basket', JSON.stringify(productsInBasket));
    }
    // Remove basket 
    function removeBasket(productItem){
        const id = productItem.id;
        delete productsInBasket[id];
        localStorage.setItem('basket', JSON.stringify(productsInBasket));
    }
    // Check count value 
    function validateCount(context){
        const countNode = context.parentNode.querySelector('.buttons__count'); 
        let countValue = +countNode.value;

        countValue = (countValue > 0) ? countValue : 1;
        countNode.value = countValue;
        return countValue;
    }
    // Update small basket 
    function updateSmallBasket(){
        const count = Object.keys(productsInBasket).length;
        smallBasket.innerText = count;
    }
    // Click add basket function
    function clickAddButton(){
        const productItem = {};
        productItem.id = +this.getAttribute('data-id');
        productItem.countValue = validateCount(this);
        if(this.classList.contains('active')){
            this.classList.remove('active');
            this.innerText = buyButtonTextDefault;
            removeBasket(productItem);
        }else{
            this.classList.add('active');
            this.innerText = buyButtonTextAdd;
            addBasket(productItem);
        }
        updateSmallBasket();
    }

    // Render products 
    for (const key in productsList) {
        if (Object.hasOwnProperty.call(productsList, key)) {
            const product = productsList[key];
            const status = (productsInBasket[key]) ? true : false;
            const count = (productsInBasket[key]) ? productsInBasket[key].countValue : '';
            createProduct(product, status, count);
        }
    }

    updateSmallBasket();
    
    const addButton = document.querySelectorAll('.buttons__add-basket');
    addButton.forEach(button => {
        button.addEventListener('click', clickAddButton);
    })


})