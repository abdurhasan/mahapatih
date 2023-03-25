"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneNumberFormatter = void 0;
function phoneNumberFormatter(number) {
    let formatted = number.replace(/\D/g, '');
    if (formatted.startsWith('0')) {
        formatted = '62' + formatted.substr(1);
    }
    if (!formatted.endsWith('@c.us')) {
        formatted += '@c.us';
    }
    return formatted;
}
exports.phoneNumberFormatter = phoneNumberFormatter;
//# sourceMappingURL=index.js.map