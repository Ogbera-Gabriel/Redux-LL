import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useAppSelector } from '@/app/hooks';

type Props = {
  value: string;
  handleSelectChange: (value: string) => void;
}

const UserSelect = ({ value, handleSelectChange }: Props) => {
  const users = useAppSelector((state) => state.user);

  return (
    <Select value={value} onValueChange={handleSelectChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default UserSelect;
