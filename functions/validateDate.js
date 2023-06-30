const moment = require('moment');

const validateAndParseDate = (date) => {
    const validFormats = ['YYYY-MM-DD', 'MM-DD-YYYY', 'DD-MM-YYYY'];

    for (const format of validFormats) {
        const parseDate = moment(date, format, true);
        if (parseDate.isValid()) {
            return parseDate.format('YYYY-MM-DD');
        }
    }
    return null;
};

module.exports = { validateAndParseDate };