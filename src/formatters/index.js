import stylish from './stylish.js'
import plain from './plain.js'

const getFormat = (data, format) => {
    switch (format) {
        case 'stylish':
            return stylish(data);
        case 'plain':
            return plain(data);
        case 'json':
            return JSON.stringify(data, ' ', 2);
        default:
            return null
    }
}

export default getFormat