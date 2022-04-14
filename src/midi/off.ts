import { v4 as createUUIDV4 } from 'uuid';

export function createNoteOff(note: number, deviceUuid: string) {
  return {
    uuid: {
      string: createUUIDV4(),
    },
    name: 'MIDI Note Off',
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
