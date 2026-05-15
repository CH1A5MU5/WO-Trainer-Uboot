function show_GKU(){
    let title = 'Gegnerkurs';
    let cont = 'Wählen Sie links einen Aufgabentypen aus ' +
        'oder lernen Sie alles über die Berechnung des Gegnerkurses ' +
        'mittels der Hilfefunktion.';
    make_submenu(title, cont);


}

function show_GKU_GP(){
    let isbearing = rand_Bool();
    let title;
    if (isbearing){
        title = 'Bestimmen Sie den Gegenpeilung.';
    }
    else {
        title = 'Bestimmen Sie den reziproken Kurs.';
    }

    let B_mn = rand_Int(1, 360);
    let Gegen = B_mn +180;
    Gegen = navy_course(Gegen);

    let values = [];
    if (isbearing){
        values [0] = ['Gegnerpeilung',' $\\mathrm{B_{mn}}$', three_letter(B_mn), ''];
    }
    else{
        values [0] = ['Gegnerkurs',' $\\mathrm{K_d}$', three_letter(B_mn), ''];
    }
    make_basic_table_exercise(
        title,
        values,
        false,
        ''
    );

    ergebnis = [Gegen, //Das exakte Ergebnis
        true, //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        '', // Einheit des Ergebnisses
        0]; //Anzahl der Zeichen nach dem Komma in der Ergebnisanzeige


}

function show_GKU_PD(){
    var title = 'Berechnen Sie den Gegnerkurs.'

    let B_mn = rand_Int(1, 360);
    let I_m = rand_Int(0, 18)*10;

    let bow_left = rand_Bool();
    if (bow_left){
        I_m = I_m * -1
    }

    let Gegen = B_mn + 180;
    let K_d = Gegen - I_m;
    K_d = navy_course(K_d);



    if (bow_left){
        I_m = 'L ' + I_m*-1;
    }
    else if (I_m === 0 || I_m === 180){
        I_m = 'BL ' + I_m;
    }
    else{
        I_m = 'R ' + I_m;
    }

    let values = [];
    values [0] = ['Gegnerpeilung',' $\\mathrm{B_{mn}}$', three_letter(B_mn), ''];
    values [1] = ['Gegnerlage',' $\\mathrm{I_{m}}$', I_m, ''];

    make_basic_table_exercise(
        title,
        values,
        false,
        ''
    );

    ergebnis = [K_d, //Das exakte Ergebnis
        true, //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        '', // Einheit des Ergebnisses
        0]; //Anzahl der Zeichen nach dem Komma in der Ergebnisanzeige
}

function show_GKU_GRE(){
    var title = 'Berechnen Sie den Grenzkurs.';

    let B_mn = rand_Int(1, 360);
    let B_mn_gegen = navy_course(B_mn+180);


    let closing = rand_Bool();
    let just_closing;
    just_closing = rand_Int(1, 8) > 1;

    let bowleft = rand_Bool();

    let GK1;
    let GK2;

    if (just_closing){
        if (closing){
            GK1 = navy_course(B_mn_gegen -89);
            GK2 = navy_course(B_mn_gegen +89);
        }
        else {
            GK1 = navy_course(B_mn_gegen +89);
            GK2 = navy_course(B_mn_gegen -89);
        }
    }
    else{
        if (closing){
            if (bowleft){
                GK1 = navy_course(B_mn_gegen +1);
                GK2 = navy_course(B_mn_gegen +89);
            }
            else {
                GK1 = navy_course(B_mn_gegen -89);
                GK2 = navy_course(B_mn_gegen -1);
            }
        }
        else{
            if (bowleft){
                GK1 = navy_course(B_mn -1);
                GK2 = navy_course(B_mn -89);
            }
            else {
                GK1 = navy_course(B_mn +1);
                GK2 = navy_course(B_mn +89);
            }
        }
    }
    let kardinal = false;
    for (let i=GK1; i<navy_course(GK2+1);i++){
        i = navy_course(i);
        if (i===360) kardinal = 'N';
        else if (i===90) kardinal = 'O';
        else if (i===180) kardinal = 'S';
        else if (i===270)kardinal = 'W';
    }
    if (GK2<GK1){
        kardinal = 'N';
    }

    GK1 = three_letter(GK1);
    GK2 = three_letter(GK2);
    let answer;
    if (kardinal){
        answer = GK1 + '-' + kardinal + '-' + GK2;
    }
    else {
        answer = GK1 + '-' + GK2;
    }

    if (bowleft){
        bowleft = 'links';
    }
    else {
        bowleft = 'rechts';
    }

    if (closing){
        closing = 'anlaufend';
    }
    else {
        closing = 'ablaufend';
    }

    let values = [];
    values [0] = ['Gegnerpeilung',' $\\mathrm{B_{mn}}$', three_letter(B_mn), ''];
    values [1] = ['Ablaufverhalten', '',closing, ''];
    if (!just_closing){
        values [2] = ['Bug','',bowleft, ''];
    }


    make_basic_table_exercise(
        title,
        values,
        false,
        'C-X-C',
        true
    );

    ergebnis = [answer, //Das exakte Ergebnis
        true, //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        'C-X-C', // Einheit des Ergebnisses
        0]; //Anzahl der Zeichen nach dem Komma in der Ergebnisanzeige

}

function check_kardinal_result(){
    taskrunning = false;
    let table = [];
    let eingabe = document.getElementById('numpad_value').innerText;
    let iskorrekt = false;

    if (eingabe === ergebnis[0]){
        iskorrekt = true;
    }

    table [0] = ['Ihre Eingabe:', eingabe, ''];
    table [1] = ['Exaktes Ergebnis:', ergebnis[0], ''];


    make_answer (table, iskorrekt)
}