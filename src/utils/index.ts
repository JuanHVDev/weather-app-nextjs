export const getDateDay = (date: string): string => {
    const newDate = new Date(date).toLocaleString("es-MX", {
        weekday: "long",
    });
    return newDate;
};

