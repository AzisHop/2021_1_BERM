import {View} from './view.js';
import {Validator} from './validator.js';
import eventBus from '../modules/eventBus.js';
import {
    GET_USER_DATA,
    NO_SET_UP,
    SEND_USER_DATA,
    SETTING_SUBMIT,
} from '../modules/utils/actions.js';

import settingsTemplate from '@/templates/settings.pug';

/** Контроллер регистрации клиента */
export class SettingsView extends View {
    /**
     * Отображение страницы и получение с нее данных
     *
     * @param {boolean} isAuthorized - авторизирован пользователь или нет
     * @param {boolean} isExecutor - это исполнитель или нет
     */
    render(isAuthorized, isExecutor) {
        super.setListeners([
            [GET_USER_DATA, this._renderData],
            [NO_SET_UP, this._onNoSetUp],
        ]);
        eventBus.emit(SEND_USER_DATA);
    }

    /**
     * Отображения данных пользователя
     *
     * @param {Object} info - объект с информацией пользователя
     */
    _renderData(info) {
        super.renderHtml(
            info.isAuthorized,
            info.isExecutor,
            'Настройки',
            settingsTemplate(info),
        );

        const val = new Validator('feedback', '.form-control', 'send_mess');
        val.validate();

        const form = document.getElementById('feedback');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const data = {
                name_surname: event.target.nameSurname.value,
                password: event.target.password.value,
                login: event.target.login.value,
                about: event.target.about.value,
            };

            eventBus.emit(SETTING_SUBMIT, data);
        });
    }

    /**
     * Обработка в случае провала
     */
    _onNoSetUp() {
        // ToDo настройки не удалось сохранить
        console.log('настройки не удалось сохранить');
    }
}

