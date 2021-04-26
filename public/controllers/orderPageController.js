import {Controller} from './controller.js';
import {OrderPageView} from '@/views/orderPageView';

import auth from '@/models/Auth.js';
import order from '@/models/Order.js';
import user from '@/models/User.js';
import {
    ORDER_PAGE_GET_RES,
    ORDER_PAGE_RES,
    ORDER_PAGE_RENDER,
    ORDER_DELETE_RATE,
    ORDER_SET_RATE,
    ORDER_GET_RATE,
    ORDER_GET,
    ORDER_CHANGE_RATE,
    ORDER_SET_EXECUTOR,
    ORDER_GET_EXECUTOR,
    ORDER_ERROR_SET,
    ORDER_DELETE_EXECUTOR,
    ORDER_GET_DELETE_EXECUTOR, ORDER_ERROR_DELETE_EX,
} from '@/modules/utils/actions';
import eventBus from '@/modules/eventBus.js';
import router from '@/modules/router.js';
import {getNotFoundPath} from '@/modules/utils/goPath.js';

/** Контроллер страницы заказа */
export class OrderPageController extends Controller {
    /**
     * Конструктор
     */
    constructor() {
        super();
        this.view = new OrderPageView();
    }

    /**
     * Запуск контроллера регистрации клиента
     *
     * @param {number} id - id из url, если он там был
     */
    run(id) {
        order.currentOrderId = Number(id);

        super.run(
            [
                [ORDER_PAGE_GET_RES, this._orderPageGetRes.bind(this)],
                [ORDER_PAGE_RES, this._orderPageSetResponses.bind(this)],
                [ORDER_SET_RATE, this._orderSetRate.bind(this)],
                [ORDER_GET_RATE, this._orderGetRate.bind(this)],
                [ORDER_DELETE_RATE, this._orderDeleteRate.bind(this)],
                [ORDER_CHANGE_RATE, this._orderChangeRate.bind(this)],
                [ORDER_GET, this._orderGet.bind(this)],
                [ORDER_SET_EXECUTOR, this._setExecutor.bind(this)],
                [ORDER_GET_EXECUTOR, this._getExecutor.bind(this)],
                [ORDER_DELETE_EXECUTOR, this._deleteExecutor.bind(this)],
                [ORDER_GET_DELETE_EXECUTOR, this._getDeleteExecutor.bind(this)],
            ],
            true);
    }

    /**
     * Определяем недостающие данные и делаем запрос
     */
    _orderPageGetRes() {
        if (order.getOrderById(order.currentOrderId)) {
            auth.getResponsesOrder(order.currentOrderId);
        } else {
            auth.getOrder(order.currentOrderId);
        }
    }

    /**
     * Получаем данные заказа и делаем запрос на отклики
     *
     * @param {Response} res - результат запроса на заказ
     */
    _orderGet(res) {
        if (res.ok) {
            res.json().then((res) => {
                order.setOrders([res]);
                auth.getResponsesOrder(order.currentOrderId);
            });
        } else {
            router.go(getNotFoundPath);
        }
    }

    /**
     * Получаем данные откликов
     *
     * @param {Response} res - результат запроса на заказ
     */
    _orderPageSetResponses(res) {
        const go = this.go;
        if (res.ok) {
            res.json().then((res) => {
                order.setResponses(order.currentOrderId, res);

                go();
            });
        } else {
            console.log('Запрос /order/id/responses - не сработал');
            // ToDo Обработка ошибки запроса
        }
    }

    /**
     * Устанавливаем новую ставку.
     *
     * @param {number} rate - ставка заказа
     */
    _orderSetRate({rate}) {
        const date = new Date();
        auth.setResponse({
            user_id: user.id,
            rate: rate,
            time: date.getTime(),
        }, order.currentOrderId);
    }

    /**
     * Устанавливаем новую ставку.
     *
     * @param {Response} res - результат запроса на установление ставки
     */
    _orderGetRate(res) {
        const go = this.go;
        if (res.ok) {
            res.json().then((res) => {
                order.push(order.currentOrderId, res);

                go();
            });
        } else {
            console.log('Запрос не сработал');
            // ToDo Обработка ошибки запроса
        }
    }

    /**
     * Отправляем данные view для отрисовки
     */
    go() {
        const creator = order.getOrderById(order.currentOrderId);

        let isMy = true;
        if (creator.customerId !== user.id) {
            isMy = false;
        }
        eventBus.emit(ORDER_PAGE_RENDER, {
            isMy: isMy,
            isAuthorized: user.isAuthorized,
            isExecutor: user.isExecutor,
            responses: creator.responses,
            creator: {
                customerId: creator.customerId,
                avatar: creator.avatar,
                title: creator.name,
                name: creator.login,
                category: creator.category,
                definition: creator.definition,
                date: creator.date,
                budget: creator.budget,
            },
            minResponse: order.findMin(order.currentOrderId),
            userRate: order.findRate(order.currentOrderId, user.id),
            selectExecutor: order.getSelectResponse(
                order.currentOrderId,
                order.ordersMap.get(order.currentOrderId).selectExecutor),
        });
    }

    /**
     * Запрос на удаление ставки
     */
    _orderDeleteRate() {
        order.deleteResponse(order.currentOrderId, user.id);

        auth.deleteRate(order.currentOrderId)
            .catch(() => {
                console.log('Ошибка удаления');
            });

        this.go();
    }

    /**
     * Устанавливаем новую ставку.
     *
     * @param {number} rate - ставка заказа
     */
    _orderChangeRate({rate}) {
        order.deleteResponse(order.currentOrderId, user.id);

        const date = new Date();
        auth.changeResponse({
            user_id: user.id,
            rate: rate,
            time: date.getTime(),
        }, order.currentOrderId);
    }

    /**
     * Выбираем исполнителя.
     *
     * @param {number} id - ставка заказа
     */
    _setExecutor(id) {
        this.selectExecutorId = id;
        auth.setOrderExecutor(order.currentOrderId, {executor_id: id});
    }

    /**
     * Получаем ответ на запрос о установке исполнителя
     *
     * @param {number} res - результат запроса на выбор исполнителя
     */
    _getExecutor(res) {
        if (res.ok) {
            order.ordersMap
                .get(order.currentOrderId)
                .selectExecutor = this.selectExecutorId;
            this.go();
        } else {
            eventBus.emit(ORDER_ERROR_SET);
        }
    }

    /**
     * Отменяем ислонителя
     */
    _deleteExecutor() {
        auth.deleteOrderExecutor(order.currentOrderId);
    }

    /**
     * Получаем ответ на запрос о отмене исполнителя
     *
     * @param {number} res - результат запроса на отмену исполнителя
     */
    _getDeleteExecutor(res) {
        if (res.ok) {
            order.ordersMap.get(order.currentOrderId).selectExecutor = null;
            this.go();
        } else {
            eventBus.emit(ORDER_ERROR_DELETE_EX);
        }
    }
}
