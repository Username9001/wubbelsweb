export const useCounter = () => useState<number>('counter', () => 0)
export const useColor = () => useState<string>('color', () => 'pink')

// export const counter = useState('counter', () => Math.round(Math.random() * 1000))
// export const stackList = useState('stackList', () => ['All Projects'])

export const useStackList = () => useState<Array<string>>('stackList', () => ['All Projects'])
// export const addToStackList = () => useState<Array<string>>('stackList', () => ['All Projects'])