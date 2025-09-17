// Global CSS module declaration for this package and consumers
// Allows: import styles from './path/styles.css'

declare module '*.css' {
  const content: string;
  export default content;
}
