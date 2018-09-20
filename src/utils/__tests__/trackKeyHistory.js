import createTrackKeyHistory from '../trackKeyHistory';

const createKeyboardEvent = (key, ctrlKey = false) =>
  new KeyboardEvent('keydown', {
    key,
    ctrlKey
  });

describe('utils/trackKeyHistory', () => {
  it('should add event to history', () => {
    const key = 'Space';
    const event = createKeyboardEvent(key);
    const trackKeyHistory = createTrackKeyHistory();
    const history = trackKeyHistory(event);

    expect(history).toBeInstanceOf(Array);
    expect(history).toHaveLength(1);
  });

  it('should not add event with modifier to history', () => {
    const key = 'Space';
    const event = createKeyboardEvent(key, true);
    const trackKeyHistory = createTrackKeyHistory();

    const history = trackKeyHistory(event);

    expect(history).toBeInstanceOf(Array);
    expect(history).toHaveLength(0);
  });

  it('should store only 3 keys', () => {
    const key = 'Space';
    const event = createKeyboardEvent(key);
    const trackKeyHistory = createTrackKeyHistory();

    let history = trackKeyHistory(event);
    expect(history).toHaveLength(1);

    history = trackKeyHistory(event);
    expect(history).toHaveLength(2);

    history = trackKeyHistory(event);
    expect(history).toHaveLength(3);

    history = trackKeyHistory(event);
    expect(history).toHaveLength(3);
  });
});
