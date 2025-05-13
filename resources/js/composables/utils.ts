export function useNewSlug(text: string, existingSlugs: string[] = []): string {
    const slug = text
        .toString() // Cast to string (optional)
        .normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
        .toLowerCase() // Convert the string to lowercase letters
        .trim() // Remove whitespace from both sides of a string (optional)
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/_/g, '-') // Replace _ with -
        .replace(/-{2,}/g, '-') // Replace multiple - with single -
        .replace(/-$/g, ''); // Remove trailing -

    if (!existingSlugs.includes(slug)) {
        return slug;
    }

    let i = 1;

    while (existingSlugs.includes(`${slug}${i}`)) {
        i++;
    }

    return `${slug}${i}`;
}
