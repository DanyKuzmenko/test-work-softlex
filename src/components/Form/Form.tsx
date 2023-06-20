import React, { ChangeEvent, useEffect, useState } from 'react';
import './Form.scss';
import Input from '../Input/Input';
import Select from '../Select/Select';
import { getValute, ValuteItem } from '../../api/valuteConverter/valuteConverter';
import ErrorPage, { ErrorObject } from '../ErrorPage/ErrorPage';

const Form: React.FC = () => {
  const [valuteData, setValuteData] = useState<ValuteItem[]>([]);
  const [dataError, setDataError] = useState<ErrorObject | undefined>(undefined);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<number>(1);
  const [selectedValuteText, SetSelectedValuteText] = useState<number | undefined>(undefined);
  const [sumInputValue, setSumInputValue] = useState<number>(1);
  const [resultInputValue, setResultInputValue] = useState<number>(1);

  useEffect(() => {
    getValute()
      .then((res) => res.json())
      .then(
        (result) => {
          setIsDataLoaded(true);
          const arrayOfValutes: ValuteItem[] = Object.entries(result.Valute);
          setValuteData(arrayOfValutes);
          if (localStorage.getItem('valute')) {
            const valute = localStorage.getItem('valute') || '';
            const numValue = Number(valute);
            setSelectedValue(numValue);
            setResultInputValue(numValue);
            SetSelectedValuteText(numValue);
          } else {
            const initialValue = arrayOfValutes[0][1].Value;
            setSelectedValue(initialValue);
            setResultInputValue(initialValue);
          }
        },
        (error) => {
          const errorObject: ErrorObject = {
            name: error.name,
            message: error.message,
          };
          setIsDataLoaded(true);
          setDataError(errorObject);
        },
      );
  }, []);

  const handleSumInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setSumInputValue(1);
      setResultInputValue(selectedValue);
    } else {
      const numValue = Number(e.target.value);
      setSumInputValue(numValue);
      setResultInputValue(numValue * selectedValue);
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem('valute', e.target.value);
    const numValue = Number(e.target.value);
    setSelectedValue(numValue);
    setResultInputValue(sumInputValue * numValue);
  };

  if (dataError) {
    return <ErrorPage error={dataError} />;
  }

  return (
    <form className='form'>
      {isDataLoaded ? (
        <>
          <h3 className='form__title'>Конвертер валют</h3>
          <div className='form__inputs-container'>
            <Input
              placeholder='Введите сумму'
              handleInputChange={handleSumInputChange}
              value={sumInputValue}
            />
            <Select
              data={valuteData}
              handleSelectChange={handleSelectChange}
              defaultValue={selectedValuteText}
            />
            <div className='form__result-input-container'>
              <Input
                isResultCheckbox
                value={resultInputValue}
                disabled
              />
              <span className='form__valute-sign'>₽</span>
            </div>
          </div>
        </>
      ) : (
        <span className='form__loading'>Loading...</span>
      )}
    </form>
  );
};

export default Form;
