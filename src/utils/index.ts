import shared from './shared.util';

interface IUtils {
  shared: typeof shared;
}

const utils: IUtils = {
  shared,
};

export default utils;
