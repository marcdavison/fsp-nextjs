export function Button({ children, textOnly, cssClass, ...otherProps }) {
  const cssValue = textOnly ? `text-button ${cssClass}` : `button ${cssClass}`
  return <button className={cssValue} { ...otherProps }>{children}</button>
}