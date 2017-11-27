import Loadable from 'react-loadable';

import LoadableLoading from './loadableLoading';

const LoadableWrapper = options =>
  Loadable({
    loading: LoadableLoading,
    ...options,
  });

export default LoadableWrapper;
