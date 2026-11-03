// Datos de la empresa. Rellena estos valores cuando estén confirmados:
// la web los usa en el botón de WhatsApp, el formulario y el mapa.
window.SITE = {
  name: "Terrenalis",

  // Número de WhatsApp en formato internacional, sin "+" ni espacios. Ej.: "34600000000"
  whatsapp: "",

  // Correo que recibe las solicitudes del formulario
  email: "",

  phone: "",
  address: "",

  // Mercados internacionales. Usa el código ISO 3166 numérico de cada país
  // (España = "724"); la lista completa está en https://es.wikipedia.org/wiki/ISO_3166-1
  // No añadas países hasta que estén confirmados.
  markets: {
    headquarters: { name: "España", iso: "724" },
    // Países de origen de los proveedores. Ej.: { name: "Italia", iso: "380" }
    origins: [],
    // Destinos comerciales. Ej.: { name: "Francia", iso: "250" }
    destinations: []
  }
};
