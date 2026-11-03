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

// Enlaces de WhatsApp. Sin número configurado, el botón flotante lleva
// al formulario y el enlace de la sección de contacto queda oculto.
function initWhatsApp(SITE) {
  if (!SITE.whatsapp) return;
  const text = encodeURIComponent("Hola, me gustaría recibir información sobre vuestros productos cerámicos.");
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.href = `https://wa.me/${SITE.whatsapp}?text=${text}`;
    link.target = "_blank";
    link.rel = "noopener";
    link.hidden = false;
  });
}

// Datos de contacto de la sección de contacto y del footer
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

  const setError = (field, message) => {
    const wrap = field.closest(".field") || field.closest(".full");
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
      `Nombre: ${data.get("nombre")}`,
      `Empresa: ${data.get("empresa")}`,
      `Correo: ${data.get("email")}`,
      `Teléfono: ${data.get("telefono") || "-"}`,
      "",
      data.get("mensaje")
    ];

    status.hidden = false;
    if (SITE.email) {
      const subject = encodeURIComponent(`Consulta web - ${data.get("empresa")}`);
      const body = encodeURIComponent(lines.join("\n"));
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      status.textContent = "Se ha abierto tu programa de correo con el mensaje preparado. Envíalo para completar la consulta.";
    } else {
      status.textContent = "Gracias. El envío del formulario está en configuración: muy pronto podrás enviarnos tu mensaje desde aquí.";
    }
  });
}
