// utils/avatar.ts

/**
 * Generate an avatar URL from a full name
 * @param name The full name string, e.g. "John Doe"
 * @param bg Background color for the avatar
 * @param color Text color (initials)
 * @returns A URL string for the avatar image
 */
export function generateAvatarUrl(
    name: string,
    bg?: string,
    color?: string,
    ) {
    if (!name) return "";

    // Extract initials (first + last word)
    const parts = name.trim().split(" ");
    let initials = parts[0].charAt(0).toUpperCase();
    if (parts.length > 1) {
        initials += parts[parts.length - 1].charAt(0).toUpperCase();
    }

    const background = bg ?? getRandomHexColor();
    const colors = color ?? getRandomHexColor();

    // Use an avatar generation service (here: ui-avatars.com)
    return `https://ui-avatars.com/api/?name=${initials}&background=${background}&color=${colors}&size=128&bold=true`;
}

function getRandomHexColor() {
    const letters = "0123456789ABCDEF";
    let color = "";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const numberWithCommas = (x: number | string | React.ReactNode) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}