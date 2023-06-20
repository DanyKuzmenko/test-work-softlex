import React, { ChangeEvent } from 'react';
import './Select.scss';
import { ValuteItem } from '../../api/valuteConverter/valuteConverter';

interface IProps {
  data: ValuteItem[];
  handleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  defaultValue: number | undefined;
}

const Select: React.FC<IProps> = ({ data, handleSelectChange, defaultValue }) => (
  <select className='select' defaultValue={defaultValue} onChange={handleSelectChange}>
    {data.map((item: ValuteItem) => (
      <option key={item[1].ID} value={item[1].Value}>{item[0]} ({item[1].Name})</option>
    ))}
  </select>
);

export default Select;
