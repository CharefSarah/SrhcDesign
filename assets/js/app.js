// Définition des variables et initialisation de l'animation SplitType
let typeSplit;

function runSplit() {
  typeSplit = new SplitType(".split__lines", {
    types: "lines, words"
  });
  $(".line").append("<div class='line__mask'></div>");
  createAnimation();
}

// Gestion du redimensionnement de la fenêtre
let windowWidth = $(window).innerWidth();
window.addEventListener("resize", function () {
  if (windowWidth !== $(window).innerWidth()) {
    windowWidth = $(window).innerWidth();
    typeSplit.revert();
    runSplit();
  }
});

// Création de l'animation avec GSAP et ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function createAnimation() {
  $(".line").each(function (index) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 70%",
        end: "bottom bottom",
        scrub: 4
      }
    });
    let delay = index * 2;
    tl.to($(this).find(".line__mask"), {
      width: "0%",
      duration: 3,
      delay: delay
    });
  });
}

window.onload = function () {
  runSplit();

  // Sélectionnez les éléments que vous voulez animer
  const h1 = document.querySelector('h1');
  const h2__content = document.querySelectorAll(' .title span');
  const links = document.querySelectorAll('li a');
  const small = document.querySelectorAll(' h3');
  const gallery = document.querySelector('.container__slider .right'); // Container de la galerie
 

  // Commencez l'animation pour le h2 dès que la page est chargée
  gsap.to(h2__content, {
    rotateX: 0,
    translateY: 0,
    delay: 1,
    duration: .7,
    stagger: .02,
    opacity: 1,
    ease: CustomEase.create("custom", "M0,0 C0.435,0.25 0.15,0.965 1,1 "),
  });

  gsap.from(h1, {
    delay: 0.8,
    duration: 0.3,
    autoAlpha: 0,
    ease: CustomEase.create("custom", "M0,0 C0.435,0.25 0.15,0.965 1,1 "),
    y: -20
  });
  gsap.from(small, {
    delay: 2.2,
    duration: .7,
    autoAlpha: 0,
    stagger: .02,
    opacity: 1,
    ease: CustomEase.create("custom", "M0,0 C0.435,0.25 0.15,0.965 1,1 "),
    y: -20
  });
  gsap.from(gallery, {
    delay: 2.6,
    duration: .7,
    autoAlpha: 0,
    stagger: .02,
    opacity: 1,
    ease: CustomEase.create("custom", "M0,0 C0.435,0.25 0.15,0.965 1,1 "),
    y: -20
  });


  // Animer chaque lien individuellement
  links.forEach((link, index) => {
    gsap.from(link, {
      delay: 1.8 + index * 0.2,
      duration: 0.5,
      autoAlpha: 0,
      ease: CustomEase.create("custom", "M0,0 C0.435,0.25 0.15,0.965 1,1 "),
      y: -20
    });
  });



  function Marquee(selector, speed) {
    const parentSelectors = document.querySelectorAll(selector);

    parentSelectors.forEach(parentSelector => {
      const clone = parentSelector.innerHTML;
      const firstElement = parentSelector.children[0];
      let i = 0;
      let isMouseOver = false; // Variable pour suivre l'état de survol de la souris

      // Arrêter le défilement lorsque la souris survole la section
      parentSelector.addEventListener('mouseover', function () {
        isMouseOver = true;
      });

      // Reprendre le défilement lorsque la souris quitte la section
      parentSelector.addEventListener('mouseout', function () {
        isMouseOver = false;
      });

      // Arrêter le défilement lorsque la souris survole les boutons
      const buttons = parentSelector.querySelectorAll('.button__marquee');
      buttons.forEach(function (button) {
        button.addEventListener('mouseover', function () {
          isMouseOver = true;
        });

        button.addEventListener('mouseout', function () {
          isMouseOver = false;
        });
      });

      parentSelector.insertAdjacentHTML('beforeend', clone);
      parentSelector.insertAdjacentHTML('beforeend', clone);

      setInterval(function () {
        if (!isMouseOver) {
          firstElement.style.marginLeft = `-${i}px`;
          if (i > firstElement.clientWidth) {
            i = 0;
          }
          i = i + speed;
        }
      }, 0);
    });
  }
};
 
const container = document.querySelector('.container__slider'); // Container global pour ecouter l'evenement du scroll
const gallery = document.querySelector('.container__slider .right'); // Container de la galerie
const images = document.querySelectorAll('.img_container'); // Array avec nos 5 images
// return: [img_1,img_2,img_3,img_4,img_5]
const pseudo_links = document.querySelectorAll('.left ul li .marker'); // Array avec nos 5 markers
// return: [marker_1,marker_2,marker_3,marker_4,marker_5]
const pseudo_links_parent = document.querySelectorAll('.left ul li'); // Array avec nos 5 liens
// return: [li_1,li_2,li_3,li_4,li_5]
// ---------------
var isScrolling = false; // Variable pour suivre l'etat du scroll
let isActive = 0; // Variable pour tracké quel images est actuellement affiché.

container.addEventListener('wheel', (e) => {
    // Si la fonction est déja en cours d'execution, on bloque tout nouveaux lancements.
    if (isScrolling) {
        return;
    }

    // Hauteur de l'écran, pour savoir de combien on doit scroller.
    // On l'enregistre a ce moment la pour s'adapté au resize de l'écran.
    let height = window.innerHeight;

    // DeltaY mesure le sens de scroll et l'inégalité sur isActive permet de ne pas scroll en dehors de l'array.
    // Si on monte et qu'on est pas déja en haut : 
    if (e.deltaY < 0 && isActive > 0) {
        // Scroll vers le haut
        isScrolling = true; // On bloque l'eventuel relance de la fonction
        pseudo_links[isActive].classList.remove('active'); // On toggles les classes actives et enregistre le changement de isActive.
        isActive = isActive - 1;
        pseudo_links[isActive].classList.add('active');
        // On anime l scroll vers le haut.
        gsap.to(gallery, {
            duration: .5,
            scrollTop: '-=' + height,
            onComplete: function () {
                setTimeout(function () {
                    isScrolling = false;
                }, 450);
            }
        });

        // De même si on descend et qu'on est pas déja en bas :
    } else if (e.deltaY > 0 && isActive < 4) {
        //Scrolling Down
        isScrolling = true;
        pseudo_links[isActive].classList.remove('active');
        isActive = isActive + 1;
        pseudo_links[isActive].classList.add('active');

        console.log(isActive);

        gsap.to(gallery, {
            duration: .5,
            scrollTop: '+=' + height,
            onComplete: function () {
                setTimeout(function () {
                    isScrolling = false;
                }, 450);
            }
        });

    } else {
        // Console log si ca bloque
        console.log('Bloqué');
    }
});


pseudo_links_parent.forEach((link, index) => {
    // Pour chaque lien en bas a gauche on ajouter un listener : 
    link.addEventListener('click', () => {
        pseudo_links.forEach((pseudo_link) => {
            if (pseudo_link.classList.contains('active')) {
                pseudo_link.classList.remove('active');
            }
        });

        pseudo_links[index].classList.add('active');
        isActive = index;
        let num = link.getAttribute('data-num');
        if (isScrolling) {
            return;
        }
        let height = window.innerHeight;
        let toScroll = (height * num);
        gsap.to(gallery, {
            duration: .5,
            scrollTop: toScroll,
            onComplete: function () {
                setTimeout(function () {
                    isScrolling = false;
                }, 450);
            }
        });
    });

    return isActive;
});

gsap.registerPlugin(ScrollTrigger);
let innerHeight = window.innerHeight;
gsap.to(container, {
    scrollTrigger: {
        trigger: container,
        start: "top top",
        end: '+=' + innerHeight * 1.5,
        scrub: true,
        pin: true,
        anticipatePin: 3,
    },
})