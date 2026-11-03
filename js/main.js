// Punto de entrada del JavaScript del sitio.
document.addEventListener("DOMContentLoaded", () => {
  const SITE = window.SITE || {};

  // Año del footer
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  initHeader();
  initMenu();
  initReveal();
  initWhatsApp(SITE);
  initContactDetails(SITE);
  initContactForm(SITE);
  initMap(SITE);
});

// Borde inferior de la cabecera al hacer scroll
function initHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

// Menú hamburguesa desplegable
function initMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".label").textContent = open ? "Cerrar" : "Menú";
  };

  toggle.addEventListener("click", () => setOpen(!document.body.classList.contains("menu-open")));
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

// Aparición suave de los bloques al entrar en pantalla
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -10% 0px" });
  items.forEach((el) => io.observe(el));
}

// Botón flotante de WhatsApp: sin número configurado lleva al formulario
function initWhatsApp(SITE) {
  const btn = document.querySelector(".whatsapp");
  if (!btn) return;
  if (SITE.whatsapp) {
    const text = encodeURIComponent("Hola, me gustaría recibir información sobre vuestros productos cerámicos.");
    btn.href = `https://wa.me/${SITE.whatsapp}?text=${text}`;
    btn.target = "_blank";
    btn.rel = "noopener";
  }
}

// Datos de contacto visibles en la sección de contacto
function initContactDetails(SITE) {
  const fill = (key, value, href) => {
    document.querySelectorAll(`[data-contact="${key}"]`).forEach((el) => {
      const row = el.closest("[data-contact-row]");
      if (!value) {
        if (row) row.hidden = true;
        return;
      }
      el.textContent = value;
      if (href && el.tagName === "A") el.href = href;
    });
  };
  fill("email", SITE.email, `mailto:${SITE.email}`);
  fill("phone", SITE.phone, `tel:${(SITE.phone || "").replace(/\s/g, "")}`);
  fill("address", SITE.address);
}

// Formulario de contacto
function initContactForm(SITE) {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = form.querySelector(".form-status");

  // Rellena la consulta si se llega desde la página de productos
  const params = new URLSearchParams(window.location.search);
  const producto = params.get("producto");
  const consulta = params.get("consulta");
  if (producto) {
    form.elements.mensaje.value = `Me interesa recibir el catálogo y más información sobre: ${producto}.`;
  }
  if (consulta) {
    const radio = form.querySelector(`input[name="tipo"][value="${consulta}"]`);
    if (radio) radio.checked = true;
  }

  const setError = (field, message) => {
    const wrap = field.closest(".field") || field.closest(".check");
    if (!wrap) return;
    wrap.classList.toggle("is-invalid", Boolean(message));
    const error = wrap.querySelector(".error");
    if (error) error.textContent = message || "";
  };

  const validate = () => {
    let firstInvalid = null;
    form.querySelectorAll("[required]").forEach((field) => {
      let message = "";
      if (field.type === "checkbox" && !field.checked) {
        message = "Debes aceptar la política de privacidad.";
      } else if (field.type === "radio") {
        if (!form.querySelector(`input[name="${field.name}"]:checked`)) message = "Selecciona un tipo de consulta.";
      } else if (!field.value.trim()) {
        message = "Este campo es obligatorio.";
      } else if (field.type === "email" && !field.validity.valid) {
        message = "Introduce un correo electrónico válido.";
      }
      setError(field, message);
      if (message && !firstInvalid) firstInvalid = field;
    });
    return firstInvalid;
  };

  form.addEventListener("input", (e) => {
    if (e.target.closest(".is-invalid")) setError(e.target, "");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const invalid = validate();
    if (invalid) {
      invalid.focus();
      return;
    }

    const data = new FormData(form);
    const lines = [
      `Nombre: ${data.get("nombre")} ${data.get("apellidos")}`,
      `Empresa: ${data.get("empresa")}`,
      `País: ${data.get("pais")}`,
      `Correo: ${data.get("email")}`,
      `Teléfono: ${data.get("telefono") || "-"}`,
      `Tipo de consulta: ${data.get("tipo")}`,
      "",
      data.get("mensaje")
    ];

    status.hidden = false;
    if (SITE.email) {
      const subject = encodeURIComponent(`Consulta web (${data.get("tipo")}) - ${data.get("empresa")}`);
      const body = encodeURIComponent(lines.join("\n"));
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      status.textContent = "Se ha abierto tu programa de correo con la solicitud preparada. Envíalo para completar la consulta.";
    } else {
      status.textContent = "Gracias. El envío del formulario está en configuración: muy pronto podrás enviarnos tu solicitud desde aquí.";
    }
  });
}

// Mapa mundial de mercados (d3 + topojson, cargados en la portada)
async function initMap(SITE) {
  const svg = document.getElementById("world-map");
  if (!svg || !window.d3 || !window.topojson) return;

  const markets = SITE.markets || {};
  const hq = markets.headquarters;
  const origins = new Set((markets.origins || []).map((m) => m.iso));
  const destinations = new Set((markets.destinations || []).map((m) => m.iso));

  renderMarketLists(markets);

  try {
    const world = await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json");
    const countries = topojson.feature(world, world.objects.countries).features
      .filter((f) => f.id !== "010"); // sin la Antártida

    const width = 960;
    const height = 500;
    const projection = d3.geoNaturalEarth1().fitSize([width, height], { type: "FeatureCollection", features: countries });
    const path = d3.geoPath(projection);
    const map = d3.select(svg).attr("viewBox", `0 0 ${width} ${height}`);

    map.append("g").selectAll("path")
      .data(countries)
      .join("path")
      .attr("d", path)
      .attr("class", (d) => {
        if (hq && d.id === hq.iso) return "land is-hq";
        if (origins.has(d.id)) return "land is-origin";
        if (destinations.has(d.id)) return "land is-destination";
        return "land";
      })
      .append("title")
      .text((d) => d.properties.name);

    const hqFeature = hq && countries.find((f) => f.id === hq.iso);
    if (hqFeature) {
      const [x, y] = path.centroid(hqFeature);
      map.append("circle").attr("class", "marker-ring").attr("cx", x).attr("cy", y).attr("r", 12);
      map.append("circle").attr("class", "marker").attr("cx", x).attr("cy", y).attr("r", 4);
    }
  } catch (err) {
    svg.outerHTML = '<p class="map-fallback">No se ha podido cargar el mapa.</p>';
  }
}

function renderMarketLists(markets) {
  const fillList = (id, items) => {
    const list = document.getElementById(id);
    if (!list) return;
    if (!items || !items.length) {
      list.innerHTML = '<li class="is-pending">Pendiente de confirmar</li>';
      return;
    }
    list.innerHTML = items.map((m) => `<li>${m.name}</li>`).join("");
  };
  fillList("markets-origins", markets.origins);
  fillList("markets-destinations", markets.destinations);
}
