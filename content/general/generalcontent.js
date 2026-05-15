function new_task(){
    loadContentById(window.currentButtonId);
}

function check_result() {
    let table = [];
    let iskorrekt = true

    let min_ergebnis;
    let max_ergebnis;
    let eingabe;


    taskrunning = false;

    if (ergebnis[2] === 'm:s'){
        min_ergebnis = ergebnis[0] - 10;
        max_ergebnis = ergebnis[0];

        eingabe = convert_min2sek(document.getElementById('numpad_value').innerText);

    }else if (ergebnis[2] === ''){
        if (ergebnis[0] > 360){
            ergebnis[0] = ergebnis[0] - 360;
        }
        else if (ergebnis[0] < 0){
            ergebnis[0] = ergebnis[0] + 360;
        }

        min_ergebnis = ergebnis[0] - 5;
        max_ergebnis = ergebnis[0] + 5;
        if (min_ergebnis < 0){
            min_ergebnis = min_ergebnis + 360;
        }
        if (max_ergebnis > 360){
            max_ergebnis = max_ergebnis - 360;
        }
        eingabe = parseFloat(document.getElementById('numpad_value').innerText);
    }
    else if (ergebnis[2] === '$\\mathrm{\\frac{°}{min}}$'){
        min_ergebnis = ergebnis[0] -0.2;
        max_ergebnis = ergebnis[0] +0.2;

        eingabe = parseFloat(document.getElementById('numpad_value').innerText);

    }

    else{
        min_ergebnis = ergebnis[0] *0.95;
        max_ergebnis = ergebnis[0] *1.05;

        eingabe = parseFloat(document.getElementById('numpad_value').innerText);
    }

    eingabe = eingabe.toFixed(ergebnis[3]);
    if (ergebnis[1]) {
        if (ergebnis[0].toFixed(ergebnis[3]) !== eingabe){
            iskorrekt = false;
        }
    }
    else{
        if (eingabe > max_ergebnis || eingabe < min_ergebnis) {
            iskorrekt = false;
        }
    }

    if (isNaN(eingabe)){
        iskorrekt = false;
    }

    if (ergebnis[2] === 'm:s'){
        table [0] = ['Ihre Eingabe:', convert_sek2min(eingabe), ergebnis[2]];
        table [1] = ['Exaktes Ergebnis:', convert_sek2min(ergebnis[0].toFixed(ergebnis[3])), ergebnis[2]];
        if (!ergebnis[1]) {
            table [2] = ['Tolerierbares Ergebnis:',convert_sek2min(min_ergebnis.toFixed(ergebnis[3])) + ' - ' + convert_sek2min( max_ergebnis.toFixed(ergebnis[3])), ergebnis[2]];
        }
    }
    else if (ergebnis[2] === ''){
        table [0] = ['Ihre Eingabe:',three_letter(eingabe), ergebnis[2]];
        table [1] = ['Exaktes Ergebnis:', three_letter(ergebnis[0].toFixed(ergebnis[3])), ergebnis[2]];
        if (!ergebnis[1]) {
            table [2] = ['Tolerierbares Ergebnis:', three_letter(min_ergebnis.toFixed(ergebnis[3])) + ' - ' + three_letter(max_ergebnis.toFixed(ergebnis[3])), ergebnis[2]];
        }
    }

    else {
        table [0] = ['Ihre Eingabe:', eingabe, ergebnis[2]];
        table [1] = ['Exaktes Ergebnis:', ergebnis[0].toFixed(ergebnis[3]), ergebnis[2]];
        if (!ergebnis[1]) {
            table [2] = ['Tolerierbares Ergebnis:', min_ergebnis.toFixed(ergebnis[3]) + ' - ' + max_ergebnis.toFixed(ergebnis[3]), ergebnis[2]];
        }
    }

    make_answer(table, iskorrekt);
    if (zwischenergebnis) {
        make_zwischenergebnis();
    }
    document.querySelector('table').style.visibility = 'visible';
    render_latex();

}

function make_submenu(title, cont){
    const content = document.querySelector('content');
    LI_preset = null;
    content.innerHTML = '<h1>' + title + '</h1>' +
        '<p>' +
        cont +
        '</p>';
}



