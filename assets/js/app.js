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
  const h2__content = document.querySelectorAll('.title span');
  const links = document.querySelectorAll('li a');
  const skills = document.querySelectorAll('.skills li');

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
    delay: 1.8,
    duration: 0.3,
    autoAlpha: 0,
    ease: CustomEase.create("custom", "M0,0 C0.435,0.25 0.15,0.965 1,1 "),
    y: -20
  });

  // Animer chaque lien individuellement
  links.forEach((link, index) => {
    gsap.from(link, {
      delay: 1.8 + index * 0.2,
      duration: 0.8,
      autoAlpha: 0,
      ease: CustomEase.create("custom", "M0,0 C0.435,0.25 0.15,0.965 1,1 "),
      y: -20
    });
  });

  // Animer chaque compétence individuellement
  skills.forEach((skill, index) => {
    gsap.from(skill, {
      delay: 1.8 + index * 0.2,
      duration: 0.8,
      autoAlpha: 0,
      ease: CustomEase.create("custom", "M0,0 C0.435,0.25 0.15,0.965 1,1 "),
      y: -50
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

  Marquee('.marquee', 0.2);

  const callto = document.querySelector('.reveal__callto');
  const callto__letters = document.querySelectorAll('.callto__letters');

  gsap.to(callto__letters, {
    scrollTrigger: {
      trigger: callto,
      start: "top 55%",
      end: "top 20%",
      toggleActions: "restart none none reverse"

    },
    rotateX: 0,
    translateY: 0,
    duration: .6,
    stagger: .016,
    opacity: 1,
    ease: CustomEase.create("custom", "M0,0 C0.435,0.25 0.15,0.965 1,1 "),
  });
};

// const card = document.querySelector('.card');
// const card__container = document.querySelector('.card__container');


// let tl__card = gsap.timeline({
//   scrollTrigger: {
//     trigger: card__container,
//     start: 'top 60%',
//     end: 'top 10%',
//     toggleActions: "restart none none reset"
//   },
// })

// tl__card.to(card, {
//   rotateX: 0,
//   translateY: 0,
//   duration: 2.2,
//   opacity: 1,
//   ease: CustomEase.create("custom", "M0,0 C0.435,0.25 0.15,0.965 1,1 "),
// })


// $(function(){
  
//   let x, y;
//   const mousemove = ({ clientX, clientY }) => (x = clientX, y = clientY);
//   const dist = (x1, y1, x2, y2) => Math.sqrt(Math.abs(x1 - x2) + Math.abs(y1 - y2));
//   const points = [];
//   const MIN_DIST = 1;
//   const MAX_POINTS = 10;
//   const svgns = 'http://www.w3.org/2000/svg';
//   let { width, height } = svg.getBoundingClientRect();
  
//   svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  
//   addEventListener('resize', () => {
//     const r = svg.getBoundingClientRect();
//     width = r.width; height = r.height;
//     svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
//   });
  
//   function frame() {
//     requestAnimationFrame(frame);
//     if (!x || !y) return;
//     if (!points.length) return points.push([x, y]);
//     const [px, py] = points[points.length - 1];
//     const d = dist(x, y, px, py);
//     if (d < MIN_DIST) return;
//     points.push([x, y]);
//     const pathString = points.reduce((acc, [x, y]) => {
//       return acc + ` ${x},${y}`
//     }, '');
//     polyline.setAttribute('points', pathString);
//     if (points.length > MAX_POINTS) points.shift();
//   }

//   addEventListener('mousemove', mousemove);
//   requestAnimationFrame(frame);
  
// });




/* ---------------------------------- GRID ---------------------------------- */
let cells = [];

function generateGrid() {
    var gridContainer = document.getElementById("grid-container");
    var gridWidth = document.documentElement.scrollWidth;
    var gridHeight = document.documentElement.scrollHeight;

    var cellSize = 45; // Taille de chaque cellule de la grille

    var numColumns = Math.floor(gridWidth / cellSize);
    var numRows = Math.floor(gridHeight / cellSize);

    for (var row = 0; row < numRows; row++) {
        for (var col = 0; col < numColumns; col++) {
            var cell = document.createElement("div");
            cell.classList.add("grid-cell");
            gridContainer.appendChild(cell);
        }
    }

    cells = Array.from(document.querySelectorAll(".grid-cell")); // Convertit la NodeList en tableau
    return cells;
}

window.addEventListener("load", generateGrid);

window.addEventListener("load", () => {
    cells.forEach((cell) => {

        cell.addEventListener("mouseover", () => {
            let cell_tl = gsap.timeline();
            cell_tl.to(cell, {
                duration: 0.1,
                backgroundColor: "#fff",
                ease: "power2.inOut"
            });
        });


        cell.addEventListener('mouseout', () => {
            let cell_tl = gsap.timeline();
            cell_tl.to(cell, {
                duration: .5,
                backgroundColor: 'transparent',
                ease: "power2.Out"
            })
        });

    });
});