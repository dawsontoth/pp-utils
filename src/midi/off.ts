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
          string: 'd6aa9ef2-aedf-437e-9657-18a649c9344b',
        },
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
