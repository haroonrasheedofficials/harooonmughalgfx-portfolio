(function(){
  "use strict";

  var grid = document.getElementById("servicesGrid");
  var overviewList = document.getElementById("overviewList");
  if (!grid || typeof SERVICES === "undefined") return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Render service cards ---------- */
  function featuresHTML(features){
    return features.map(function(f){ return "<li>" + f + "</li>"; }).join("");
  }

  function cardHTML(service, index){
    return (
      '<article class="service-page-card" style="--stagger:' + index + '">' +
        '<div class="service-page-top">' +
          '<span class="service-page-num">' + service.num + '</span>' +
          '<svg class="service-page-icon" viewBox="0 0 40 40" aria-hidden="true">' + service.icon + '</svg>' +
        '</div>' +
        '<h3>' + service.title + '</h3>' +
        '<p class="service-page-desc">' + service.description + '</p>' +
        '<button type="button" class="service-toggle" data-toggle="' + service.id + '" aria-expanded="false">' +
          '<span>View Details</span>' +
          '<span class="service-toggle-icon" aria-hidden="true">+</span>' +
        '</button>' +
        '<div class="service-details" id="details-' + service.id + '" hidden>' +
          '<ul class="service-features">' + featuresHTML(service.features) + '</ul>' +
          '<p class="service-price">' + service.price + '</p>' +
        '</div>' +
        '<a href="contact.html?service=' + encodeURIComponent(service.id) + '" class="btn btn-outline service-cta">Discuss This Service</a>' +
      '</article>'
    );
  }

  grid.innerHTML = SERVICES.map(cardHTML).join("");

  /* ---------- Expand / collapse details ---------- */
  grid.addEventListener("click", function(e){
    var btn = e.target.closest(".service-toggle");
    if (!btn) return;
    var id = btn.getAttribute("data-toggle");
    var panel = document.getElementById("details-" + id);
    if (!panel) return;
    var isOpen = !panel.hidden;

    if (isOpen){
      panel.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      btn.querySelector("span:first-child").textContent = "View Details";
    } else {
      panel.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      btn.querySelector("span:first-child").textContent = "Hide Details";
    }
  });

  /* ---------- Stagger reveal for cards ---------- */
  var cards = grid.querySelectorAll(".service-page-card");
  if (reduceMotion || !("IntersectionObserver" in window)){
    cards.forEach(function(c){ c.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          var el = entry.target;
          var delay = parseInt(el.style.getPropertyValue("--stagger"), 10) || 0;
          window.setTimeout(function(){ el.classList.add("is-visible"); }, delay * 80);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15 });
    cards.forEach(function(c){ io.observe(c); });
  }

  /* ---------- Overview list ---------- */
  if (overviewList){
    overviewList.innerHTML = SERVICES.map(function(s){
      return (
        '<div class="overview-row">' +
          '<span class="overview-service">' + s.title + '</span>' +
          '<span class="overview-arrow" aria-hidden="true">&rarr;</span>' +
          '<span class="overview-best">' + s.bestFor + '</span>' +
        '</div>'
      );
    }).join("");
  }

})();
