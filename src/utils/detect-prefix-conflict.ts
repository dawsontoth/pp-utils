export function detectPrefixConflict(parentMacroName: string, otherMacroName: string): boolean {
  const parentParts = parentMacroName.split(':').map(p => p.trim().toLowerCase());
  const parentPrefixes = parentParts.slice(0, -1);
  const parentName = parentParts[parentParts.length - 1];
  const otherParts = otherMacroName.split(':').map(p => p.trim().toLowerCase());
  const otherPrefixes = otherParts.slice(0, -1);
  const otherName = otherParts[otherParts.length - 1];

  if (parentPrefixes[0] !== otherPrefixes[0]) {
    return false;
  }

  if (parentPrefixes.length === 2
    && otherPrefixes.length === 2
    && parentPrefixes[1] !== otherPrefixes[1]) {
    return false;
  }

  if (parentPrefixes.length !== otherPrefixes.length) {
    return true;
  }

  return parentName !== otherName;
}
