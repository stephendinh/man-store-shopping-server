import * as bcrypt from 'bcrypt';

interface IComparePasswordProps {
  hashedPassword: string;
  password: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (
  props: IComparePasswordProps,
): Promise<boolean> => {
  const { hashedPassword, password } = props;
  return await bcrypt.compare(password, hashedPassword);
};
