function show_CEB(){
    let title = 'CEP Interpretation';
    let cont = 'Wählen Sie links einen Aufgabentypen aus ' +
        'oder lernen Sie alles über die Interpretation des Contact Evaluation Plot (CEP) ' +
        'mittels der Hilfefunktion.';
    make_submenu(title, cont);
}

function show_CEB_KI() {
    let title = 'Markieren Sie alle definitiv wahren Aussagen.';

    let plots = [
        ['CEP', 1, 'ANL', 'NE', 'FALSE'],
        ['CEP', 2, 'ANL', 'BL', 'FALSE'],
        ['CEP', 3, 'ABL', 'BL', 'FALSE'],
        ['CEP', 4, 'ABL', 'NE', 'FALSE'],
        ['CEP', 5, 'ANE', 'BL', 'FALSE'],
        ['CEP', 6, 'ANL', 'BR', 'FALSE'],
        ['CEP', 7, 'ANL', 'NE', 'FALSE'],
        ['CEP', 8, 'ABL', 'NE', 'FALSE'],
        ['CEP', 9, 'ABL', 'BR', 'FALSE'],
        ['CEP', 10, 'ANE', 'BR', 'FALSE'],
        ['CEP', 11, 'ANL', 'BR', 'FALSE'],
        ['CEP', 12, 'ANL', 'BL', 'FALSE'],
        ['CEP', 13, 'ABL', 'BL', 'FALSE'],
        ['CEP', 14, 'ABL', 'BR', 'FALSE'],
        ['CEP', 15, 'ANL', 'BR', 'FALSE'],
        ['CEP', 16, 'ANL', 'BL', 'FALSE'],
        ['CEP', 17, 'ABL', 'BL', 'FALSE'],
        ['CEP', 18, 'ABL', 'BR', 'FALSE'],
        ['CEP', 19, 'ABL', 'BL', 'TRUE'],
        ['CEP', 20, 'ABL', 'BR', 'TRUE'],
        ['CEP', 21, 'ABL', 'BR', 'TRUE'],
        ['CEP', 22, 'ABL', 'BL', 'TRUE'],
    ]
    let path = 'data/pictures/CEP/basic_cep/';


    make_multiple_choice_exercise(
        title,
        plots,
        path);
}


function show_CEB_ME(){
    let title = 'Markieren Sie alle möglichen Kurs- und Fahrtmanöver.';

    let plots = [
        ['MANCEP', 1,  'ZDST', 'FV'],
        ['MANCEP', 2,  'ZDBB', 'FV'],
        ['MANCEP', 3,  'ZDST', 'FV'],
        ['MANCEP', 4,  'ZDBB', 'FV'],
        ['MANCEP', 5,  'ADBB', 'FE'],
        ['MANCEP', 6,  'ADST', 'FE'],
        ['MANCEP', 7,  'ADBB', 'FE'],
        ['MANCEP', 8,  'ADST', 'FE'],
        ['MANCEP', 9,  'ZDST', 'FE'],
        ['MANCEP', 10, 'ZDBB', 'FE'],
        ['MANCEP', 11, 'ZDST', 'FE'],
        ['MANCEP', 12, 'ZDBB', 'FE'],
        ['MANCEP', 13, 'ADBB', 'FV'],
        ['MANCEP', 14, 'ADST', 'FV'],
        ['MANCEP', 15, 'ADBB', 'FV'],
        ['MANCEP', 16, 'ADST', 'FV'],
        ['MANCEP', 17, 'ADBB', 'ZDBB','NE'],
        ['MANCEP', 18, 'ADST', 'ZDST','NE'],
        ['MANCEP', 19, 'ADBB', 'ZDBB','NE'],
        ['MANCEP', 20, 'ADST', 'ZDST','NE'],
        ['MANCEP', 21, 'ADBB', 'ZDBB','NE'],
        ['MANCEP', 22, 'ADST', 'ZDST','NE'],
        ['MANCEP', 23, 'ADBB', 'ZDBB','NE'],
        ['MANCEP', 24, 'ADST', 'ZDST','NE'],
        ['MANCEP', 25, 'ZDBB', 'NE'],
        ['MANCEP', 26, 'ZDST', 'NE'],
        ['MANCEP', 27, 'ZDBB', 'NE'],
        ['MANCEP', 28, 'ZDST', 'NE'],
        ['MANCEP', 29, 'ADST', 'NE'],
        ['MANCEP', 30, 'ADBB', 'NE'],
        ['MANCEP', 31, 'ADST', 'NE'],
        ['MANCEP', 32, 'ADBB', 'NE'],

    ];
    let path = 'data/pictures/CEP/maneuver_cep/';

    make_multiple_choice_exercise(
        title,
        plots,
        path);
}

function show_CEB_MEKA(){
    let title = 'Bewerten Sie ob der Gegner manövriert haben muss und markieren Sie anschließend alle alle möglichen Kurs- und Fahrtmanöver.';


    let plots = [
        ['OWNMANCEP', 1,  'ZDST', 'FV'],
        ['OWNMANCEP', 2,  'NOMA', 'NIL'],
        ['OWNMANCEP', 3,  'NOMA', 'NIL'],
        ['OWNMANCEP', 4,  'ZDBB', 'FV'],
        ['OWNMANCEP', 5,  'NOMA', 'NIL'],
        ['OWNMANCEP', 6,  'ADST', 'FE'],
        ['OWNMANCEP', 7,  'ADBB', 'FE'],
        ['OWNMANCEP', 8,  'NOMA', 'NIL'],
        ['OWNMANCEP', 9,  'NOMA', 'NIL'],
        ['OWNMANCEP', 10, 'ZDBB', 'FE'],
        ['OWNMANCEP', 11, 'ZDST', 'FE'],
        ['OWNMANCEP', 12, 'NOMA', 'NIL'],
        ['OWNMANCEP', 13, 'ADBB', 'FV'],
        ['OWNMANCEP', 14, 'NOMA', 'NIL'],
        ['OWNMANCEP', 15, 'NOMA', 'NIL'],
        ['OWNMANCEP', 16, 'ADST', 'FV'],
        ['OWNMANCEP', 17, 'NOMA', 'NIL'],
        ['OWNMANCEP', 18, 'ADST', 'ZDST', 'NE'],
        ['OWNMANCEP', 19, 'ADBB', 'ZDBB', 'NE'],
        ['OWNMANCEP', 20, 'NOMA', 'NIL'],
        ['OWNMANCEP', 21, 'ADBB', 'ZDBB','NE'],
        ['OWNMANCEP', 22, 'NOMA', 'NIL'],
        ['OWNMANCEP', 23, 'NOMA', 'NIL'],
        ['OWNMANCEP', 24, 'ADST', 'ZDST','NE'],
        ['OWNMANCEP', 25, 'ZDBB', 'NE'],
        ['OWNMANCEP', 26, 'ZDST', 'NE'],
        ['OWNMANCEP', 27, 'ZDBB', 'NE'],
        ['OWNMANCEP', 28, 'ZDST', 'NE'],
        ['OWNMANCEP', 29, 'ADST', 'NE'],
        ['OWNMANCEP', 30, 'ADBB', 'NE'],
        ['OWNMANCEP', 31, 'ADST', 'NE'],
        ['OWNMANCEP', 32, 'ADBB', 'NE'],

    ];
    let path = 'data/pictures/CEP/own_man_cep/';
    make_multiple_choice_exercise(
        title,
        plots,
        path);
    add_mc_ZZcheck();


}