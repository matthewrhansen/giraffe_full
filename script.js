//nav link hover

$(".nav_link--tt2").on("mouseenter", function () {
  gsap.fromTo($(this).find(".nav_link_line"), { 
    x: "-110%"
  }, {
    x: "0%",
    duration: 0.5
  });
});

$(".nav_link--tt2").on("mouseleave", function () {
  gsap.to($(this).find(".nav_link_line"), {
    x: "110%",
    duration: 0.5
  });
});

//change menu color on scroll

$(".section.is-light").each(function (index) {
  ScrollTrigger.create({
    trigger: $(this),
    start: "30px bottom",
    end: "+=100",
    markers: true,
    onEnter: () => {
      $(".nav_wrap").addClass("sm0.1");
      $(".nav_wrap").removeClass("nav_transform");
    },
    onEnterBack: () => {
      $(".nav_wrap").addClass("sm0.1");
      $(".nav_wrap").removeClass("nav_transform");
    }
  });
});

$(".section_full.is-dark").each(function (index) {
  ScrollTrigger.create({
    trigger: $(this),
    start: "30px top",
    end: "+=100",
    markers: true,
    onEnter: () => {
      $(".nav_wrap").removeClass("sm0.1");
      $(".nav_wrap").addClass("nav_transform");
    },
    onEnterBack: () => {
      $(".nav_wrap").removeClass("sm0.1");
      $(".nav_wrap").addClass("nav_transform");
    }
  });
});
</script>

<script>
barba.init({
  transitions: [{
    name: 'opacity-transition',
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0,
        duration: 2
      });
      $(data.next.container).addClass("fixed");
      return gsap.from(data.next.container, {
        opacity: 0,
        duration: 2,
        onComplete: () => {
        	$(window).scrollTop(0);
        	$(data.next.container).removeClass("fixed");
        }
      });
    }
  }
 ]
});