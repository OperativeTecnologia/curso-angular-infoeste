import { Model } from '@burand/angular';

export interface User extends Model {
  active: boolean;
  name: string;
  email: string;
  avatar: string | null;
  lastAccess: Date | null;
}
