import { v4 as createUUIDV4 } from 'uuid';

export function createNoteOn(note: number): any {
  return {
    // TODO: Need to look up
    uuid: {
      string: createUUIDV4(),
    },
    name: 'MIDI Note On',
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
        channel: 1,
        note,
        intensity: 127,
      },
    },
  };
}

export function toOnNote(action: any): number {
  return action.communication.midiCommand.note;
}

export function isOnNote(action: any): boolean {
  return Boolean(action?.communication?.midiCommand?.intensity);
}
