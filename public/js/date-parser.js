
const dateParser = {
    month: (dateObject) => {
        dateObject.getMonth()
    },
    date: (dateObject) => {
        dateObject.getDate()
    },
    year: (dateObject) => {
        dateObject.getFullYear()
    }
}

model.exports = dateParser
