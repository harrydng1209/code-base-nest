import routeApis from './route-apis.const';
import shared from './shared.const';

interface IConstants {
  routeApis: typeof routeApis;
  shared: typeof shared;
}

const constants: IConstants = {
  routeApis,
  shared,
};

export default constants;
