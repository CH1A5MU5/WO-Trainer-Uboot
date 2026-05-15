

//document.addEventListener(' ', function () {
function start_numPad(){
    const allNumPadButtons = Array.from(document.querySelectorAll('.numpad_button'));

    allNumPadButtons.forEach(btn => {
        btn.addEventListener('mousedown', function () {
            console.log(btn.innerHTML + 'button unten');
            numpad_down(btn);



        });

        });

    allNumPadButtons.forEach(btn => {
        btn.addEventListener('mouseup', function () {
            console.log(btn.innerHTML + 'button unten');
            numpad_up(btn);



        });

    });






//document.addEventListener('change', function () {
  //  const allNumPadButtons = Array.from(document.querySelectorAll('.numpad_button'));



}
function numpad_down(btn) {

    btn.classList.add('down');
}


function numpad_up(btn) {
    btn.classList.remove('down');
    let display = document.getElementById('numpad_value');
    let btn_value = btn.id.slice(7);

    if (taskrunning) {
        if (btn_value === 'Enter') {
            if (ergebnis[0][0] === 'MC'){
                check_MC_result();
            }
            else if (ergebnis[2] === 'C-X-C'){
                check_kardinal_result();
            }
            else{
                check_result();
            }

        } else if (btn_value === 'Backspace') {
            display.innerHTML = display.innerHTML.slice(0, -1);
        } else {
            display.innerText += btn_value;
        }
    }
    else
        if (btn_value === 'Enter') {
            new_task();
        }




}

onkeydown = function(e) {
    e.stopPropagation();
    let btn = document.getElementById('numpad_'+e.key);
    numpad_down(btn);
}


onkeyup = function(e) {
    e.stopPropagation();
    console.log(e.key);
    let upperkey = e.key.toUpperCase();
    let btn = document.getElementById('numpad_'+e.key);
   let deciamlactive = document.getElementById('numpad_.');
   if(deciamlactive && (e.key === ',' || e.key === '.')){
       numpad_up(deciamlactive);
   }
   let minsecactive = document.getElementById('numpad_:');
    if(minsecactive && (e.key === ',' || e.key === '.' || e.key === ':')){
        numpad_up(minsecactive);
    }
    let minusactive = document.getElementById('numpad_-');
    if(minusactive && (e.key === '-' )){
        numpad_up(minusactive);
    }
    let kardinalactive = document.getElementById('numpad_N');
    if (kardinalactive){
        if(upperkey !== 'BACKSPACE' && upperkey !== 'ENTER'){
            btn = document.getElementById('numpad_'+upperkey);
            switch(upperkey){
                case 'N': numpad_up(btn); break
                case 'S': numpad_up(btn); break
                case 'O': numpad_up(btn); break
                case 'W': numpad_up(btn); break
            }
        }

    }



    switch(e.key){
       case 'Enter': numpad_up(btn); break
       case 'Backspace': numpad_up(btn); break
       case '0': numpad_up(btn); break
       case '1': numpad_up(btn); break
       case '2': numpad_up(btn); break
       case '3': numpad_up(btn); break
       case '4': numpad_up(btn); break
       case '5': numpad_up(btn); break
       case '6': numpad_up(btn); break
       case '7': numpad_up(btn); break
       case '8': numpad_up(btn); break
       case '9': numpad_up(btn); break
       default: break;

   }

    // alert(e.key);
}

