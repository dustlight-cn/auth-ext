/**
 * 消息总线（观察者模式）
 */
export class AuthEventBus {

    listeners

    constructor() {
        this.listeners = new Map()
    }

    on(event, listener) {
        if (this.listeners == null)
            this.listeners = new Map();
        if (!this.listeners.has(event) || !this.listeners.get(event))
            this.listeners.set(event, new Set());
        let listeners = this.listeners.get(event);
        listeners.add(listener);
    }

    emit(event, ...args) {
        if (this.listeners.has(event)) {
            let listeners = this.listeners.get(event);
            if (listeners != null) {
                listeners.forEach(listener => {
                    if (!listener)
                        return;
                    listener(...args)
                })
            }
        }
    }
}

export default new AuthEventBus()