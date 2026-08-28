import jsPDF from 'jspdf';

/**
 * Generates a luxury PDF Offer Breakdown sheet for a specific unit
 */
export const generateUnitPDFOffer = (unit, project, currency, convertedPrice) => {
  const doc = new jsPDF();

  const brandBlue = '#0284C7';
  const textDark = '#0F172A';
  const bgSoft = '#F8FAFC';

  // Header Banner
  doc.setFillColor(2, 132, 199); // #0284C7
  doc.rect(0, 0, 210, 32, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text(`${project.developer.toUpperCase()}`, 14, 18);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`OFFICIAL PROPERTY PRESENTATION & PAYMENT PLAN`, 14, 25);

  doc.setFontSize(10);
  doc.text(`Agent Hotline: +971 50 449 7663`, 145, 25);

  // Project Info Card
  doc.setFillColor(248, 250, 252);
  doc.rect(14, 40, 182, 38, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(14, 40, 182, 38, 'S');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`${project.name} - ${project.tower}`, 20, 50);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(`Location: ${project.locationName}`, 20, 58);
  doc.text(`Developer: ${project.developer} | Partner: ${project.partner}`, 20, 64);
  doc.text(`Anticipated Completion Date (ACD): ${project.completionDate}`, 20, 70);

  // Selected Unit Box
  doc.setFillColor(238, 242, 255);
  doc.rect(14, 84, 182, 32, 'F');
  doc.setDrawColor(199, 210, 254);
  doc.rect(14, 84, 182, 32, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 58, 138);
  doc.text(`SELECTED UNIT: ${unit.type} (${unit.featuredUnit})`, 20, 94);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Unit Suite Area: ${unit.sampleArea} sq.ft (${Math.round(unit.sampleArea * 0.092903)} sqm)`, 20, 102);
  doc.text(`Selected Currency: ${currency.label}`, 20, 108);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(2, 132, 199);
  doc.text(`Total Unit Price: ${currency.symbol}${convertedPrice.toLocaleString()}`, 120, 102);

  // DLD Note
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(220, 38, 38);
  const dldNote = project.dldIncluded 
    ? "* DLD Fee (4%) is INCLUDED in the sales price." 
    : "* Note: DLD Registration Fee (4%) is NOT included in the property price and must be paid with the initial deposit.";
  doc.text(dldNote, 20, 122);

  // Payment Plan Table Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text(`60/40 PAYMENT PLAN BREAKDOWN`, 14, 134);

  // Table Header
  doc.setFillColor(15, 23, 42);
  doc.rect(14, 138, 182, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text(`Milestone Event`, 18, 143.5);
  doc.text(`Value (%)`, 120, 143.5);
  doc.text(`Amount (${currency.symbol.trim()})`, 160, 143.5);

  let currentY = 146;
  const rawPriceNumber = parseFloat(convertedPrice.replace(/,/g, '')) || 0;

  project.paymentPlan.forEach((item, index) => {
    currentY += 7;

    if (currentY > 270) {
      doc.addPage();
      currentY = 20;
    }

    if (index % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, currentY - 5, 182, 7, 'F');
    }

    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text(`${item.milestone} ${item.detail ? `(${item.detail})` : ''}`, 18, currentY);
    doc.text(`${item.percent}%`, 120, currentY);

    const milestoneAmount = Math.round((rawPriceNumber * item.percent) / 100);
    doc.setFont('helvetica', 'bold');
    doc.text(`${milestoneAmount.toLocaleString()}`, 160, currentY);
  });

  // Footer / Agent Info
  const footerY = 282;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, footerY - 5, 196, footerY - 5);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Dubai Luxury Real Estate CRM | Generated automatically | Buy Direct WhatsApp Hotline: +971 50 449 7663`, 14, footerY);

  // Download PDF
  doc.save(`${project.name}_${unit.type}_Offer_Sheet.pdf`);
};
