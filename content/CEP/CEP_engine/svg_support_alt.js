function createSVG(width = CEP_svg_width, height = CEP_svg_height_max) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.style.cursor = "default";

    return svg;
}

function svg_group(id, svgNS = "http://www.w3.org/2000/svg"){
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute('id', id);

    return group;
}

function svg_triangle(x,y, height, color = 'white', svgNS = "http://www.w3.org/2000/svg"){
    const triangle = document.createElementNS(svgNS, "polygon");
    let a = (2*height)/(Math.sqrt(3));
    let x1 = x-a/2;
    let x2 = x+a/2;
    let y1 = y;
    let y2 = y;
    let y3 = y - height;

    triangle.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x},${y3}`);
    triangle.setAttribute("fill", color);

    return triangle;
}

function svg_line_xy(x1,y1,x2,y2, width = CEP_svg_line_width, color = '#697a88', svgNS = "http://www.w3.org/2000/svg") {
    const trackBg = document.createElementNS(svgNS, "line");
    trackBg.setAttribute("x1", x1);
    trackBg.setAttribute("y1", y1);
    trackBg.setAttribute("x2", x2);
    trackBg.setAttribute("y2", y2);
    trackBg.setAttribute("stroke", color);
    trackBg.setAttribute("stroke-width", width);
    trackBg.setAttribute("stroke-linecap", "round");

    return trackBg;
}

function svg_line_xy_butt(x1,y1,x2,y2, width = CEP_svg_line_width, color = '#697a88', svgNS = "http://www.w3.org/2000/svg"){
    let svg_line = svg_line_xy(x1,y1,x2,y2, width, color, svgNS);
    svg_line.setAttribute('stroke-linecap', 'butt');
    return svg_line;
}

function svg_line_deg(x1,y1,length,angle, width = CEP_svg_line_width, color = '#697a88', svgNS = "http://www.w3.org/2000/svg") {
    const trackBg = document.createElementNS(svgNS, "line");
    trackBg.setAttribute("x1", x1);
    trackBg.setAttribute("y1", y1);
    trackBg.setAttribute("x2", x1 + Math.sin(make_radian(angle))*length);
    trackBg.setAttribute("y2", y1 + Math.cos(make_radian(angle))*length);
    trackBg.setAttribute("stroke", color);
    trackBg.setAttribute("stroke-width", width);
    trackBg.setAttribute("stroke-linecap", "round");
    trackBg.setAttribute("id", 'test')
    return trackBg;
}

function svg_text(string, x1,y1, anchor = 'left', fontsize = CEP_svg_font_size, color = '#000000', svgNS = "http://www.w3.org/2000/svg") {
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", x1);
    text.setAttribute("y", `${y1 + fontsize/2 - 0.15*fontsize}`);
    text.setAttribute("fill", color);
    text.setAttribute("font-size", fontsize + 'px');
    text.setAttribute("text-anchor", anchor);
    text.textContent = string;
    return text;
}