function generateRandomText() {
  const words = [
    'lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'sed',
    'do',
    'eiusmod',
    'tempor',
    'incididunt',
    'ut',
    'labore',
    'et',
    'dolore',
    'magna',
    'aliqua',
  ]

  let randomText = ''

  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * words.length)
    randomText += words[randomIndex] + ' '
  }

  return randomText.trim()
}

export function textArrayGenerator(count: number) {
  const texts = []
  for (let i = 0; i < count; i++) {
    const randomText = generateRandomText()
    texts.push(randomText)
  }
  return texts
}
