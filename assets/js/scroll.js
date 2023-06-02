// Elements
const container__parent = document.querySelector('.container__slider__parent');
const container__slider = document.querySelector('.container__slider');
const right__container = document.querySelector('.container__slider .right');
const img_array = document.querySelectorAll('.img_container');
// Taille total de la gallery en faisant --> TAILLE D'UNE IMAGE * NOMBRE D'IMAGE.
const gallery_total_height = img_array[0].offsetHeight * img_array.length;
// Taille 'corrigé' de la gallery, en réduisant la taille de la gallery par la taille d'une image.
// Le scroll étant basé sur le "haut" des images il fallait le réduire pour raccourcir le scrollTrigger.
const corrected_total_height = gallery_total_height - img_array[0].offsetHeight;
// Renvoi la valeur du snap en fonction du nombre d'image. ( .25 pour cinq image par exemple ).
let progress_step = 1 / (img_array.length - 1);

// ---------------
const pseudo_links_parent = document.querySelectorAll('.left ul li');
const pseudo_links = document.querySelectorAll('.left ul li .marker');

// ScrollTrigger -->
gsap.to(right__container, {
    scrollTrigger: {
        trigger: container__parent,
        start: "top top",
        end: `+=${corrected_total_height}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        snap: {
            snapTo: 1 / (img_array.length - 1),
            duration: {
                min: 0.1,
                max: 0.1
            },
            delay: 0.2,
            ease: "power2.inOut"
        },
        onUpdate: function (self) {
            let progress = self.progress.toFixed(2);
      
            for (let i = 0; i < img_array.length; i++) {
                if (progress >= progress_step * i && progress < progress_step * (i + 1)) {
                    img_array.forEach((img) => {
                        img.classList.remove('active');
                    });
                    img_array[i].classList.add('active');
                }

                if (img_array[i].classList.contains('active')) {
                    pseudo_links.forEach((pseudo_link) => {
                        if (pseudo_link.classList.contains('active')) {
                            pseudo_link.classList.remove('active');
                        }
                    });
                    pseudo_links[i].classList.add('active');
                }
            }
        },
    },
    scrollTop: corrected_total_height,
    // ----
    ease: "none",
});