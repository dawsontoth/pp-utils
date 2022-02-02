import { v4 as createUUIDV4 } from 'uuid';

export function createNoteOn(note: number): any {
  return {
    uuid: {
      string: createUUIDV4(),
    },
    name: 'MIDI Note On',
    isEnabled: true,
    type: 'ACTION_TYPE_COMMUNICATION',
    communication: {
      deviceIdentification: {
        parameterUuid: {
          string: 'd6aa9ef2-aedf-437e-9657-18a649c9344b',
        },
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
  return action.communication.midiCommand.intensity;
}

export function isOnNote(action: any): boolean {
  return Boolean(action?.communication?.midiCommand?.intensity);
}
