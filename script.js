document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetScreen = false;

    // Update display
    function updateDisplay() {
        display.textContent = currentInput;
    }

    // Handle number input
    function inputNumber(number) {
        if (currentInput === '0' || resetScreen) {
            currentInput = number;
            resetScreen = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    // Handle decimal point
    function inputDecimal() {
        if (resetScreen) {
            currentInput = '0.';
            resetScreen = false;
            updateDisplay();
            return;
        }
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
        }
    }

    // Handle operations
    function handleOperation(op) {
        if (operation !== null) calculate();
        previousInput = currentInput;
        operation = op;
        resetScreen = true;
    }

    // Calculate result
    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        if (isNaN(prev)) return;
        
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert("Cannot divide by zero!");
                    clearAll();
                    return;
                }
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }
        
        currentInput = result.toString();
        operation = null;
        updateDisplay();
    }

    // Clear all
    function clearAll() {
        currentInput = '0';
        previousInput = '';
        operation = null;
        updateDisplay();
    }

    // Backspace function
    function backspace() {
        if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
            currentInput = '0';
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    }

    // Percentage function
    function percentage() {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay();
    }

    // Handle button clicks
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.id;
            
            if (id === 'clear') {
                clearAll();
                return;
            }
            
            if (id === 'backspace') {
                backspace();
                return;
            }
            
            if (id === 'percentage') {
                percentage();
                return;
            }
            
            if (id === 'equals') {
                calculate();
                return;
            }
            
            if (id === 'decimal') {
                inputDecimal();
                return;
            }
            
            if (button.classList.contains('number')) {
                inputNumber(button.textContent);
                return;
            }
            
            if (button.classList.contains('operator')) {
                handleOperation(button.textContent);
                return;
            }
        });
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9') {
            inputNumber(e.key);
        } else if (e.key === '.') {
            inputDecimal();
        } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            handleOperation(e.key);
        } else if (e.key === '%') {
            percentage();
        } else if (e.key === 'Enter' || e.key === '=') {
            calculate();
        } else if (e.key === 'Escape') {
            clearAll();
        } else if (e.key === 'Backspace') {
            backspace();
        }
    });

    // Initialize display
    updateDisplay();
});