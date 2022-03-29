function cards() {
    const parentItem = document.querySelector('.menu__field'),
          container = parentItem.querySelector('.container');


    class Item {
        constructor(img, alt, title, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes ;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        placeItem() {
            const div = document.createElement('div');
            if (this.classes.length == 0){
                this.element = 'menu__item';
                div.classList.add(this.element);
            } else {
                this.classes.forEach(className => div.classList.add(className));
            }
            

            div.innerHTML =  `
            <img src=${this.img} alt=${this.alt}>
            <h3 class="menu__item-subtitle">Меню "Фитнес"</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;
            this.parent.append(div);
        }

    }

    // const getResourse = async (url) => {
    //     const res = await fetch(url);

    //     if(!res.ok) {
    //         throw new Error(`Error with ${url}, status: ${res.status}`);
    //     }
    //     return await res.json();
    // };

    // getResourse('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new Item(img, altimg, title, descr, price, '.menu .container').placeItem();            
    //     });
    // });

    axios.get('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach(({img, altimg, title, descr, price}) => {
            new Item(img, altimg, title, descr, price, '.menu .container').placeItem();            
        });
    })
    .catch(function (error) {
      console.log(error);
    });
    // new Item(
    //     'img/tabs/vegy.jpg',
    //     'Vegy', 
    //     'Меню "Фитнес"', 
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и    высоким качеством!',
    //     9, 
    //     '.menu .container', 'menu__item', 'big').placeItem();
    // new Item(
    //     'img/tabs/elite.jpg',
    //     'Vegy', 
    //     'Меню "Премиум"', 
    //     'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
    //     10, 
    //     '.menu .container', 'menu__item').placeItem();
    // new Item(
    //     'img/tabs/post.jpg', 
    //     'Vegy', 
    //     'Меню "Постное"', 
    //     'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
    //     12, 
    //     '.menu .container', 'menu__item').placeItem();

}

export default cards;