//HELPERS

function formatCurrency(amount : number) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return formatter.format(amount);
}

function formatDate(dateStr : string) {
    const dateObj = new Date(dateStr);

    const formatter = new Intl.DateTimeFormat('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return formatter.format(dateObj);
}

export {
    formatCurrency,
    formatDate
}