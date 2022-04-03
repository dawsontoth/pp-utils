import { v4 as createUUIDV4 } from 'uuid';

export function createNoteOff(note: number, baseOffNote?: any) {
  return {
    uuid: {
      string: baseOffNote?.uuid.string || createUUIDV4(),
    },
    name: 'MIDI Note Off',
    isEnabled: true,
    type: 'ACTION_TYPE_COMMUNICATION',
    communication: {
      // TODO: Need to look up
      deviceIdentification: {
        parameterUuid: {
          string: '6FEED632-7520-45E3-BCA0-9D3C2B11E6D4',
        },
        parameterName: 'MIDI',
      },
      midiCommand: {
        state: 'STATE_OFF',
        channel: 1,
        note,
      },
    },
  };
}

export function isOffNote(action: any): boolean {
  return Boolean(
    action?.communication?.midiCommand
    && !action.communication.midiCommand.intensity,
  );
}
