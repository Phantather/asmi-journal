import compose from 'compose-function';

import { withAtomState } from './withAtomState';
import { withHelmet } from './withHelmet';
import { withRouter } from './withRouter';
import { withTime } from './withTime';
import { withLocalization } from './withLocalization';

export const withProviders = compose<any>(
  withTime,
  withLocalization,
  withAtomState,
  withHelmet,
  withRouter
);
