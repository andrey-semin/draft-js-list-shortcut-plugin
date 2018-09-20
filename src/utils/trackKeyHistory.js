import { KeyBindingUtil } from 'draft-js';

export default () => {
  let history = [];
  return e => {
    const { key } = e;

    if (history.length > 2) {
      history = history.slice(1);
    }

    if (!KeyBindingUtil.hasCommandModifier(e)) {
      history.push(key);
    }

    return history;
  };
};
