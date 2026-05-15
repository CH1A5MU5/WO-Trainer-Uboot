

function make_basic_table_exercise(title,table_values, decimal, unit, minus ){
    taskrunning = true;
    let uniti;
    clean_content();
    make_title(title);
    make_leftright_flex();
    make_task(table_values);
    if (unit === 'C-X-C') {
        unit = '';
        uniti = 'C-X-C';
    }
    make_numpad(
        decimal,
        unit,
        minus
    );
    if (uniti === 'C-X-C'){
        add_numpad_letters();
    }
    start_numPad();
    render_latex();
}



function clean_content() {
    LI_preset = null;
    zwischenergebnis = null;
    const content = document.querySelector('content');
    content.innerHTML = '';
}

function make_title(title) {
    const content = document.querySelector('content');
    content.innerHTML = content.innerHTML +
        '<div id="content_header">' +
        title +
        '</div>';
}

function make_leftright_flex(){
    const content = document.querySelector('content');
    content.innerHTML = content.innerHTML +
        '<div id="content_body">' +
        '<div id="content_body_left"></div>' +
        '<div id="content_body_right"></div>' +
        '</div>';
}

function make_topdown_flex(){
    const content = document.querySelector('content');
    content.innerHTML = content.innerHTML +
    '<div id="content_body">' +
        '<div id="content_body_topbar"></div>' +
    '<div id="content_body_top"></div>' +
    '<div id="content_body_down"></div>' +
    '</div>';

    const content_body = document.getElementById('content_body');
    content_body.style.flexDirection = 'column';
    content_body.style.marginTop = '-5px';

    const body_top = document.getElementById('content_body_top');
    const body_down = document.getElementById('content_body_down');
    const top_bar = document.getElementById('content_body_topbar');

}

function make_task(vales){
    make_table(vales,'task');
}

function make_table (values, bodyID) {
    const left = document.getElementById('content_body_left');
    left.innerHTML += '<table>' +
        '<tbody id="'+ bodyID + '">' +
        '</tbody>' +
        '</table>';
    const tbody = document.getElementById(bodyID);
    if (bodyID === 'task') {
        for (let i = 0; i < values.length; i++) {
            tbody.innerHTML += '<tr><td class="fullname" style="border-right: 0">' +
                values[i][0] +
                '</td><td class="mathsign" style="border-left: 0">' +
                values[i][1]+
                '</td><td class="tablevalue" style="border-right: 0">' +
                values[i][2] +
                '</td><td class="tableunit" style="border-left: 0">' +
                values [i][3] +
                '</td></tr>';
        }
    }
    else{
        for (let i = 0; i < values.length; i++) {
            tbody.innerHTML += '<tr><td class="fullname">' +
                values[i][0] +
                '</td><td class="answervalue" style="border-right: 0; width: 35%; text-align: center"   >' +
                values[i][1]+
                '</td><td class="tableunit" style="border-left: 0">' +
                values [i][2] +
                '</td></tr>';
        }
    }



}

function make_answer(values, iskorrekt) {
    make_table(values,'answer');
    let answer = document.getElementById('answer');
    if (iskorrekt) {
        answer.style.backgroundColor = "var(--alertgreentrans)";
    }
    else{
        answer.style.backgroundColor = "var(--alertredtrans)";
    }
    answer.style.color = 'white';
    const left = document.getElementById('content_body_left');
    left.innerHTML = '<div> Drücken Sie Enter für eine neue Aufgabe.</div>'+left.innerHTML;
}

function make_zwischenergebnis(){
    const left = document.getElementById('content_body_left');
    left.innerHTML += '<div> Zwischenergebnisse:</div>';
    make_table(zwischenergebnis, 'zwischenergebnis');
    let zwi_answer = document.getElementById('zwischenergebnis');
    zwi_answer.style.backgroundColor = 'var(--unselected-greytrans)';
    zwi_answer.style.color = 'white';


}

function render_latex(){
    renderMathInElement(document.body, { delimiters: [ {left: '$', right: '$', display: false}, ] });
}

function make_numpad(decimal, unit, minus) {
    let right = document.getElementById('content_body_right');
    right.innerHTML = '<div id="numpad_frame">' +
        '<div class="numpad_row" id="numpad_display">' +
        '   <div id="numpad_value"></div>' +
        '   <div id="numpad_einheit">' + unit + '</div>' +
        '</div>' +
        '<div class="numpad_row" id="numpad_row1"></div>' +
        '<div class="numpad_row" id="numpad_row2"></div>' +
        '<div class="numpad_row" id="numpad_row3"></div>' +
        '<div class="numpad_row" id="numpad_row4"></div>' +
        '</div>';

    let rows = document.getElementsByClassName('numpad_row');
    let num = 6;
    for (let i = 1; i < rows.length; i++) {
        rows[i].innerHTML = '<div class="numpad_button">'+ (num + i) +'</div>' +
            '<div class="numpad_button" >' + (num + i +1) +'</div>' +
            '<div class="numpad_button" >'+ (num + i + 2) +'</div>';
        num = num - 4;
    }

    let buttons = document.getElementsByClassName('numpad_button');
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].innerHTML === '0') {
            buttons[i].innerHTML = '<img alt="enter_icon" src="data/pictures/icons/numpad/enter.svg" ' +
                'style="max-width: 40%; max-height: 40%; " />';
            buttons[i].id = 'numpad_Enter';
        }
        else if (buttons[i].innerHTML === '-1') {
            buttons[i].innerHTML = '0';
            buttons[i].id = 'numpad_0';
        }
        else if (buttons[i].innerHTML === '-2') {
            buttons[i].innerHTML = '<img alt="delete_icon" src="data/pictures/icons/numpad/del.svg" ' +
                'style="max-width: 40%; max-height: 40%; " />';
            buttons[i].id = 'numpad_Backspace';
        }
        else if (buttons[i].innerHTML !== '0' ) {

            buttons[i].id = 'numpad_' +buttons[i].innerText;
        }
    }
    if (unit === '$\\mathrm{\\frac{°}{min}}$'){
        decimal = true;
        minus = true;
    }
    if (decimal){
        let old_delbutton = document.getElementById('numpad_Backspace')
        let delbutton = old_delbutton.outerHTML;
        old_delbutton.id = 'numpad_buttonsplitter';
        old_delbutton.className = 'numpad_buttonsplitter';
        if (unit === 'm:s') {
            old_delbutton.innerHTML = delbutton +
                '<div class="numpad_button" id="numpad_:">:</div>';
        }
        else {
            old_delbutton.innerHTML = delbutton +
                '<div class="numpad_button" id="numpad_.">,</div>';
        }
    }
    if (minus){
        let old_enterbutton = document.getElementById('numpad_Enter');
        let enterbutton = old_enterbutton.outerHTML;
        old_enterbutton.id = 'numpad_buttonsplitter2';
        old_enterbutton.className = 'numpad_buttonsplitter';
        old_enterbutton.innerHTML = '<div class="numpad_button" id="numpad_-">-</div>'
            + enterbutton;
    }
}

function add_numpad_letters(){
    let rows = document.getElementsByClassName('numpad_row');
    let kardinalbutton = ['','N','O','S','W']

    for (let i = 1; i < rows.length; i++) {
        rows[i].innerHTML += '<div class="numpad_button" ' +
            'id="numpad_' +
            kardinalbutton[i] +
            '">'
            + kardinalbutton[i]
            +'</div>'
    }
}