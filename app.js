(function () {
  "use strict";

  var body = document.body;
  var view = body.dataset.view || "selector";
  var assetBase = body.dataset.assetBase || "";

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function isText(value) {
    return typeof value === "string" && value.trim() !== "";
  }

  function hasUrl(value) {
    return isText(value) && value.trim() !== "#";
  }

  function externalLink(link, url) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }

  function saveView(nextView) {
    try { localStorage.setItem("portfolio_view", nextView); } catch (error) { /* Navigation still works. */ }
  }

  function clearView() {
    try { localStorage.removeItem("portfolio_view"); } catch (error) { /* Navigation still works. */ }
  }

  function bindThemeToggle() {
    var button = document.getElementById("themeToggle");
    if (!button) return;
    button.addEventListener("click", function () {
      var isDark = document.documentElement.classList.toggle("dark-theme");
      try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch (error) { /* Theme still changes. */ }
    });
  }

  if (view === "selector") {
    bindThemeToggle();
    document.querySelectorAll("[data-view-choice]").forEach(function (link) {
      link.addEventListener("click", function () { saveView(link.dataset.viewChoice); });
    });
    return;
  }

  var app = document.getElementById("app");
  var nav = document.getElementById("nav");

  function overline(index, label) {
    var line = el("p", "overline");
    line.appendChild(el("span", "overline__idx", index));
    line.appendChild(document.createTextNode(label));
    return line;
  }

  function section(id, index, label) {
    var container = el("section", "section reveal");
    container.id = id;
    container.setAttribute("aria-labelledby", id + "-label");
    var labelNode = overline(index, label);
    labelNode.id = id + "-label";
    container.appendChild(labelNode);
    return container;
  }

  function themeButton() {
    var button = el("button", "theme-toggle");
    button.id = "themeToggle";
    button.type = "button";
    button.setAttribute("aria-label", "Toggle dark mode");
    button.innerHTML = '<svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg><svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    return button;
  }

  function renderNav(data) {
    var sections = view === "client"
      ? [["work", "Work"], ["services", "Services"], ["process", "Process"], ["contact", "Contact"]]
      : [["about", "About"], ["work", "Work"], ["projects", "Projects"], ["contact", "Contact"]];

    var brand = el("a", "nav__brand");
    brand.href = "#top";
    var logo = el("img", "nav__brand-img");
    logo.src = assetBase + "favicon.png";
    logo.alt = data.name;
    logo.width = 32;
    logo.height = 32;
    brand.appendChild(logo);
    nav.appendChild(brand);

    var links = el("nav", "nav__links");
    links.setAttribute("aria-label", "Portfolio navigation");
    sections.forEach(function (item) {
      var link = el("a", "nav__section-link", item[1]);
      link.href = "#" + item[0];
      links.appendChild(link);
    });

    var otherView = view === "client" ? "dev" : "client";
    var switchLink = el("a", "view-switch", view === "client" ? "Technical view →" : "Client view →");
    switchLink.href = "../" + otherView + "/";
    switchLink.dataset.setView = otherView;
    links.appendChild(switchLink);
    links.appendChild(themeButton());
    nav.appendChild(links);

    nav.hidden = false;
    bindThemeToggle();
    switchLink.addEventListener("click", function () { saveView(otherView); });
  }

  function copyButton(email) {
    var button = el("button", "copy");
    button.type = "button";
    button.setAttribute("aria-label", "Copy email address");
    button.appendChild(el("span", "copy__label", "Copy"));
    var done = el("span", "copy__done", "Copied");
    done.setAttribute("aria-hidden", "true");
    button.appendChild(done);
    var live = el("span", "sr-only");
    live.setAttribute("aria-live", "polite");
    button.appendChild(live);
    var timeout;

    function copied() {
      button.classList.add("is-copied");
      live.textContent = "Email copied to clipboard";
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        button.classList.remove("is-copied");
        live.textContent = "";
      }, 1800);
    }

    function fallback() {
      var textarea = el("textarea");
      textarea.value = email;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try { document.execCommand("copy"); copied(); } catch (error) { live.textContent = "Copy failed"; }
      document.body.removeChild(textarea);
    }

    button.addEventListener("click", function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(copied, fallback);
      } else {
        fallback();
      }
    });
    return button;
  }

  function actions(data, place) {
    var wrap = el("div", "actions");
    if (data.contact && isText(data.contact.email)) {
      var email = el("a", "btn btn--primary");
      email.href = "mailto:" + data.contact.email;
      if (view === "client") email.textContent = "Start a Project";
      else email.textContent = place === "footer" ? "Get in touch" : "Email me";
      wrap.appendChild(email);
      wrap.appendChild(copyButton(data.contact.email));
    }
    if (view === "dev" && isText(data.resumeUrl)) {
      var resume = el("a", "btn btn--quiet", "Résumé");
      externalLink(resume, assetBase + data.resumeUrl);
      wrap.appendChild(resume);
    }
    return wrap.children.length ? wrap : null;
  }

  function setMeta(data) {
    var client = data.client || {};
    var role = view === "client" ? (client.role || data.role) : data.role;
    var description = view === "client" ? (client.metaDescription || client.headline) : (data.tagline || data.headline);
    var title = data.name + " — " + role;
    document.title = title;

    function set(selector, value) {
      var node = document.querySelector(selector);
      if (node && isText(value)) node.setAttribute("content", value);
    }

    set('meta[name="description"]', description);
    set('meta[property="og:title"]', title);
    set('meta[property="og:description"]', description);
    set('meta[property="og:url"]', location.href);
    set('meta[name="twitter:title"]', title);
    set('meta[name="twitter:description"]', description);
  }

  function caseDetail(parent, label, value) {
    if (!isText(value)) return;
    var paragraph = el("p", "case");
    paragraph.appendChild(el("span", "case__label", label));
    paragraph.appendChild(document.createTextNode(value));
    parent.appendChild(paragraph);
  }

  function detailList(parent, label, values) {
    if (!Array.isArray(values) || !values.length) return;
    var wrap = el("div", "case");
    wrap.appendChild(el("p", "case__label", label));
    var list = el("ul", "detail-list");
    values.forEach(function (value) {
      if (isText(value)) list.appendChild(el("li", "", value));
    });
    if (list.children.length) {
      wrap.appendChild(list);
      parent.appendChild(wrap);
    }
  }

  function tags(values, className) {
    if (!Array.isArray(values) || !values.length) return null;
    var list = el("ul", className || "tags");
    values.forEach(function (value) {
      if (isText(value)) list.appendChild(el("li", className === "feature-list" ? "" : "tag", value));
    });
    return list.children.length ? list : null;
  }

  function projectShell(project) {
    var linked = hasUrl(project.url);
    var box = el(linked ? "a" : "article", "item__link");
    if (linked) externalLink(box, project.url);
    var head = el("div", "item__head");
    head.appendChild(el("h3", "item__title", project.name || ""));
    if (linked) {
      var arrow = el("span", "item__meta item__arrow", "↗");
      arrow.setAttribute("aria-hidden", "true");
      head.appendChild(arrow);
    }
    box.appendChild(head);
    return box;
  }

  function renderScreenshots(parent, project) {
    if (!Array.isArray(project.screenshots)) return;
    var valid = project.screenshots.filter(function (image) {
      return isText(typeof image === "string" ? image : image && image.src);
    });
    if (!valid.length) return;

    var gallery = el("div", "project-gallery");
    valid.forEach(function (image, index) {
      var source = typeof image === "string" ? image : image.src;
      var alt = typeof image === "string" ? project.name + " screenshot " + (index + 1) : (image.alt || project.name + " screenshot " + (index + 1));
      var picture = el("figure", "project-gallery__item");
      var img = el("img", "project-gallery__image");
      img.src = assetBase + source;
      img.alt = alt;
      img.loading = "lazy";
      img.decoding = "async";
      picture.appendChild(img);
      if (typeof image !== "string" && isText(image.caption)) {
        picture.appendChild(el("figcaption", "project-gallery__caption", image.caption));
      }
      gallery.appendChild(picture);
    });
    parent.appendChild(gallery);
  }

  function renderHero(data, clientData) {
    var hero = el("section", "hero reveal");
    hero.id = "top";
    hero.appendChild(overline("00", view === "client" ? "For Clients" : "Technical Portfolio"));
    if (isText(data.availability)) {
      var pill = el("p", "pill");
      pill.appendChild(el("span", "pill__dot"));
      pill.appendChild(document.createTextNode(data.availability));
      hero.appendChild(pill);
    }
    if (isText(data.name)) hero.appendChild(el("h1", "hero__name", data.name));
    var role = view === "client" ? clientData.role : data.role;
    var headline = view === "client" ? clientData.headline : data.headline;
    var tagline = view === "client" ? clientData.tagline : data.tagline;
    if (isText(role)) hero.appendChild(el("p", "hero__role", role));
    if (isText(headline)) hero.appendChild(el("p", "hero__headline", headline));
    if (isText(tagline)) hero.appendChild(el("p", "hero__tagline", tagline));
    var heroActions = actions(data, "hero");
    if (heroActions) hero.appendChild(heroActions);
    return hero;
  }

  function renderTechnical(data, fragment) {
    if (isText(data.about)) {
      var about = section("about", "01", "About");
      about.appendChild(el("p", "prose", data.about));
      fragment.appendChild(about);
    }

    if (Array.isArray(data.experience) && data.experience.length) {
      var work = section("work", "02", "Experience");
      var workList = el("ul", "list");
      data.experience.forEach(function (job) {
        var item = el("li", "item reveal");
        var head = el("div", "item__head");
        var title = el("h3", "item__title", job.title || "");
        if (isText(job.org)) {
          title.appendChild(document.createTextNode(" "));
          title.appendChild(el("span", "item__org", job.org));
        }
        head.appendChild(title);
        if (isText(job.period)) head.appendChild(el("span", "item__meta", job.period));
        item.appendChild(head);
        if (isText(job.detail)) item.appendChild(el("p", "item__detail", job.detail));
        workList.appendChild(item);
      });
      work.appendChild(workList);
      fragment.appendChild(work);
    }

    if (Array.isArray(data.projects) && data.projects.length) {
      var projects = section("projects", "03", "Projects");
      var projectList = el("ul", "list");
      data.projects.forEach(function (project) {
        var item = el("li", "item reveal");
        var box = projectShell(project);
        if (isText(project.role)) box.appendChild(el("p", "item__role", project.role));
        caseDetail(box, "Problem", project.problem);
        caseDetail(box, "Implementation", project.outcome);
        var technical = project.technicalDetails || {};
        caseDetail(box, "Architecture", technical.architecture);
        detailList(box, "Responsibilities", technical.responsibilities);
        detailList(box, "Engineering Notes", technical.engineeringNotes);
        var projectTags = tags(project.tags);
        if (projectTags) box.appendChild(projectTags);
        item.appendChild(box);
        projectList.appendChild(item);
      });
      projects.appendChild(projectList);
      fragment.appendChild(projects);
    }

    if (Array.isArray(data.skills) && data.skills.length) {
      var skills = section("skills", "04", "Capabilities");
      var skillList = el("ul", "skills");
      data.skills.forEach(function (skill) {
        if (isText(skill)) skillList.appendChild(el("li", "skill reveal", skill));
      });
      skills.appendChild(skillList);
      fragment.appendChild(skills);
    }
  }

  function renderClient(data, clientData, fragment) {
    var selected = Array.isArray(clientData.selectedProjects) ? clientData.selectedProjects : [];
    var projectMap = {};
    (data.projects || []).forEach(function (project) { projectMap[project.id] = project; });
    var projectsToShow = selected.map(function (id) { return projectMap[id]; }).filter(Boolean);

    if (projectsToShow.length) {
      var work = section("work", "01", "Selected Work");
      var projectList = el("ul", "list client-projects");
      projectsToShow.forEach(function (project) {
        var item = el("li", "item reveal");
        var box = projectShell(project);
        if (isText(project.clientSummary)) box.appendChild(el("p", "project-summary", project.clientSummary));
        caseDetail(box, "The problem", project.clientProblem || project.problem);
        caseDetail(box, "The solution", project.clientSolution || project.outcome);
        var features = tags(project.features, "feature-list");
        if (features) {
          var featureWrap = el("div", "case");
          featureWrap.appendChild(el("p", "case__label", "Key features"));
          featureWrap.appendChild(features);
          box.appendChild(featureWrap);
        }
        caseDetail(box, "Benefit", project.benefit);
        renderScreenshots(box, project);
        item.appendChild(box);
        projectList.appendChild(item);
      });
      work.appendChild(projectList);
      fragment.appendChild(work);
    }

    if (Array.isArray(clientData.services) && clientData.services.length) {
      var services = section("services", "02", "Services");
      var serviceList = el("ul", "services");
      clientData.services.forEach(function (service) {
        if (!service || !isText(service.name)) return;
        var item = el("li", "service reveal");
        item.appendChild(el("h3", "service__title", service.name));
        if (isText(service.description)) item.appendChild(el("p", "service__detail", service.description));
        serviceList.appendChild(item);
      });
      services.appendChild(serviceList);
      fragment.appendChild(services);
    }

    if (Array.isArray(clientData.process) && clientData.process.length) {
      var process = section("process", "03", "Process");
      var processList = el("ol", "process");
      clientData.process.forEach(function (step, index) {
        if (!step || !isText(step.title)) return;
        var item = el("li", "process__step reveal");
        item.appendChild(el("span", "process__number", String(index + 1).padStart(2, "0")));
        var copy = el("div");
        copy.appendChild(el("h3", "process__title", step.title));
        if (isText(step.description)) copy.appendChild(el("p", "process__detail", step.description));
        item.appendChild(copy);
        processList.appendChild(item);
      });
      process.appendChild(processList);
      fragment.appendChild(process);
    }

    if (Array.isArray(clientData.technologies) && clientData.technologies.length) {
      var tools = section("tools", "04", "Technology");
      if (isText(clientData.technologyIntro)) tools.appendChild(el("p", "prose prose--compact", clientData.technologyIntro));
      var toolTags = tags(clientData.technologies);
      if (toolTags) toolTags.classList.add("tags--large");
      if (toolTags) tools.appendChild(toolTags);
      fragment.appendChild(tools);
    }
  }

  function renderContact(data, index, clientData) {
    var contact = section("contact", index, "Contact");
    var body = el("div", "contact__body");
    if (view === "client") {
      body.appendChild(el("h2", "contact__heading", clientData.contactHeading || "Have a project in mind?"));
      if (isText(clientData.contactText)) body.appendChild(el("p", "prose prose--compact", clientData.contactText));
    }
    if (data.contact && isText(data.contact.email)) {
      var email = el("a", "contact__email", data.contact.email);
      email.href = "mailto:" + data.contact.email;
      body.appendChild(email);
    }
    var contactActions = actions(data, "footer");
    if (contactActions) body.appendChild(contactActions);
    if (data.contact && Array.isArray(data.contact.socials)) {
      var socials = el("ul", "socials");
      data.contact.socials.forEach(function (social) {
        if (!social || !isText(social.label) || !hasUrl(social.url)) return;
        var item = el("li");
        var link = el("a", "link", social.label);
        externalLink(link, social.url);
        item.appendChild(link);
        socials.appendChild(item);
      });
      if (socials.children.length) body.appendChild(socials);
    }
    contact.appendChild(body);
    return contact;
  }

  function renderFooter(data) {
    var oldFooter = document.querySelector(".footer");
    if (oldFooter) oldFooter.remove();
    var footer = el("footer", "footer");
    footer.appendChild(el("p", "footer__meta", "© " + new Date().getFullYear() + " " + (data.name || "")));
    if (isText(data.lastUpdated)) footer.appendChild(el("p", "footer__meta footer__updated", "Last updated: " + data.lastUpdated));
    var choose = el("a", "footer__switch", "Choose another view");
    choose.href = "../";
    choose.addEventListener("click", clearView);
    footer.appendChild(choose);
    document.getElementById("main").insertAdjacentElement("afterend", footer);
  }

  function render(data) {
    var clientData = data.client || {};
    setMeta(data);
    renderNav(data);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderHero(data, clientData));
    if (view === "client") renderClient(data, clientData, fragment);
    else renderTechnical(data, fragment);
    fragment.appendChild(renderContact(data, "05", clientData));
    app.replaceChildren(fragment);
    renderFooter(data);
    enhance();
  }

  function enhance() {
    var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    var hero = document.getElementById("top");
    if (hero) {
      requestAnimationFrame(function () { hero.classList.add("in"); });
    }
    document.querySelectorAll(".list, .skills, .services, .process").forEach(function (group) {
      Array.prototype.slice.call(group.children).forEach(function (child, index) {
        child.style.setProperty("--i", Math.min(index, 8));
      });
    });

    var links = {};
    document.querySelectorAll(".nav__section-link").forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      links[id] = link;
      var target = document.getElementById(id);
      if (target) target.dataset.nav = "1";
    });

    var toTop = document.getElementById("toTop");
    if (toTop) {
      toTop.addEventListener("click", function () {
        var smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
        var brand = document.querySelector(".nav__brand");
        if (brand) brand.focus();
      });
    }

    if (!("IntersectionObserver" in window)) {
      reveals.forEach(function (node) { node.classList.add("in"); });
      if (toTop) toTop.classList.add("show");
      return;
    }

    var ratios = {};
    function updateNav() {
      var best = null;
      var bestRatio = 0;
      Object.keys(ratios).forEach(function (id) {
        if (ratios[id] > bestRatio) {
          bestRatio = ratios[id];
          best = id;
        }
      });
      Object.keys(links).forEach(function (id) {
        var active = id === best;
        links[id].classList.toggle("is-active", active);
        if (active) links[id].setAttribute("aria-current", "true");
        else links[id].removeAttribute("aria-current");
      });
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.boundingClientRect.top < window.innerHeight * 0.92) {
          entry.target.classList.add("in");
          if (!entry.target.dataset.nav && entry.target.id !== "top") observer.unobserve(entry.target);
        }
        if (entry.target.dataset.nav) ratios[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        if (entry.target.id === "top" && toTop) toTop.classList.toggle("show", !entry.isIntersecting);
      });
      updateNav();
    }, { threshold: [0, 0.15, 0.35, 0.6, 1], rootMargin: "0px 0px -8% 0px" });

    reveals.forEach(function (node) { observer.observe(node); });
  }

  function fail(error) {
    if (window.console && console.error) console.error("Portfolio render failed:", error);
    app.replaceChildren();
    var message = el("section", "section load-error");
    message.appendChild(el("p", "prose", "Couldn't load the portfolio content. Serve this folder with a static web server and try again."));
    app.appendChild(message);
  }

  fetch(assetBase + "data.json", { cache: "no-cache" })
    .then(function (response) {
      if (!response.ok) throw new Error(String(response.status));
      return response.json();
    })
    .then(render)
    .catch(fail);
})();
