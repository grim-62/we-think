function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco();

const container = document.querySelector("#container");
const imageUrls = [
  "https://wethinkelastic.com/assets/images/24a07612b16472c6a503f.svg",
  "https://wethinkelastic.com/assets/images/338b04b3ad8edf6773599.svg",
  "https://wethinkelastic.com/assets/images/4e7e9b9fc472434d65a23.svg",
  "https://wethinkelastic.com/assets/images/556ce542d7fdbd78d032e.svg",
  "https://wethinkelastic.com/assets/images/6a714ad31db5d83bc967b.svg",
  "https://wethinkelastic.com/assets/images/7c9e22462b51ae93b5a17.svg",
  "https://wethinkelastic.com/assets/images/8a2db0cd90582eb4b877d.svg",
  "https://wethinkelastic.com/assets/images/9e5b57420355774e0a99d.svg",
  "https://wethinkelastic.com/assets/images/109804494fa1878703f2c1.svg"
];

let anim = 200;

function setImage(url,delay) {
    setTimeout(() => {
        container.innerHTML = `<img src="${url}" alt="">`
    }, delay);
}
imageUrls.forEach(element => {
    setImage(element,anim)
    anim = anim + 200
});

var tl = gsap.timeline()
tl.to("#loader",{
  delay:2.5,
  y:"-100%",
})

gsap.from("#pg1",{
  y:"100%",
  delay:1,
  duration:1
})

gsap.from("#pg1 #nav",{
  delay:2,
  opacity:0,
  y:"-100%",
  duration:1
})

gsap.from("#pg1-main h1",{
  y:200,
  stagger:.1,
  delay:1.5
  
})
gsap.from("#pg1-end",{
  y:200,
  duration:1,
  delay:2
})

gsap.to("#pg2 video",{
  width:"100%",
  scrollTrigger:{
    trigger:"#pg2 video",
    scroller:"#main",
    // markers:true,
    start:"top 105%",
    end:"top -5%",
    scrub:1
  }
})

gsap.to("#gol",{
  rotate:"360deg",
  duration:10,
  yoyo:1
})

gsap.from("#txt-container p",{
  y:"100%",
  scrollTrigger:{
    trigger:"#txt-container p",
    scroller:"#main",
    // markers:true,
    start:"top 50%",
    end:"top -5%"
  }
})
gsap.from("#txt-container h6",{
  y:"100%",
  scrollTrigger:{
    trigger:"#txt-container p",
    scroller:"#main",
    // markers:true,
    start:"top 50%",
    end:"top -5%"
  }
})

tl.to("#pg5-main ",{
  x:"-60%",
  scrollTrigger:{
    trigger:"#pg5",
    scroller:"#main",
    // markers:true,
    start:"top 0%",
    end:"top -50%",
    scrub:1,
    pin:true
  }
})

