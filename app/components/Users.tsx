import type { User as UserType } from '../types';

interface UsersState {
  users: UserType[];
  selectedUser: Partial<UserType>;
}

interface UsersProps {
  users: UsersState;
  auth: UserType | null;
  selectUser: (user: Partial<UserType>) => void;
}

export default function Users({ users, selectUser }: UsersProps) {
  return (
    <div className="container">
      <div className="col-12 col-sm-4">
        <h2>All the Cookie Monsters</h2>
        <div id="users" className="list-group">
          {users.users.map(user => (
            <li
              key={user.email}
              className="list-group-item list-group-item-action"
            >
              <a
                onClick={evt => {
                  evt.preventDefault();
                  selectUser(user);
                }}
              >
                {user.name}
              </a>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
