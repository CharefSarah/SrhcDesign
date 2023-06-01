const container__parent = document.querySelector('.container__slider__parent');
const container__slider = document.querySelector('.container__slider');
const right__container = document.querySelector('.container__slider .right');
const img_array = document.querySelectorAll('.img_container');
const gallery_total_height = img_array[0].offsetHeight * img_array.length;
const corrected_total_height = gallery_total_height - img_array[0].offsetHeight;

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
    },
    scrollTop: corrected_total_height,
    ease: "none",
});


// const pseudo_links = document.querySelectorAll('.left ul li .marker');
// const pseudo_links_parent = document.querySelectorAll('.left ul li');
// //Function ON CLICK des liens en bas a gauche de la section.
// pseudo_links_parent.forEach((link, index) => {
//   link.addEventListener('click', () => {
//     pseudo_links.forEach((pseudo_link) => {
//       if (pseudo_link.classList.contains('active')) {
//         pseudo_link.classList.remove('active');
//       }
//     });
//     pseudo_links[index].classList.add('active');
//     isActive = index;
//     console.log(gallery);
//     if (isScrolling) {
//       return;
//     }
//     let height = gallery.offsetHeight + 1;
//     let toScroll = (height * isActive);
//     gsap.to(gallery, {
//       duration: .5,
//       scrollTop: toScroll,
//       onComplete: function () {
//         setTimeout(function () {
//           isScrolling = false;
//         }, 450);
//       }
//     });
//   });

//   return isActive;
// });