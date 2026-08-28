/**
 * Formats international phone numbers for WhatsApp API.
 * e.g., "p:+2348135974712" -> "2348135974712"
 */
export const formatPhoneForWhatsApp = (phoneStr) => {
  if (!phoneStr) return '';
  let cleaned = String(phoneStr).replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+')) {
    cleaned = cleaned.substring(1);
  }
  return cleaned;
};

/**
 * Creates a direct WhatsApp conversation URL for a client lead.
 */
export const getClientWhatsAppUrl = (phoneStr, clientName, agentName = 'Real Estate Agent') => {
  const formattedPhone = formatPhoneForWhatsApp(phoneStr);
  if (!formattedPhone) return '#';
  const text = encodeURIComponent(`Hola ${clientName}, soy tu asesor inmobiliario en Dubái. Me contacto para darte seguimiento sobre las propiedades de inversión y residency.`);
  return `https://wa.me/${formattedPhone}?text=${text}`;
};

/**
 * Creates a direct WhatsApp unit booking URL for agent's personal sales phone +971504497663.
 */
export const getUnitBookingWhatsAppUrl = (unit, project, currency, convertedPrice) => {
  const agentPhone = "971504497663"; // +971504497663 as explicitly requested
  const message = `Hola! Estoy interesado en comprar la unidad de lujo ${unit.type} (${unit.featuredUnit}) en el proyecto ${project.name} (${project.tower}) de ${project.developer}.\n\n` +
                  `📍 Ubicación: ${project.locationName}\n` +
                  `📐 Área: ${unit.sampleArea} sqft\n` +
                  `💰 Precio: ${currency.symbol}${convertedPrice}\n` +
                  `📅 Fecha estimada de entrega: ${project.completionDate}\n\n` +
                  `Por favor envíame el formulario de reserva EOI y la disponibilidad en tiempo real.`;
                  
  return `https://wa.me/${agentPhone}?text=${encodeURIComponent(message)}`;
};
