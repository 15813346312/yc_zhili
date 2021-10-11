import mitt from '/@/utils/mitt';

const emitter = new mitt();
const emitter_key = 'paln_event_reload';

export function listener(callback: () => {}) {
  emitter.on(emitter_key, callback);
}

export function trigger(data: any) {
  emitter.emit(emitter_key, data);
}
