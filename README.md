# ProPresenter MIDI Note Action Generator
This script populates the midi off notes in ProPresenter's macros. 

## TODO:
1. Handle top level names.
2. Be more flexible about finding the on and off notes.
3. Generate stable off note ids (can we use a single id?)
4. Rename all macros to prefix with "Colors:".
5. Create cues for "Colors: Odd:" and "Colors: Even:", including clearing macros.
6. Figure out how to publish this as a npx module.

## Examples

### Colors: Red
- turns on the right note (created in ProPresenter, say, 1)
- should turn off all notes with matching prefix "Colors" and higher prefixes

### Colors: Odd: Red
- turns on the right note (created in ProPresenter, say, 2)
- should turn off all notes with the same prefix "Colors: Odd:"
- should turn off all notes with matching root prefix of "Colors: "
- will NOT turn off notes in a parallel prefix "Colors: Even:"

### Positions: Damascus
- turns on the right note (created in ProPresenter, say, 50)
- should turn off all notes with matching prefix "Positions:"
- should NOT turn off notes under other prefixes like "Colors:" or "Colors: Even:"
