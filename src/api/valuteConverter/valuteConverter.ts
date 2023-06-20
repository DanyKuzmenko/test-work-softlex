const getValute = async () => (
  fetch('https://www.cbr-xml-daily.ru/daily_json.js', {
    method: 'GET',
  })
);

interface ValuteItem {
  0: string;
  1: {
    ID: string;
    Name: string;
    Value: number;
  };
}

export type {
  ValuteItem,
};

export {
  getValute,
};
