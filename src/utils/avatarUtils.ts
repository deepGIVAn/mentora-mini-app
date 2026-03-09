/**
 * Generates a consistent avatar URL using ui-avatars.com
 * @param name The name to use for initials
 * @param background Background color (hex without #)
 * @param color Text color (hex without #)
 */
export const getAvatarUrl = (name: string, background: string = '4F46E5', color: string = 'fff'): string => {
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=${background}&color=${color}`;
};
