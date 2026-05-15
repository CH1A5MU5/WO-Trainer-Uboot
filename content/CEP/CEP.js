function show_CEP(){
    let title = 'CEP Trainer';
    let cont = 'Wählen Sie links einen Simulationstypen aus ' +
        ' und üben Sie den Lagebildaufbau mit dem CEP. Im Basis Trainer bestimmen Sie selber, wie sich der Gegner' +
        'verhält. Im Elite Trainer macht dies der Computer für Sie.';
    make_submenu(title, cont);
}

function show_CEP_BAS(){
    CEP_simulation_running = true;


    clean_content();
    make_topdown_flex();
    create_ui();
    render_latex();



    add_CEP_buttons();

    generateDemoData();
    update_CEP();



    //make_CEP();
    //make_CEP_UI();

}