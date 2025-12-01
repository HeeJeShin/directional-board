export const FORBIDDEN_WORDS = [
    "캄보디아",
    "프놈펜",
    "불법체류",
    "텔레그램",
] as const;

export const containsForbiddenWord = (text: string): boolean => {
    return FORBIDDEN_WORDS.some((word) => text.includes(word));
};