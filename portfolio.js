(function(){
  "use strict";

  var grid = document.getElementById("portfolioGrid");
  if (!grid || typeof PORTFOLIO_PROJECTS === "undefined") return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var currentFilter = "all";
  var visibleList = [];
  var lightboxIndex = 0;

  /* ---------- Render cards ---------- */
function cardHTML(project){
  var thumbHTML = project.image
    ? '<img class="portfolio-thumb" src="' + project.image + '" alt="' + project.title + '">'
    : '<span class="portfolio-thumb" style="background:' + project.gradient + '" role="img" aria-label="' + project.title + ' thumbnail"></span>';

  return (
    '<button type="button" class="portfolio-card ratio-' + project.ratio + '" ' +
    'data-id="' + project.id + '" data-category="' + project.category + '" ' +
    'aria-label="Open project: ' + project.title + '">' +
      thumbHTML +
      '<span class="portfolio-overlay">' +
        '<span class="portfolio-cat">' + project.categoryLabel + '</span>' +
        '<span class="portfolio-title">' + project.title + '</span>' +
        '<span class="portfolio-desc">' + project.shortDesc + '</span>' +
      '</span>' +
    '</button>'
  );
}
  function renderGrid(){
    grid.innerHTML = PORTFOLIO_PROJECTS.map(cardHTML).join("");
    applyFilter(currentFilter, true);
    attachCardEvents();
  }

  /* ---------- Filtering ---------- */
  function applyFilter(filter, skipAnim){
    currentFilter = filter;
    var cards = grid.querySelectorAll(".portfolio-card");

    cards.forEach(function(card){
      var match = filter === "all" || card.getAttribute("data-category") === filter;

      if (reduceMotion || skipAnim){
        card.style.display = match ? "" : "none";
        card.classList.toggle("is-filtered-out", !match);
        return;
      }

      if (match){
        card.style.display = "";
        requestAnimationFrame(function(){
          card.classList.remove("is-filtered-out");
        });
      } else {
        card.classList.add("is-filtered-out");
        window.setTimeout(function(){
          if (card.classList.contains("is-filtered-out")) card.style.display = "none";
        }, 280);
      }
    });

    updateVisibleList();
  }

  function updateVisibleList(){
    visibleList = PORTFOLIO_PROJECTS.filter(function(p){
      return currentFilter === "all" || p.category === currentFilter;
    });
  }

  var filterBar = document.getElementById("filterBar");
  if (filterBar){
    filterBar.addEventListener("click", function(e){
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filterBar.querySelectorAll(".filter-btn").forEach(function(b){
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      applyFilter(btn.getAttribute("data-filter"));
    });
  }

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lbMedia = document.getElementById("lightboxMedia");
  var lbCat = document.getElementById("lightboxCat");
  var lbTitle = document.getElementById("lightboxTitle");
  var lbDesc = document.getElementById("lightboxDesc");
  var lbPrev = document.getElementById("lightboxPrev");
  var lbNext = document.getElementById("lightboxNext");
  var lastFocused = null;

  function findProjectById(id){
    for (var i = 0; i < PORTFOLIO_PROJECTS.length; i++){
      if (PORTFOLIO_PROJECTS[i].id === id) return PORTFOLIO_PROJECTS[i];
    }
    return null;
  }

  function openLightbox(id){
    updateVisibleList();
    var idx = visibleList.findIndex(function(p){ return p.id === id; });
    if (idx === -1) idx = 0;
    lightboxIndex = idx;
    renderLightbox();
    lastFocused = document.activeElement;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function(){ lightbox.classList.add("is-open"); });
    lightbox.querySelector(".lightbox-close").focus();
  }

 function renderLightbox(){
  if (!visibleList.length) return;
  var project = visibleList[lightboxIndex];
  if (project.image){
    lbMedia.style.background = "";
    lbMedia.innerHTML = '<img src="' + project.image + '" alt="' + project.title + '" style="width:100%;height:100%;object-fit:cover;">';
  } else {
    lbMedia.innerHTML = "";
    lbMedia.style.background = project.gradient;
  }
  lbCat.textContent = project.categoryLabel;
  lbTitle.textContent = project.title;
  lbDesc.textContent = project.fullDesc;
}

  function closeLightbox(){
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    window.setTimeout(function(){ lightbox.hidden = true; }, 220);
    if (lastFocused) lastFocused.focus();
  }

  function stepLightbox(dir){
    if (!visibleList.length) return;
    lightboxIndex = (lightboxIndex + dir + visibleList.length) % visibleList.length;
    renderLightbox();
  }

  function attachCardEvents(){
    grid.querySelectorAll(".portfolio-card").forEach(function(card){
      card.addEventListener("click", function(){
        openLightbox(card.getAttribute("data-id"));
      });
    });
  }

  lightbox.querySelectorAll("[data-lightbox-close]").forEach(function(el){
    el.addEventListener("click", closeLightbox);
  });
  lbPrev.addEventListener("click", function(){ stepLightbox(-1); });
  lbNext.addEventListener("click", function(){ stepLightbox(1); });

  document.addEventListener("keydown", function(e){
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });

  /* ---------- Scroll reveal for cards (staggered) ---------- */
  function initCardReveal(){
    var cards = grid.querySelectorAll(".portfolio-card");
    if (reduceMotion || !("IntersectionObserver" in window)){
      cards.forEach(function(c){ c.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry, i){
        if (entry.isIntersecting){
          window.setTimeout(function(){
            entry.target.classList.add("is-visible");
          }, (i % 6) * 70);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    cards.forEach(function(c){ io.observe(c); });
  }

  renderGrid();
  initCardReveal();

})();
