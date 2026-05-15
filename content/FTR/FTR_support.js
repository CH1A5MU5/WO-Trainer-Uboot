function make_fall_away_exercise(values, fallaway, title){
    let ergebnis_val = values [fallaway][values[fallaway].length -2];

    values [fallaway][values[fallaway].length -2] = 'gesucht';

    let unit = values [fallaway][values[fallaway].length -1]
    let decimal = true;
    let numdecimal = 1;

    if (unit === 'yds' || unit === '') {
        decimal = false;
        numdecimal = 0;
    }

    make_basic_table_exercise(
        title,
        values,
        decimal,
        unit
    );

    let table = document.getElementById('task');
    table.childNodes[fallaway].childNodes[values[fallaway].length -2].style.backgroundColor = 'var(--alertredtrans)';
    table.childNodes[fallaway].childNodes[values[fallaway].length -1].style.backgroundColor = 'var(--alertredtrans)';

    table.childNodes[fallaway].childNodes[values[fallaway].length -2].style.color = 'white';
    table.childNodes[fallaway].childNodes[values[fallaway].length -1].style.color = 'white';



    ergebnis = [parseFloat(ergebnis_val), //Das exakte Ergebnis
        false, //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        unit, // Einheit des Ergebnisses
        numdecimal]; //Anzahl der Zeichen nach dem Komma in der Ergebnisanzeige


}



