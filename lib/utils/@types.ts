import { Toast } from "..";

export namespace TypeToast {

    export type PropsIcon = {
        size: number
        color: string
    }

    export type IconOption = (props: PropsIcon) => JSX.Element

    type TypeTheme = 'light' | 'dark';

    export type Options = {
        duration?: Toast.Duration
        position?: Toast.Position
        theme?: TypeTheme
        Icon?: IconOption
    }

    export type DefaultOptions = {
        duration?: Toast.Duration
        position: Toast.Position
        theme: TypeTheme
        Icon?: IconOption
    }

    export type ParamsStyleSheet = {
        index: number
        theme: TypeTheme
        position: Toast.Position
    }
}


