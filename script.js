(function(){
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav){
    navToggle.addEventListener("click", function(){
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    mainNav.querySelectorAll("a").forEach(function(link){
      link.addEventListener("click", function(){
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("is-visible"); });
  }

  /* ---------- Animated stat counters ---------- */
  var statEls = document.querySelectorAll(".stat-num");
  function animateCount(el){
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimal") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion){
      el.textContent = target.toFixed(decimals) + suffix;
      return;
    }
    var duration = 1400;
    var start = null;
    function step(ts){
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window){
    var statIo = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          animateCount(entry.target);
          statIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statEls.forEach(function(el){ statIo.observe(el); });
  } else {
    statEls.forEach(animateCount);
  }

  /* ---------- Testimonial slider ---------- */
  var track = document.getElementById("testimonialTrack");
  var dotsWrap = document.getElementById("testimonialDots");
  if (track && dotsWrap){
    var slides = track.children;
    var count = slides.length;
    var index = 0;
    var timer = null;

    for (var i = 0; i < count; i++){
      var dot = document.createElement("button");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Show testimonial " + (i + 1));
      if (i === 0) dot.classList.add("is-active");
      (function(idx){
        dot.addEventListener("click", function(){ goTo(idx); restart(); });
      })(i);
      dotsWrap.appendChild(dot);
    }

    function goTo(i){
      index = (i + count) % count;
      track.style.transform = "translateX(-" + (index * 100) + "%)";
      Array.prototype.forEach.call(dotsWrap.children, function(d, di){
        d.classList.toggle("is-active", di === index);
      });
    }

    function next(){ goTo(index + 1); }

    function start(){
      if (reduceMotion) return;
      timer = setInterval(next, 6000);
    }
    function restart(){
      if (timer) clearInterval(timer);
      start();
    }

    var sliderWrap = document.getElementById("testimonialSlider");
    sliderWrap.addEventListener("mouseenter", function(){ if (timer) clearInterval(timer); });
    sliderWrap.addEventListener("mouseleave", start);

    start();
  }

  /* ---------- Header shrink shadow on scroll (subtle) ---------- */
  var header = document.getElementById("siteHeader");
  if (header){
    var lastState = false;
    window.addEventListener("scroll", function(){
      var scrolled = window.scrollY > 8;
      if (scrolled !== lastState){
        header.style.boxShadow = scrolled ? "0 12px 30px -20px rgba(0,0,0,0.6)" : "none";
        lastState = scrolled;
      }
    }, { passive: true });
  }

})();
