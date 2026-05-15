// ==================== KONSTANTEN ====================
const SVG_NS = "http://www.w3.org/2000/svg";

// ==================== SVG-BASISELEMENT ERSTELLEN ====================
/**
 * Erzeugt ein SVG-Element und weist Attribute sowie Textinhalt zu.
 * Reduziert Boilerplate in allen folgenden Hilfsfunktionen.
 */
function createSvgElement(tag, attributes = {}, text = null) {
    const el = document.createElementNS(SVG_NS, tag);
    Object.entries(attributes).forEach(([key, value]) => {
        el.setAttribute(key, value);
    });
    if (text !== null) {
        el.textContent = text;
    }
    return el;
}

// ==================== SVG-HAUPTELEMENT ====================
function createSVG(width = CEP_svg_width, height = CEP_svg_height_max) {
    return createSvgElement("svg", {
        viewBox: `0 0 ${width} ${height}`,
        style: "cursor: default;"
    });
}

// ==================== GRUPPE ====================
function svg_group(id) {
    return createSvgElement("g", { id });
}

// ==================== DREIECK ====================
function svg_triangle(x, y, height, color = 'white') {
    const a = (2 * height) / Math.sqrt(3);
    const x1 = x - a / 2;
    const x2 = x + a / 2;
    const y3 = y - height;

    return createSvgElement("polygon", {
        points: `${x1},${y} ${x2},${y} ${x},${y3}`,
        fill: color
    });
}

// ==================== LINIE (absolut, runde Enden) ====================
function svg_line_xy(x1, y1, x2, y2,
                     width = CEP_svg_line_width,
                     color = '#697a88') {
    return createSvgElement("line", {
        x1, y1, x2, y2,
        stroke: color,
        "stroke-width": width,
        "stroke-linecap": "round"
    });
}

// ==================== LINIE (absolut, stumpfe Enden) ====================
function svg_line_xy_butt(x1, y1, x2, y2,
                          width = CEP_svg_line_width,
                          color = '#697a88') {
    // Nutzt svg_line_xy und überschreibt lediglich stroke-linecap
    const line = svg_line_xy(x1, y1, x2, y2, width, color);
    line.setAttribute("stroke-linecap", "butt");
    return line;
}

// ==================== LINIE (Startpunkt, Länge, Winkel) ====================
function svg_line_deg(x1, y1, length, angle,
                      width = CEP_svg_line_width,
                      color = '#697a88') {
    const rad = make_radian(angle);
    return createSvgElement("line", {
        x1, y1,
        x2: x1 + Math.sin(rad) * length,
        y2: y1 + Math.cos(rad) * length,
        stroke: color,
        "stroke-width": width,
        "stroke-linecap": "round",
        id: "test"
    });
}

// ==================== TEXT ====================
function svg_text(string, x, y,
                  anchor = 'left',
                  fontSize = CEP_svg_font_size,
                  color = '#000000') {
    // vertikale Zentrierung mit empirischem Korrekturfaktor
    const yAdjusted = y + fontSize * 0.35;
    return createSvgElement("text", {
        x, y: yAdjusted,
        fill: color,
        "font-size": `${fontSize}px`,
        "text-anchor": anchor
    }, string);
}