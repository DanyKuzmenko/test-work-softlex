import React from 'react';
import './ErrorPage.scss';

export interface ErrorObject {
  name: string;
  message: string;
}

interface IProps {
  error: ErrorObject | undefined;
}

const ErrorPage: React.FC<IProps> = ({ error }) => (
  <div className='error-page'>
    <span className='error-page__message'>Ошибка {error?.name}: {error?.message}</span>
  </div>
);

export default ErrorPage;
