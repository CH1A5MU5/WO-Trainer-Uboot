function show_DOT(){
    let title = 'Distance Of Track (DOT)';
    let cont = 'Wählen Sie links einen Aufgabentypen aus oder lernen Sie alles über den DOT mittels der Hilfefunktion.';
    make_submenu(title, cont);
}

function show_DOT_SLR(){
    let title = 'Bestimmen Sie den DOT mit dem Rechenschieber.';

    let K_e = rand_Int(1, 360); //Erzeugt Zufallszahlen zwischen 1 und 360
    let bow_left = rand_Bool(); //Erzeugt Zufallswerte als true und false
    let bow = rand_Int(5,85);
    if (bow_left){
        bow = bow * -1;
    }

    let B_mn = K_e + bow;
    B_mn = navy_course(B_mn); // Stellt sicher, dass sich der Wert zwischen 001 und 360 befindet

    let R_m = rand_Int(20,200)/10 //Erzeugt Zufallszahlen von 2.0 bis 20.0

    let values = [];
    values [0] = ['Eigenkurs', '$\\mathrm{K_e}$', three_letter(K_e), ''];
    values [1] = ['Gegnerpeilung', '$\\mathrm{B_{mn}}$', three_letter(B_mn), ''];
    values [2] = ['Entfernung', '$\\mathrm{R_m}$', R_m, 'nm'];


    make_basic_table_exercise(
        title,
        values,
        true,
        'nm'
    );
    let DOT = Math.sin(make_radian(bow))*R_m;
    if (DOT < 0){
        DOT = DOT * -1;
    }

    ergebnis = [DOT, //Das exakte Ergebnis
               false, //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
                'nm', // Einheit des Ergebnisses
                1]; //Anzahl der Zeichen nach dem Komma in der Ergebnisanzeige
}

function show_DOT_30M(){
    let title= 'Bestimmen Sie den DOT mit der 30M Regel';
    let B_m = rand_Int(1, 9);
    let R_m = rand_Int(5,100)/10;
    let bow_left = rand_Bool();

    let DOT = 30 * R_m * B_m;

    if(bow_left) {
        B_m = B_m * -1;
    }
    B_m = navy_course(B_m);

    let values = [];
    values [0] = ['Schiffsseitenpeilung',' $\\mathrm{B_m}$', B_m, '°'];
    values [1] = ['Entfernung',' $\\mathrm{R_m}$', R_m, 'nm'];

    make_basic_table_exercise(
        title,
        values,
        false,
        'm'
    );

    ergebnis = [DOT, //Das exakte Ergebnis
        true, //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        'm', // Einheit des Ergebnisses
        0]; //Anzahl der Zeichen nach dem Komma in der Ergebnisanzeige
}

function show_DOT_KOP(){
    let title = 'Bestimmen Sie den DOT im Kopf.';

    let I_m = rand_Int(0, 9)*10;
    let R_m = rand_Int(10,100)*100;
    let bow_left = rand_Bool();

    let DOT = R_m * uboot_sinus(I_m);

    if (bow_left) {
        I_m = 'L'+I_m;
    }
    else{
        I_m = 'R'+I_m;
    }

    let values = [];
    values [0] = ['Gegnerlage',' $\\mathrm{I_m}$', I_m, ''];
    values [1] = ['Entfernung',' $\\mathrm{R_m}$', R_m, 'yds'];

    make_basic_table_exercise(
        title,
        values,
        false,
        'yds'
    );

    ergebnis = [DOT, //Das exakte Ergebnis
        true, //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        'yds', // Einheit des Ergebnisses
        0]; //Anzahl der Zeichen nach dem Komma in der Ergebnisanzeige
}

function show_DOT_SPC(){
    let title = 'Bestimmen Sie den Abstand der Suchfront durch Spacing mit dem Rechenschieber.';
    let I_m = rand_Int(5, 20);
    let bow_left = rand_Bool();
    let B_mn_1 = rand_Int(1,360);
    let B_mn_2;
    if (bow_left) {
        B_mn_2 = B_mn_1 - I_m;
    }
    else{
        B_mn_2 = B_mn_1 + I_m;
    }
    B_mn_2 = navy_course(B_mn_2);
    let DOT = rand_Int(4,10)*1000;

    let values = [];
    values [0] = ['Peiliung SYS 1',' $\\mathrm{B_{mn_{SYS1}}}$', three_letter(B_mn_1), ''];
    values [1] = ['Peiliung SYS 2',' $\\mathrm{B_{mn_{SYS2}}}$', three_letter(B_mn_2), ''];
    values [2] = ['Gegisster DOT mittels SONAR Reichweiten','', DOT,'yds']

    make_basic_table_exercise(
        title,
        values,
        false,
        'yds'
    );

    let R_m = DOT/Math.sin(make_radian(I_m));

    ergebnis = [R_m, //Das exakte Ergebnis
        false, //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        'yds', // Einheit des Ergebnisses
        0]; //Anzahl der Zeichen nach dem Komma in der Ergeb
}