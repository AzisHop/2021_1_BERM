import {getTemplate} from './templatesForSelect.js'
import {listOfServices} from './templatesForSelect.js'
class Select {
    constructor(selector, options, idSelector) {
        this.$el = document.querySelector(selector);
        this.options = options;
        this.selectedId = options.selectedId;
        this.$idSelectorDoc = null;
        this.idSelector = idSelector;

        this.render()
        this.setup()
    }

    render() {
        const {placeholder, data} = this.options;
        this.$el.classList.add('select');
        this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId, this.idSelector);
        this.$idSelectorDoc = document.getElementById(this.idSelector);
    }

    setup() {
        this.clickHandler = this.clickHandler.bind(this);
        this.$el.addEventListener('click', this.clickHandler);
        this.$arrow = this.$el.querySelector('[data-type="arrow"]');
        this.$value = this.$el.querySelector('[data-type="value"]');
        console.log('___________________________________')
        console.log(this.$value.textContent)
        console.log('___________________________________')

    }

    clickHandler(event) {
        const {type} = event.target.dataset;
        console.log(event.target.dataset);
        console.log(event.target.value);
        //
        // if (type !== undefined ) {
        //     console.log(type.type)
        // }

        if (type === 'input' || type === 'arrow') {
            this.toggle();
        } else if (type === 'item') {
            const id = event.target.dataset.id;
            this.select(id);
        } else if (type === 'backdrop') {
            this.close();
        }
    }

    get isOpen() {
        return this.$el.classList.contains('open');
    }

    get current() {
        return this.options.data.find((item) => item.id === this.selectedId);
    }

    select(id) {
        this.selectedId = id;
        this.$value.style.width = '0';
        this.$value.value = this.current.value;
        this.$value.style.width = this.$value.scrollWidth + 'px';

        this.$el.querySelectorAll('[data-type="item"]').forEach(el => {
            el.classList.remove('selected');
        })
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected');

        this.close();
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    // Icons/Arrow_down.svg
    open() {
        this.$idSelectorDoc.style.borderRadius = '8px 8px 0 0px';
        this.$el.classList.add('open');
        // this.$arrow.classList.remove('fa-chevron-down');
        // this.$arrow.classList.add('fa-chevron-up');
        this.$arrow.src = 'Icons/Arrow_up.svg'

    }

    close() {
        this.$idSelectorDoc.style.borderRadius = '8px';
        this.$el.classList.remove('open');
        // this.$arrow.classList.add('fa-chevron-down');
        // this.$arrow.classList.remove('fa-chevron-up');
        this.$arrow.src = 'Icons/Arrow_down.svg'
    }

    destroy() {
        this.$el.removeEventListener('click', this.clickHandler);
        this.$el.innerHTML = '';
    }
}


const bizarro = new Select('#select', {
    placeholder: 'Категория',
    // selectedId: '2',
    data: listOfServices,
}, 'dynamic-style');

let data = [
    {id: '1', value: 'Гей Стриптиз'},
    {id: '2', value: 'Фронтенд'},
    {id: '3', value: 'Бекенд'},
    {id: '4', value: 'Бизарро'},
    {id: '5', value: 'Зарф'},
    {id: '6', value: 'For Привет'}
];

// console.log(data[0].id);