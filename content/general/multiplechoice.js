function make_multiple_choice_exercise(title,plots, path ){
    taskrunning = true;

    let choose = rand_Int(0, plots.length-1);

    ergebnis = [
        ['MC'],
        plots[choose]
    ];

    clean_content(); //from basictable.js
    make_title(title); //from basictable.js
    make_leftright_flex(); //from basictable.js
    show_plot(plots,path, choose)
    show_multiple_choice_answers(plots)
}

function show_plot(plots,path, choose){
    const left = document.getElementById('content_body_left');
    left.style.width = '50%';
    for (let i = 0; i < plots[choose].length; i++) {
        if (i === plots[choose].length-1) {
            path += plots[choose][i];
        }else{
            path += plots[choose][i] + '_';
        }
    }
    path += '.svg';

    left.innerHTML += '<img alt='+path+' class="basic_CEP" src=' +
        path +
        '/>';
}

function show_multiple_choice_answers(plots){
    const right = document.getElementById('content_body_right');

    if (plots[0].length === 5) {
        let radio1_header = 'Anlaufverhalten:';
        let radio1_items = [
            ['ANL', 'Anlaufend'],
            ['ABL', 'Ablaufend'],
            ['ANE', 'nicht eindeutig']];
        let radio2_header = 'Bug und Lage:';
        let radio2_items = [
            ['BL', 'Bug links'],
            ['BR', 'Bug rechts'],
            ['NE', 'nicht eindeutig']];
        let check1_header = 'CPA:'
        let check1_items = [
            ['TRUE', 'im CEP eindeutig sichtbar']
        ]

        right.innerHTML = '<div class="outerradio">';
        right.children[0].innerHTML += make_radiogroup(radio1_header, radio1_items);
        right.children[0].innerHTML += make_radiogroup(radio2_header, radio2_items);
        right.children[0].innerHTML += make_checkgroup(check1_header, check1_items);
    }
    else {
        let check1_header = 'Kursmanöver:';
        let check1_items = [
            ['ZDST','Zudrehen nach Stb'],
            ['ADST','Abdrehen nach Stb'],
            ['ZDBB','Zudrehen nach Bb'],
            ['ADBB','Abdrehen nach Bb']
        ]
        let radio1_header = 'Fahrtänderung:'
        let radio1_items = [
            ['FE', 'Fahrterhöhung'],
            ['FV', 'Fahrtverringerung'],
            ['NE', 'ZZ nur durch Fahrtänderung nicht erklärbar.']
        ]
        right.innerHTML = '<div class="outerradio">';
        right.children[0].innerHTML += make_checkgroup(check1_header, check1_items);
        right.children[0].innerHTML += make_radiogroup(radio1_header, radio1_items);
    }
    make_enterbutton(right);

}

function make_radiogroup(header, items){
    let radiogroup;

    radiogroup = '<div class="radiogroup"><strong>' +
        header +
        '</strong>';

    for (let i = 0; i<items.length; i++){
        radiogroup += '<div class="radiorow" ><input type="radio" value=' +
            items[i][0] + ' name=' + header + '> ' +
            '<div class="radio_text">'+ items[i][1]+ '</div>' + '</div>';
    }
    radiogroup += '</div>';
    return radiogroup;
}

function make_checkgroup(header, items){
    let checkgroup;

    checkgroup = '<div class="radiogroup"><strong>' +
        header +
        '</strong>';

    for (let i = 0; i<items.length; i++){
        checkgroup += '<div class="radiorow"><input type="checkbox" value=' +
            items[i][0] + ' name=' + header + '> ' +
            '<div class="radio_text">' + items[i][1] + '</div>'+ '</div>';
    }
    checkgroup += '</div>';
    return checkgroup
}

function make_slidergroup(header, container, min = 3000, max = 15000, step = 500){
    let slidergroup;
    container.innerHTML += '<div class="radiogroup"><strong>' +
        header +
        '</strong></div>';

    let minslider = document.createElement('input');
    minslider.setAttribute('type', 'range');
    minslider.className = 'radioslider';
    minslider.min = min.toString();
    minslider.max = max.toString();
    minslider.step = step.toString();
    minslider.value = (min+2*step).toString();
    minslider.name = header;


    let maxslider = document.createElement('input');
    maxslider.className = 'radioslider';
    maxslider.setAttribute('type', 'range');
    maxslider.min = (-1*max).toString();
    maxslider.max = (-1*min).toString();
    maxslider.step = step.toString();
    maxslider.value = (-1*max + 2*step).toString();
    maxslider.style.rotate = '180deg';
    maxslider.name = header;

    let row = document.createElement('div');
    row.className = 'radiorow';
    row.id = 'row1_slider';


    let row2 = document.createElement('div');
    row2.className = 'radiorow';
    row2.id = 'row2_slider';


    container.children[1].append(row, row2);

    let rowtext1 = document.createElement('div');
    rowtext1.className = 'radio_text';
    rowtext1.textContent = 'Min: 4000yds';
    rowtext1.style.width = '20%';
    rowtext1.style.overflow = 'hidden';
    let rowtext2 = document.createElement('div');
    rowtext2.className = 'radio_text';
    rowtext2.textContent = 'Max: 14000yds';
    rowtext2.style.width = '20%';
    rowtext2.style.overflow = 'hidden';

    container.children[1].children[1].append(rowtext1, minslider)
    container.children[1].children[2].append(rowtext2, maxslider);

    minslider.addEventListener('mousemove', function(e){
        e.stopPropagation();
        minadjust(e)
    })
    minslider.addEventListener('mouseup', function(e){
        e.stopPropagation();
        minadjust(e)
    })

    function minadjust(e){
        if (e.target.value > maxslider.value*-1){
            //e.target.value = maxslider.value*-1 - step;
            //e.value = maxslider.value*-1 - step;
            maxslider.value= e.target.value * -1;
        }
        rowtext1.textContent = 'Min: ' + e.target.value + 'yds';
        rowtext2.textContent = 'Mas: ' + maxslider.value*-1 + 'yds';
    }

    maxslider.addEventListener('mousemove', function(e){
        e.stopPropagation();
        maxadjust(e);

    })

    maxslider.addEventListener('mouseup', function(e){
        e.stopPropagation();
        maxadjust(e);

    })

    function maxadjust(e){
        if (e.target.value > minslider.value*-1){
            //e.target.value = maxslider.value*-1 - step;
            //e.value = maxslider.value*-1 - step;
            minslider.value= e.target.value * -1;
        }
        rowtext1.textContent = 'Min: ' + minslider.value + 'yds';
        rowtext2.textContent = 'Max: ' + e.target.value*-1 + 'yds';
    }






}

function make_enterbutton(side){
    side.children[0].innerHTML += '<div class="numpad_button" id="numpad_Enter">1</div>';
    let Enter_Button = document.getElementById('numpad_Enter');
    Enter_Button.innerHTML = '<img alt="Enter Button" src="data/pictures/icons/numpad/enter.svg" ' +
        'style="max-width: 40%; max-height: 40%; " />';
    Enter_Button.style.height = '3em';
    Enter_Button.style.backgroundColor = "var(--selected-blue)";
    Enter_Button.style.width = '100%';
    start_numPad();
}

function add_mc_ZZcheck(){
    let radio1_header = 'Gegnermanöver:';
    let radio1_items = [
        ['NOMA', 'Kurvenverhalten durch Eigenmanöver erklärbar.'],
        ['MANO', 'Fahrzeug muss manövriert haben.'],
    ];

    const outerradio = document.getElementById('content_body_right').children[0];

    let ZZcheck = make_radiogroup(radio1_header, radio1_items);
    outerradio.innerHTML = ZZcheck + outerradio.innerHTML;

    disable_radio(outerradio);

    let ZZchecker = document.getElementsByName(radio1_header)
    ZZchecker.forEach(radio => {
        radio.addEventListener('click', (e) => {
            e.stopPropagation();
            if (radio.value === 'NOMA'){
                disable_radio(outerradio);
            }
            else{
                enable_radio(outerradio);
            }

        })
    })
    start_numPad();
}

function disable_radio(outerradio){
    let radiogroups = outerradio.children;

    for (let i = 1; i<radiogroups.length-1; i++){
        radiogroups[i].style.backgroundColor = "var(--unselected-grey)";
        for (let j = 1; j<radiogroups[i].children.length ; j++){
            let radiobutton = radiogroups[i].children[j].children[0];
            radiobutton.disabled = true;
            radiobutton.checked = false;
        }
    }
}

function enable_radio(outerradio, ){
    let radiogroups = outerradio.children;

    for (let i = 1; i<radiogroups.length-1; i++){
        radiogroups[i].style.backgroundColor = "white";
        for (let j = 1; j<radiogroups[i].children.length ; j++){
            let radiobutton = radiogroups[i].children[j].children[0];
            radiobutton.disabled = false;
        }
    }
}

function color_radio(color, radio){
    radio.style.accentColor = color;
    let text = radio.nextElementSibling;
    text.style.backgroundColor = color;
    text.style.boxShadow = '2px 2px 2px rgba(255, 255, 255,0) inset,' +
        '            -2px -2px 2px rgba(255, 255, 255, 0) inset';
    text.style.color = 'white';
}

function check_radio(radiobutton){
    let stat = 'uncorrect_and_unchecked'
    for (let i = 0; i < ergebnis[1].length; i++){
        if (radiobutton.value === ergebnis[1][i] && radiobutton.checked) {
            stat = 'correct_and_checked';
        }
        else if (radiobutton.value === ergebnis[1][i] && !radiobutton.checked) {
            stat = 'correct_and_unchecked'
        }
    }
    if (stat === 'uncorrect_and_unchecked' && radiobutton.checked){
        stat = 'uncorrect_and_checked';
    }


    return stat;
}

function correct_radio(){
    let radiogroups = document.getElementById('content_body_right').children[0].children;
    let radiobuttons;

    for (let i = 0; i<radiogroups.length -1; i++){
        radiobuttons = radiogroups[i].querySelectorAll('input');
        let group_correct = true;
        for (let j = 0; j<radiobuttons.length ; j++){
            // Prüfung in vier Kategorien:
            // correct_and_checked
            // correct_and_unchecked
            // uncorrect_and_checked
            // uncorrect_and_unchecked
            let stat = check_radio(radiobuttons[j]);
            if (stat === 'correct_and_checked'){
                color_radio('var(--alertgreen)', radiobuttons[j]);
            }
            else if (stat === 'correct_and_unchecked'){
                color_radio('var(--alertgreen)', radiobuttons[j]);
                group_correct = false;
            }
            else if (stat === 'uncorrect_and_checked'){
                color_radio('var(--alertred)', radiobuttons[j]);
                group_correct = false;
            }
        }
        if (group_correct){
            radiogroups[i].style.backgroundColor = 'var(--alertgreentrans)';
        }
        else {
            radiogroups[i].style.backgroundColor = 'var(--alertredtrans)';
        }
    }
}



function check_MC_result(){
    //color_checked_radio();
    //color_correct_radio();
    let input = document.querySelectorAll('input');
    if (ergebnis[1][0] === 'OWNMANCEP'){
        if (ergebnis[1][2] === 'NOMA'){
            let MANOinput;
            let NOMAinput;
            for (let i = 0; i < input.length; i++){
                if (input[i].value === 'NOMA'){
                    NOMAinput = input[i];
                }
                else if (input[i].value === 'MANO'){
                    MANOinput = input[i];
                }
            }
            if (NOMAinput.checked){
                color_radio('var(--alertgreen)', NOMAinput);
                NOMAinput.parentElement.parentElement.style.backgroundColor = 'var(--alertgreentrans)';
            }
            else if (MANOinput.checked){
                color_radio('var(--alertgreen)', NOMAinput);
                color_radio('var(--alertred)', MANOinput);
                NOMAinput.parentElement.parentElement.style.backgroundColor = 'var(--alertredtrans)';
            }
            else{
                color_radio('var(--alertgreen)', NOMAinput);
                NOMAinput.parentElement.parentElement.style.backgroundColor = 'var(--alertredtrans)';
            }
        }
        else{
            ergebnis[1].push('MANO');
            correct_radio();
        }
    }
    else{
        correct_radio();
    }

    for (let i=0; i<input.length; i++){
        input[i].disabled = true;
    }

    taskrunning = false;

    const left = document.getElementById('content_body_left');
    left.innerHTML = '<div> Drücken Sie Enter für eine neue Aufgabe.</div>'+left.innerHTML;


}