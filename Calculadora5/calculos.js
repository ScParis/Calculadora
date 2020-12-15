class Calculator {
  constructor(salvaNumeroTextElement, digitaNumeroTextElement) {
    this.salvaNumeroTextElement = salvaNumeroTextElement
    this.digitaNumeroTextElement = digitaNumeroTextElement
    this.clear()
  }

  clear() {
    this.digitaNumero = ''
    this.salvaNumero = ''
    this.operacao = undefined
  }

  deleta() {
    this.digitaNumero = this.digitaNumero.toString().slice(0, -1)
  }

  appendNumber(numero) {
    if (numero === '.' && this.digitaNumero.includes('.')) return
    this.digitaNumero = this.digitaNumero.toString() + numero.toString()
  }

  chooseOperation(operacao) {
    if (this.digitaNumero === '') return
    if (this.salvaNumero !== '') {
      this.compute()
    }
    this.operacao = operacao
    this.salvaNumero = this.digitaNumero
    this.digitaNumero = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.salvaNumero)
    const current = parseFloat(this.digitaNumero)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operacao) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case 'X':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.digitaNumero = computation
    this.operacao = undefined
    this.salvaNumero = ''
  }

  getDisplayNumber(numero) {
    const stringNumber = numero.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('pt-br', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.digitaNumeroTextElement.innerText =
      this.getDisplayNumber(this.digitaNumero)
    if (this.operacao != null) {
      this.salvaNumeroTextElement.innerText =
        `${this.getDisplayNumber(this.salvaNumero)} ${this.operacao}`
    } else {
      this.salvaNumeroTextElement.innerText = ''
    }
  }
}


const numeroButtons = document.querySelectorAll('[botao-numero]')
const operacaoButtons = document.querySelectorAll('[botao-operacao]')
const resultadoButton = document.querySelector('[botao-resultado]')
const deletaButton = document.querySelector('[botao-deleta]')
const limpaTudoButton = document.querySelector('[botao-limpa-tudo    ]')
const salvaNumeroTextElement = document.querySelector('[visor-salva-numero]')
const digitaNumeroTextElement = document.querySelector('[visor-digita-numero]')

const calculator = new Calculator(salvaNumeroTextElement, digitaNumeroTextElement)

numeroButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operacaoButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

resultadoButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

limpaTudoButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deletaButton.addEventListener('click', button => {
  calculator.deleta()
  calculator.updateDisplay()
})