import { Switch } from 'antd';
import { Moon, Sun } from 'lucide-react';
import { useCallback } from 'react';
import { useColorModeContext } from '../../contexts';

export const ThemeSwitch = () => {
  const { setMode, mode } = useColorModeContext();

  const handleChange = useCallback(
    (checked: boolean) => {
      setMode(checked ? 'dark' : 'light');
    },
    [setMode],
  );

  return (
    <Switch
      checkedChildren={<Moon size={12} />}
      unCheckedChildren={<Sun size={12} />}
      value={mode === 'dark'}
      onChange={handleChange}
    />
  );
};
