import { authStore } from '@auth/store/Auth.store';

class RootStore {
  auth = authStore;
}

export default RootStore;
