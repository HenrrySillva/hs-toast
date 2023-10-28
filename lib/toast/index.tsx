import Sibling from 'react-native-root-siblings';
import uuid from 'react-native-uuid';
import { TypeToast } from '../utils/@types';
import { TIME_ANIMATION } from '../utils/@const';
import { ToastContainer } from './component';

export class Toast {

    private readonly id: string
    private _sibling: Sibling | null = null;
    private _message: string;
    private _options: TypeToast.DefaultOptions;
    private static _instances: Toast[] = [];

    private constructor(message: string, options?: TypeToast.Options) {
        this.id = uuid.v4() as string;
        this._message = message;
        this._options = {
            theme: 'dark',
            position: Toast.Position.BOTTOM,
            ...options
        } // default values
    }

    _show() {
        this._sibling = new Sibling(<ToastContainer
            options={this._options}
            message={this._message}
            index={Toast._instances.length + 1} />)
        return this;
    }

    hide() {
        if (!this._sibling)
            throw new Error('Cannot found toast visible!');
        this._sibling.destroy();
        Toast._instances = Toast._instances.filter(instance => instance.id !== this.id)

        // update others toasts
        Toast.update();
    }

    private static update() {
        this._instances.forEach((instance, index) =>
            instance._sibling?.update(<ToastContainer
                options={instance._options}
                message={instance._message}
                index={index + 1} />))
    }

    static show(message: string, options?: TypeToast.Options) {
        const toast = new Toast(message, options)
        this._instances.push(toast);
        toast._show();

        if (options?.duration)
            /** multiple of two because of animating in create and destroy */
            setTimeout(toast.hide.bind(toast), options.duration + (TIME_ANIMATION * 2))

        return toast;
    }

}

export namespace Toast {
    export enum Duration { LONG = 4500, MEDIUM = 3000, SHORT = 2000 }
    export enum Position { 'CENTER', 'TOP', 'BOTTOM' }
}
