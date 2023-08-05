/* eslint-disable */
import type { Component, ComponentProps, JSX } from 'solid-js'

type Dict = Record<string, unknown>

type ElementType<P = any> = keyof JSX.IntrinsicElements | Component<P>

export type StyledComponent<T extends ElementType> = {
    (args: { raw: readonly string[] | ArrayLike<string> }): (props: ComponentProps<T>) => JSX.Element
    displayName?: string
}

interface JsxFactory {
    <T extends ElementType>(component: T): StyledComponent<T>
}

type JsxElements = { [K in keyof JSX.IntrinsicElements]: StyledComponent<K> }

export type Styled = JsxFactory & JsxElements

export type HTMLStyledProps<T extends ElementType> = ComponentProps<T>