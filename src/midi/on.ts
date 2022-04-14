import { v4 as createUUIDV4 } from 'uuid';

export function createNoteOn(note: number, deviceUuid: string): any {
  return {
    // TODO: Need to look up
    uuid: {
      string: createUUIDV4(),
    },
    name: 'MIDI Note On',
    isEnabled: true,
    type: 'ACTION_TYPE_COMMUNICATION',
    communication: {
      deviceIdentification: {
        parameterUuid: {
          string: deviceUuid,
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

export function extractMidiOnNote(action: any): number {
  return action.communication.midiCommand.note;
}

export function isOnNote(action: any): boolean {
  return Boolean(action?.communication?.midiCommand?.intensity);
}
