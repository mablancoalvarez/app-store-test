export const filterProducts = (products, inputValue, fields) => {
    const lowerCaseInputValue = inputValue.toLowerCase();
    return products.filter((product) => {
        return fields.some((field) => {
            const fieldValue = product[field];
            if (typeof fieldValue === 'string') {
                return fieldValue.toLowerCase().includes(lowerCaseInputValue);
            }
            if (typeof fieldValue === 'number') {
                return fieldValue.toString().includes(lowerCaseInputValue);
            }
            return false;
        });
    });
};