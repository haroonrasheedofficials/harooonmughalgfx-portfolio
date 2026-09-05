(function(){
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Timeline reveal ---------- */
  var timelineItems = document.querySelectorAll(".timeline-item");
  if (timelineItems.length){
    if (reduceMotion || !("IntersectionObserver" in window)){
      timelineItems.forEach(function(item){ item.classList.add("is-visible"); });
    } else {
      var tlIo = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting){
            entry.target.classList.add("is-visible");
            tlIo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      timelineItems.forEach(function(item){ tlIo.observe(item); });
    }
  }

  /* ---------- Skill meters ---------- */
  var skillRows = document.querySelectorAll(".skill-row");
  function fillSkill(row){
    var level = row.getAttribute("data-level") || "0";
    var fill = row.querySelector(".skill-fill");
    if (!fill) return;
    if (reduceMotion){
      fill.style.width = level + "%";
      return;
    }
    requestAnimationFrame(function(){
      fill.style.width = level + "%";
    });
  }
  if (skillRows.length){
    if (!("IntersectionObserver" in window)){
      skillRows.forEach(fillSkill);
    } else {
      var skillIo = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting){
            fillSkill(entry.target);
            skillIo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.35 });
      skillRows.forEach(function(row){ skillIo.observe(row); });
    }
  }

})();
