function resetWebflow(data) {
  let parser = new DOMParser();
  let dom = parser.parseFromString(data.next.html, "text/html");
  let webflowPageId = $(dom).find("html").attr("data-wf-page");
  $("html").attr("data-wf-page", webflowPageId);
  window.Webflow && window.Webflow.destroy();
  window.Webflow && window.Webflow.ready();
  window.Webflow && window.Webflow.require("ix2").init();
}

//NAV CODE
let bodyScrollDirection;
ScrollTrigger.create({
  trigger: "body",
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    if (bodyScrollDirection !== self.direction) {
      bodyScrollDirection = self.direction;
      if (self.direction === 1) {
        // scrolling down
        console.log("direction changed: scroll down");
        $(".navbar_component").addClass("hide-nav");
      } else {
        // scrolling up
        console.log("direction changed: scroll up");
        $(".navbar_component").removeClass("hide-nav");
      }
    }
  }
});

//nav link hover

$(".nav_link--tt2").on("mouseenter", function () {
  gsap.fromTo($(this).find(".nav_link_line"), { 
    x: "-110%"
  }, {
    x: "0%",
    duration: 0.4
  });
});

$(".nav_link--tt2").on("mouseleave", function () {
  gsap.to($(this).find(".nav_link_line"), {
    x: "110%",
    duration: 0.4
  });
});

//change menu color on scroll

// For light sections
$(".section.is-light").each(function (index) {
  ScrollTrigger.create({
    trigger: $(this),
    start: "30px bottom",
    end: "+=100",
    markers: false,
    onEnter: () => {
      $(".nav_wrap,.nav_wrap_bottom").addClass("nav_light");
    },
    onEnterBack: () => {
      $(".nav_wrap,.nav_wrap_bottom").addClass("nav_light");
    },
    onLeave: () => {
      $(".nav_wrap,.nav_wrap_bottom").removeClass("nav_light");
    },
    onLeaveBack: () => {
      $(".nav_wrap,.nav_wrap_bottom").removeClass("nav_light");
    }
  });
});

// For dark sections
$(".section_full.is-dark").each(function (index) {
  ScrollTrigger.create({
    trigger: $(this),
    start: "30px top",
    end: "+=100",
    markers: false,
    onEnter: () => {
      $(".nav_wrap").addClass("nav_transition--sm0.1-bg0");
    },
    onEnterBack: () => {
      $(".nav_wrap").addClass("nav_transition--sm0.1-bg0");
    },
    onLeave: () => {
      $(".nav_wrap").removeClass("nav_transition--sm0.1-bg0");
    },
    onLeaveBack: () => {
      $(".nav_wrap").removeClass("nav_transition--sm0.1-bg0");
    }
  });
});


$(".section.is-light").each(function (index) {
  ScrollTrigger.create({
    trigger: $(this),
    start: "30px bottom",
    end: "+=100",
    markers: false,
    onEnter: () => {
      $(".nav_wrap,.nav_wrap_bottom").addClass("nav_transition--sm0.1-bg0");
      $(".nav_wrap_bottom").removeClass("nav_transform--bg0");
    },
    onEnterBack: () => {
      $(".nav_wrap,.nav_wrap_bottom").addClass(".nav_transition--sm0.1-bg0");
      $(".nav_wrap_bottom").removeClass("nav_transform--bg0");
    }
  });
});

$(".section_full.is-dark").each(function (index) {
  ScrollTrigger.create({
    trigger: $(this),
    start: "30px top",
    end: "+=100",
    markers: false,
    onEnter: () => {
      $(".nav_wrap,.nav_wrap_bottom").removeClass("nav_transition--sm0.1-bg0");
      $(".nav_wrap_bottom").addClass("nav_transform--bg0");
    },
    onEnterBack: () => {
      $(".nav_wrap,.nav_wrap_bottom").removeClass("nav_transition--sm0.1-bg0");
      $(".nav_wrap_bottom").addClass("nav_transform--bg0");
    }
  });
});

// Utility function to check if the element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

window.onload = function() {

  // Initially set the opacity of all images to 0
  gsap.set(".fade-in-stagger", { opacity: 0 });

  // Your existing scroll event function
  function handleScroll() {
    const images = gsap.utils.toArray('.fade-in-stagger');
    images.forEach((img, index) => {
      if (isInViewport(img)) {
        gsap.to(img, {
          opacity: 1,
          delay: index * 0.1, // Stagger delay of 0.1 seconds
          duration: 3,        // Fade-in duration
          ease: "power3.easeIn"
        });
      }
    });
  }

  // Assuming you have an 'isInViewport' function
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Attach the handleScroll function to the scroll event
  window.addEventListener('scroll', handleScroll);

  // Invoke the handleScroll function immediately to catch images in viewport upon loading
  handleScroll();

};

//Text animations
window.addEventListener("DOMContentLoaded", (event) => {
  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span"
  });

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      }
    });
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 60%",
      onEnter: () => timeline.play()
    });
  }

  $("[words-slide-from-right]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), { opacity: 0, x: "1em", duration: 1, ease: "power2.out", stagger: { amount: 0.2 } });
    createScrollTrigger($(this), tl);
  });

  $("[letters-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { yPercent: 100, duration: 0.2, ease: "power1.out", stagger: { amount: 0.6 } });
    createScrollTrigger($(this), tl);
  });

  $("[letters-slide-down]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { yPercent: -120, duration: 0.3, ease: "power1.out", stagger: { amount: 0.7 } });
    createScrollTrigger($(this), tl);
  });

  $("[letters-fade-in]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { opacity: 0, duration: 0.2, ease: "power1.out", stagger: { amount: 0.8 } });
    createScrollTrigger($(this), tl);
  });

  // Avoid flash of unstyled content
  gsap.set("[text-split]", { opacity: 1 });
});
