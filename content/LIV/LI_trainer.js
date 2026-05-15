function show_LIV_LIT() {
    let CB_GK = document.getElementsByName('Gefahrenkreise:');

    if (CB_GK.length > 0){
        let inputs = document.querySelectorAll('input');
        LI_preset = [[],[],[]];
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].name === 'Gefahrenkreise:' && inputs[i].checked){
                LI_preset[0][LI_preset[0].length] = inputs[i].value;
            }
            else if (inputs[i].name === 'Wassertiefe:' && inputs[i].checked){
                LI_preset[1][LI_preset[1].length] = inputs[i].value;
            }
            else if (inputs[i].name === 'Entfernungsbereich:'){
                LI_preset[2][LI_preset[2].length] = inputs[i].value;
            }
        }
        if (LI_preset[0].length < 1 || LI_preset[1].length < 1){
            alert('Bitte wählen Sie die Gefahrenkreise und die Wassertiefen aus für die Sie trainieren wollen.')
            LI_preset = null;
        }


    }

    if (LI_preset) show_LI_Trainer_task()
    else show_LI_Trainer_menu();
}

function show_LI_Trainer_menu(){
    let title = 'Wählen Sie die Gefahrenkreise und den Entfernungsbereich, den Sie trainieren wollen.'
    clean_content(true);
    make_title(title);
    make_leftright_flex();
    taskrunning = false;
    const left = document.getElementById('content_body_left');
    const right = document.getElementById('content_body_right');
    right.style.flexDirection = 'column';
    right.style.gap = '5px';
    let GK = [[300,'300 yds'],
        [400,'400 yds'],
        [500,'500 yds'],
        [600,'600 yds'],
        [700,'700 yds'],
        [800,'800 yds'],
        [900,'900 yds'],
        [1000,'1000 yds'],
        [1100,'1100 yds'],
        [1200,'1200 yds'],
        [1300,'1300 yds'],
        [1400,'1400 yds'],
        [1500,'1500 yds']];
    left.innerHTML = make_checkgroup('Gefahrenkreise:', GK);



    right.innerHTML += make_checkgroup('Wassertiefe:', [['flach','Flachwasser'],['tief','Tiefwasser']]);

    make_slidergroup('Entfernungsbereich:', right, 3000,15000);

    let Enter_Button = document.createElement('div')
    Enter_Button.id = 'numpad_Enter';
    Enter_Button.className = 'numpad_button';


    Enter_Button.innerHTML = '<img alt="Enter Button" src="data/pictures/icons/numpad/enter.svg" ' +
        'style="max-width: 40%; max-height: 40%; " />';
    Enter_Button.style.height = '3em';
    Enter_Button.style.backgroundColor = "var(--selected-blue)";
    Enter_Button.style.width = '100%';

    right.appendChild(Enter_Button);

    start_numPad();






}

function show_LI_Trainer_task(){
    let title = 'Merken Sie sich die Werte des Sehrohrblickes und bestimmen Sie anschließend das Lookintervall.';
    let GK = LI_preset[0];
    let Depth  = LI_preset[1];
    let min_Range = parseInt(LI_preset[2][0]);
    let max_Range = LI_preset[2][1] * -1;
    let Range = [];
    let j = 0
    for (let i = min_Range; i <= max_Range; i = i + 500) {
        Range[j] = i;
        j = j+1;
    }

    GK = GK[rand_Int(0,GK.length-1)];
    Depth = Depth[rand_Int(0,Depth.length-1)];
    Range = Range[rand_Int(0,Range.length-1)];

    let LI_sek = (Range/GK)*60;
    let isFlachwasser;
    let Wassertiefe;
    if (Depth === 'flach'){
        isFlachwasser = true;
    }

    if (isFlachwasser) {
        Wassertiefe = 24;
        LI_sek = LI_sek - 120;
    }
    else{
        Wassertiefe = 100;
        LI_sek = LI_sek - 60;
    }

    let values = [];
    values [0] = ['Entfernung',' $\\mathrm{R_m}$', Range, 'yds'];
    values [1] = ['Wassertiefe','', Wassertiefe, 'm'];
    values [2] = ['Gefahrenkreis',' $\\mathrm{GK}$', GK, 'yds'];

    //make_basic_table_exercise(
    //    title,
    //    values,
    //    true,
    //    'm:s'
    //);

    taskrunning = true;
    const content = document.querySelector('content');
    content.innerHTML = '';
    make_title(title);
    make_leftright_flex();
    make_task(values);
    render_latex()

    let countdownfield = document.createElement('div');
    countdownfield.id = 'counter';
    countdownfield.style.fontSize = '120px';
    countdownfield.innerHTML = '5';
    document.getElementById('content_body_left').appendChild(countdownfield);

    countdown();






    ergebnis = [LI_sek, //Das exakte Ergebnis
        false, //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        'm:s', // Einheit des Ergebnisses
        0]; //Anzahl der Zeichen nach dem Komma in der Ergebnisanzeige

}

function show_wait_Number(number, ms = 1000){
    const Counter = document.getElementById('counter');//Wählt Div des Counter aus
    Counter.innerText = number;
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function countdown(start = 5, end = 0){
    console.log('countdown gestartet:')
    for (let i = start; i >= end; i--) {
        await show_wait_Number(i);
    }
    document.querySelector('table').style.visibility = 'hidden';
    document.getElementById('counter').innerText = '';
    make_numpad(
        true,
        'm:s',
        false
    );
    start_numPad();
    //Anschlussfunktion
}