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
    const h2 = document.querySelector('.title');
    const links = document.querySelectorAll('li a');
    const skills = document.querySelectorAll('.skills li');

    // Commencez l'animation pour le h2 dès que la page est chargée
    gsap.from(h2, {
      delay: 0.2,
      duration: 1,
      autoAlpha: 0,
      ease: "power4.out",    y: -50
    });
  
    // Animer le h1 après un court délai
    gsap.from(h1, {
      delay: 1.5,
      duration: 0.6,
      autoAlpha: 0,
      ease: "power4.out",
      y: -50
    });
  
    // Animer chaque lien individuellement
    links.forEach((link, index) => {
      gsap.from(link, {
        delay: 1.5 + index * 0.3,
        duration: 0.6,
        autoAlpha: 0,
        ease: "power4.out",
        y: -50
      });
    });
  
    // Animer chaque compétence individuellement
    skills.forEach((skill, index) => {
      gsap.from(skill, {
        delay: 1.5 + index * 0.3,
        duration: 0.2,
        autoAlpha: 0,
        ease: "power4.out",
        y: -50
      });
    });
  };

  function Marquee(selector, speed) {
    const parentSelector = document.querySelector(selector);
    const clone = parentSelector.innerHTML;
    const firstElement = parentSelector.children[0];
    let i = 0;
    console.log(firstElement);
    parentSelector.insertAdjacentHTML('beforeend', clone);
    parentSelector.insertAdjacentHTML('beforeend', clone);
  
    setInterval(function () {
      firstElement.style.marginLeft = `-${i}px`;
      if (i > firstElement.clientWidth) {
        i = 0;
      }
      i = i + speed;
    }, 0);
  }
  
 
  window.addEventListener('load', Marquee('.marquee', 0.2))
  