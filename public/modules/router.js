/** Роутер, который осуществляет переход между страницами приложения */
class Router {
    /**
     * Конструктор
     */
    constructor() {
        this.states = {};
    }

    /**
     * Обработка результата
     *
     * @param {string} path - название страницы
     * @param {Controller} controller - контроллер данной страницы
     */
    register(path, controller) {
        this.states[path] = {
            controller: controller,
        };
    }

    /**
     * Установка слушателей на событие перехода по различным событиям
     */
    setUp() {
        // Навешиваем обработчик на клики
        const body = document.getElementsByTagName('body')[0];
        body.addEventListener('click', (event) => {
            // ToDo: Сделать через instanceof
            if ((event.target.localName === 'a' ||
                event.target.localName === 'img') &&
                event.target.href !== '') {
                event.preventDefault();
                this.go(event.target.getAttribute('href'));
            }
        });

        addEventListener('popstate', () => {
            this.start();
        }, false);

        // ToDo(Алексей Егоров): Здесь
        //  идет загрузка страницы по path при перезагрузке.
        //  Нужно обрабатывать текущий pathname. (Пока костыль)
        this.startPath = 'main-page';
    }

    /**
     * Обработка перехода на данную страницу
     *
     * @param {string} path - название страницы
     */
    go(path) {
        history.pushState(
            {page: path},
            '',
            '/' + path,
        );

        this.start();
    }

    /**
     * Осуществление перехода на страницу
     */
    start() {
        let currentState = history.state;

        if (!currentState) {
            currentState = {
                page: this.startPath,
            };
        }

        const controller = this.states[currentState.page].controller;

        if (this.currentController) {
            this.currentController.offAll();
        }

        this.currentController = new controller();
        this.currentController.run();
    }
}

export default new Router();
