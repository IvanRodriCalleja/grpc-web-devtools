import { createElement, forwardRef } from 'react'
import { css, cx } from '../css/index.mjs';

function createStyledFn(Dynamic) {
  return function styledFn(template) {
    const baseClassName = css(template)
    const StyledComponent = forwardRef(function StyledComponent(props, ref) {
        const { as: Element = Dynamic, ...elementProps } = props
        const classes = () => cx(baseClassName, elementProps.className)
    
        return createElement(Element, {
            ref,
            ...elementProps,
            className: classes(),
        })
    })
    
    StyledComponent.displayName = `styled.${Dynamic}`
    return StyledComponent
  }
}

function createJsxFactory() {
  const cache = new Map()

  return new Proxy(createStyledFn, {
    apply(_, __, args) {
      return createStyledFn(...args)
    },
    get(_, el) {
      if (!cache.has(el)) {
        cache.set(el, createStyledFn(el))
      }
      return cache.get(el)
    },
  })
}

export const styled = createJsxFactory()
