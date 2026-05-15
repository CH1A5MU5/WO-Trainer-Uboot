function show_LIV(){
    let title = 'Lookinterval';
    let cont = 'Wählen Sie links einen Aufgabentypen aus oder lernen Sie alles über das Lookinterval mittels der Hilfefunktion.';
    make_submenu(title, cont);

}

function show_LIV_GK(){
    let title = 'Bestimmen Sie den Gefahrenkreis bis auf 100 m genau.'
    let v_d = rand_Int(2, 47);
    let isStandardGK = rand_Int(1, 100);
    if (isStandardGK < 70) {
        isStandardGK = false;
    }
    else{
        isStandardGK = true;
    }

    let Standardvessel = [];
    Standardvessel [0] = ['Fischer', 8];
    Standardvessel [1] = ['Kleiner Händler', 17];
    Standardvessel [2] = ['Großer Händler', 23];
    Standardvessel [3] = ['Krieger', 29];
    Standardvessel [4] = ['Fähre', 29];
    Standardvessel [5] = ['Schnellboot', 38];

    let st_ves_num = rand_Int(0, 5);

    if (isStandardGK) {
        v_d = Standardvessel[st_ves_num][1];
    }

    let GK = ((v_d + 7)/3)
    let GK_int = parseInt(GK);
    let diff = GK - GK_int;
    if (diff !== 0){
        GK = GK_int + 1;
    }
    else{
        GK = GK_int;
    }
    GK = GK * 100;

    let values = [];
    if (isStandardGK) {
        values [0] = ['Standardgefahrenkreis','', Standardvessel[st_ves_num][0], ''];
    }
    else {
        values [0] = ['Max. Gegnerfahrt',' $\\mathrm{v_{dmax}}$', v_d, 'kn'];
    }

    make_basic_table_exercise(
        title,
        values,
        false,
        'yds'
    );
    ergebnis = [GK, //Das exakte Ergebnis
        true, //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        'yds', // Einheit des Ergebnisses
        0]; //Anzahl der Zeichen nach dem Komma in der Ergebnisanzeige

    // vd für GK = 300 ist vd 2kn
    // vd für GK = 1800 ist 47kn

}

function show_LIV_LIS(){
    let title = 'Bestimmen Sie das Lookinterval Seeraum.'
    let R_Sicht = rand_Int(6, 40)*500;
    let R_Land = rand_Int(6, 80)*500;

    let R;
    if (R_Sicht > R_Land) {
        R = R_Land;
    }
    else{
        R = R_Sicht;
    }

    let LI_sek = (R/1500)*60;
    let Wassertiefe;
    let isFlachwasser = rand_Int(1, 100);
    if (isFlachwasser < 70) {
        isFlachwasser = false;
        Wassertiefe = 100;
        LI_sek = LI_sek - 60;
    }
    else{
        isFlachwasser = true;
        Wassertiefe = 24;
        LI_sek = LI_sek - 120;
    }

    let values = [];
    values [0] = ['Sicht','', R_Sicht, 'yds'];
    values [1] = ['Wassertiefe','', Wassertiefe, 'm']
    if (isFlachwasser) {
        values [2] = ['Abstand zur 20 m Linie','', R_Land, 'yds'];
    }
    else {
        values [2] = ['Abstand zur 50 m Linie','', R_Land, 'yds'];
    }
    values [3] = ['Größter angenommener Gefahrenkreis',' $\\mathrm{GK_{max}}$', 1500, 'yds']

    make_basic_table_exercise(
        title,
        values,
        true,
        'm:s'
    );

    ergebnis = [LI_sek, //Das exakte Ergebnis
        true, //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        'm:s', // Einheit des Ergebnisses
        0]; //Anzahl der Zeichen nach dem Komma in der Ergebnisanzeige

}

function show_LIV_LIB(){
    let title = 'Bestimmen Sie das Lookinterval auf 10 s genau. Kaufmännisches Aufrunden wird nicht toleriert.'

    let GK = rand_Int(3, 18)*100;

    let R_min = (2*GK)/100;

    let R_m = rand_Int(R_min, 120)*100;

    let LI_sek = (R_m/GK)*60;
    let Wassertiefe;
    let isFlachwasser = rand_Int(1, 100);
    if (isFlachwasser < 80) {

        Wassertiefe = 100;
        LI_sek = LI_sek - 60;
    }
    else{

        Wassertiefe = 24;
        LI_sek = LI_sek - 120;
    }

    let values = [];
    values [0] = ['Entfernung',' $\\mathrm{R_m}$', R_m, 'yds'];
    values [1] = ['Wassertiefe','', Wassertiefe, 'yds'];
    values [2] = ['Gefahrenkreis',' $\\mathrm{GK}$', GK, 'yds'];

    make_basic_table_exercise(
        title,
        values,
        true,
        'm:s'
    );

    ergebnis = [LI_sek, //Das exakte Ergebnis
        false, //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        'm:s', // Einheit des Ergebnisses
        0]; //Anzahl der Zeichen nach dem Komma in der Ergebnisanzeige

}

function show_LIV_T12(){
    let title = 'In wie viel Sekunden können Sie wieder auf PD gehen unter Anwendung des T1/T2 Verfahrens.';
    let T1 = rand_Int(60, 80);
    let T_ST = rand_Int(48, 65);

    let T_40 = T1 - T_ST;
    if (T_40 < 0){
        T_40 = 0;
    }

    let values = [];
    values [0] = ['Zeit von GK bis CPA',' $\\mathrm{T_1}$', T1, 'sek'];
    values [1] = ['Zeit von PD bis 40 m',' $\\mathrm{T_{ST}}$', T_ST, 'sek'];

    make_basic_table_exercise(
        title,
        values,
        false,
        'sek'
    );

    ergebnis = [T_40, //Das exakte Ergebnis
        true, //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        'sek', // Einheit des Ergebnisses
        0]; //Anzahl der Zeichen nach dem Komma in der Ergebnisanzeige


}