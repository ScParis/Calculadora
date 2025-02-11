class Calculator {
  constructor(visorTextElement, historicoTextElement) {
    this.visorTextElement = visorTextElement;
    this.historicoTextElement = historicoTextElement; // Elemento do histórico
    this.history = []; // Array para armazenar o histórico
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    this.history = []; // Limpa o histórico
    this.updateDisplay();
  }

  deleta() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    this.updateDisplay();
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute(); // Calcula se já houver um operando anterior
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    // NÃO atualiza o display aqui.
  }


  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;
      default:
        return;
    }

      // Adiciona a operação ao histórico
      this.addToHistory(`${this.previousOperand} ${this.operation} ${this.currentOperand} = ${computation}`);

    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previousOperand = '';
    this.updateDisplay();
  }

    addToHistory(entry) {
        this.history.push(entry);
        if (this.history.length > 3) {
            this.history.shift(); // Remove o item mais antigo se tiver mais de 3
        }
    }


  updateDisplay() {
    this.visorTextElement.textContent = this.currentOperand || this.previousOperand || '0';
    // Atualiza o histórico
    this.historicoTextElement.innerHTML = this.history.join('<br>');
  }
}

// Seleciona os elementos do visor e do histórico
const visorTextElement = document.querySelector('.visor');
const historicoTextElement = document.querySelector('.historico'); // Elemento do histórico
const calculator = new Calculator(visorTextElement, historicoTextElement); // Passa o elemento do histórico

// Event delegation para os botões
document.addEventListener('click', (event) => {
  const target = event.target;

  if (target.matches('[data-numero]')) {
    calculator.appendNumber(target.textContent);
  } else if (target.matches('[data-operacao]')) {
    calculator.chooseOperation(target.textContent);
  } else if (target.matches('[data-resultado]')) {
    calculator.compute();
  } else if (target.matches('[data-limpa-tudo]')) {
    calculator.clear();
  } else if (target.matches('[data-deleta]')) {
    calculator.deleta();
  }
});