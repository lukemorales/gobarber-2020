import { CURRENT_DAY, CURRENT_MONTH, CURRENT_YEAR } from '@tests/constants';

type MockFrequency = 'every' | 'once';
type SpyFunction = () => number;

const spyOnDateNow = (
  value: number | SpyFunction,
  frequency: MockFrequency = 'once',
) => {
  const jestSpyOn = jest.spyOn(Date, 'now');

  const generateMockDate = () =>
    typeof value === 'number'
      ? new Date(CURRENT_YEAR, CURRENT_MONTH, CURRENT_DAY, value).getTime()
      : value();

  if (frequency === 'once') {
    return jestSpyOn.mockImplementationOnce(generateMockDate);
  }

  return jestSpyOn.mockImplementation(generateMockDate);
};

export default spyOnDateNow;
