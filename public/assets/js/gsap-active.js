/*  gsap  js start*/
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
$(document).ready(function () {
    var st = $(".poort-text");
    if (st.length == 0) return;
    gsap.registerPlugin(SplitText);
    st.each(function (index, el) {
        el.split = new SplitText(el, { type: "lines,words,chars", linesClass: "poort-line" });
        gsap.set(el, { perspective: 600 });
        if ($(el).hasClass("poort-in-right")) {
            gsap.set(el.split.chars, { opacity: 0, x: "100", ease: "Back.easeOut" });
        }
        if ($(el).hasClass("poort-in-left")) {
            gsap.set(el.split.chars, { opacity: 0, x: "-100", ease: "circ.out" });
        }
        if ($(el).hasClass("poort-in-up")) {
            gsap.set(el.split.chars, { opacity: 0, y: "80", ease: "circ.out" });
        }
        if ($(el).hasClass("poort-in-down")) {
            gsap.set(el.split.chars, { opacity: 0, y: "-80", ease: "circ.out" });
        }
        el.anim = gsap.to(el.split.chars, { scrollTrigger: { trigger: el, start: "top 90%" }, x: "0", y: "0", rotateX: "0", scale: 1, opacity: 1, duration: 0.6, stagger: 0.02 });
    });
});


 /* image top-buttom scroll js */
 var image = document.getElementsByClassName('thumbnail');
 new simpleParallax(image, {
     delay: .6,
     transition: 'cubic-bezier(0,0,0,1)'
 });

 var image = document.getElementsByClassName('thumbnail2');
 new simpleParallax(image, {
     delay: .6,
     transition: 'cubic-bezier(0,0,0,1)',
     orientation: 'down'
 });


window.addEventListener('scroll', function() {
    const items = document.querySelectorAll('.wpo-story-item');
    items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const nextItem = items[index + 1];
        const prevItem = items[index - 1];
        
        if (rect.top <= 230 && rect.bottom >= 230) {
            item.classList.add('sticky');
            if (prevItem) {
                prevItem.classList.add('fade-out');
            }
        } else {
            item.classList.remove('sticky');
            if (prevItem) {
                prevItem.classList.remove('fade-out');
            }
        }
    });
});



// Marquee
if ($(".marquee,.marquee2 ").length) {
    function Marquee(selector, speed) {
      const parentSelectors = document.querySelectorAll(selector);
      
      parentSelectors.forEach((parentSelector) => {
        const clone = parentSelector.innerHTML;
        const firstElement = parentSelector.children[0];
        let i = 0;
  
        parentSelector.insertAdjacentHTML('beforeend', clone);
        parentSelector.insertAdjacentHTML('beforeend', clone);
  
        setInterval(function () {
          firstElement.style.marginLeft = `-${i}px`;
          if (i > firstElement.clientWidth) {
            i = 0;
          }
          i = i + speed;
        }, 0);
      });
    }
  
    window.addEventListener('load', function() {
      Marquee('.marquee, .marquee2', 0.2);
    });
  }


  /* imager scroll animation */
let new_class_name_elements = document.querySelectorAll(".new_img-animet");
new_class_name_elements.forEach((new_class_name_element) => {
    let image = new_class_name_element.querySelector("img");
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: new_class_name_element,
            start: "top 50%",
        }
    });

    tl.set(new_class_name_element, { autoAlpha: 1 });
    tl.from(new_class_name_element, 1.5, {
        xPercent: -100,
        ease: Power2.out
    });
    tl.from(image, 1.5, {
        xPercent: 100,
        scale: 1.3,
        delay: -1.5,
        ease: Power2.out
    });
});

