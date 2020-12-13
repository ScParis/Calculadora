function insere(num){
    document.calc.visor.value = document.calc.visor.value + num;
}

function apaga(){
    var visor = document.calc.visor.value;
    document.calc.visor.value = visor.substring(0, visor.length-1);
}

function excluir(){
    document.calc.visor.value = '';
}

function calcula(){
    var exp = document.calc.visor.value;
    if(exp){
        document.calc.visor.value = eval(exp);
    }
}