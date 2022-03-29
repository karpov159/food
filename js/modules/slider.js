function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // Slider 
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          current = document.querySelector(currentCounter),
          total = document.querySelector(totalCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }
    current.textContent = `0${slideIndex}`;


    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(x => {
        x.style.width = width;
    });

    function deleteWords(str) {
        return +str.replace(/\D/g, '');
    }

    function checkIndex(index) {
        if (index < 10) {
            current.textContent = `0${index}`;
        } else {
            current.textContent = index;
        }
    }

    next.addEventListener('click', () => {
        if (offset == deleteWords(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteWords(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        checkIndex(slideIndex);

        dots.forEach(x => x.style.opacity = 0.5);
        dots[slideIndex-1].style.opacity = 1;

    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteWords(width) * (slides.length - 1);
        } else {
            offset -= deleteWords(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;


        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        checkIndex(slideIndex);

        dots.forEach(x => x.style.opacity = 0.5);
        dots[slideIndex-1].style.opacity = 1;

    });

    // dots
         const carousel = document.createElement('ol'),
          dots = [];

    function createCarousel(carousel, parent) {
        parent.style.position = 'relative';
        carousel.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
        `;
        carousel.classList.add('carousel-indicators');
        parent.append(carousel);
    }
    createCarousel(carousel, slider);

    function createDots(num, parent) {

        for (let i = 0; i < num; i++) {
            const div = document.createElement('li');
            div.classList.add('dot');
            div.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
            `;
            parent.append(div);
            
            if (i == 0) {
                div.style.opacity = 1;
            }

            dots.push(div);
       
        }
        slideDots();
        
    }
    createDots(slides.length, carousel);

    function slideDots() {
        carousel.addEventListener('click', (e) => {
            const target = e.target;
            dots[slideIndex-1].style.opacity = 0.5;

            if (target && target.classList.contains('dot')) {
                dots.forEach((dot,i) => {
                    if (dot == target) {
                        dot.style.opacity = 1;
                        slideIndex = i+1;
                        offset = deleteWords(width) * i;
                        slidesField.style.transform = `translateX(-${offset}px)`;

                        checkIndex(slideIndex);                  
                    }
                });
                
            }
        });
    
    }
}

export default slider;