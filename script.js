
//variavel de controler para saber onde eu estou
let currentStep = 0

//pegando todos os formulario que temos no html
const formSteps = document.querySelectorAll('.form-step')

const form = document.querySelector('form')


// Clique no próximo passo step
form.addEventListener('click', (e) => {
    //se não tiver data-action no evento do click, ele pode parar a a logica emediato.
    if (!e.target.matches('[data-action]')) {
        return
    }
    const actions = {
        next() {
            if (!isValidInput()) {
                // return
            }
            currentStep++
        },
        prev() {
            currentStep--
        }
    }

    const action = e.target.dataset.action
    actions[action]()

    updateActiveStep()
    updateProgressStep()
})

// Envio do formulario
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const data = new FormData(form)
    alert(`Obrigado ${data.get('name')}!`)
})

// update steps
function updateActiveStep() {
    formSteps.forEach(step => step.classList.remove('active'))
    formSteps[currentStep].classList.add('active')
}


const progressStep = document.querySelectorAll('.step-progress [data-step]')
function updateProgressStep() {
    progressStep.forEach((step, idx) => {
        step.classList.remove('active')
        step.classList.remove('done')

        if (idx < currentStep + 1) {
            step.classList.add('active')
        }

        if (idx < currentStep) {
            step.classList.add('done')
        }
    })

}


// validation
function isValidInput() {
    const currentFormStep = formSteps[currentStep]
    const formFields = [
        ...currentFormStep.querySelectorAll('input'),
        ...currentFormStep.querySelectorAll('textarea')
    ]
    return formFields.every((input) => input.reportValidity())
}



// Animation
formSteps.forEach(formStep => {
    function addHide() {
        formStep.classList.add('hide')
    }

    formStep.addEventListener('animationend', () => {
        addHide()
        formSteps[currentStep].classList.remove('hide')
    })
})

