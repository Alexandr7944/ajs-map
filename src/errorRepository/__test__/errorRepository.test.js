import ErrorRepository from '../errorRepository';

test('test class ErrorRepository', () => {
  const test = new ErrorRepository();
  expect([...test.err]).toEqual([]);
});

test('test method ErrorRepository.addError()', () => {
  const test = new ErrorRepository();
  const text = `200 OK («хорошо»)[2][3];
  201 Created («создано»)[2][3][4];
  202 Accepted («принято»)[2][3];
  203 Non-Authoritative Information («информация не авторитетна»)[2][3];
  204 No Content («нет содержимого»)[2][3];
  205 Reset Content («сбросить содержимое»)[2][3];
  206 Partial Content («частичное содержимое»)[2][3];
  207 Multi-Status («многостатусный»)[5];
  208 Already Reported («уже сообщалось»)[6];
  226 IM Used («использовано IM»).`;
  test.addError(text);
  expect([...test.err]).toEqual([
    [200, 'OK'],
    [201, 'Created'],
    [202, 'Accepted'],
    [203, 'Non'],
    [204, 'No Content'],
    [205, 'Reset Content'],
    [206, 'Partial Content'],
    [207, 'Multi'],
    [208, 'Already Reported'],
    [226, 'IM Used'],
  ]);
});

test('test method ErrorRepository.translate()', () => {
  const test = new ErrorRepository();
  const text = `200 OK («хорошо»)[2][3];
  201 Created («создано»)[2][3][4];
  202 Accepted («принято»)[2][3];
  203 Non-Authoritative Information («информация не авторитетна»)[2][3];
  204 No Content («нет содержимого»)[2][3];
  205 Reset Content («сбросить содержимое»)[2][3];
  206 Partial Content («частичное содержимое»)[2][3];
  207 Multi-Status («многостатусный»)[5];
  208 Already Reported («уже сообщалось»)[6];
  226 IM Used («использовано IM»).`;
  test.addError(text);
  expect(test.translate(205)).toBe('Reset Content');
});

test('test method ErrorRepository.translate() invalid', () => {
  const test = new ErrorRepository();
  const text = `200 OK («хорошо»)[2][3];
  201 Created («создано»)[2][3][4];
  202 Accepted («принято»)[2][3];
  203 Non-Authoritative Information («информация не авторитетна»)[2][3];
  204 No Content («нет содержимого»)[2][3];
  205 Reset Content («сбросить содержимое»)[2][3];
  206 Partial Content («частичное содержимое»)[2][3];
  207 Multi-Status («многостатусный»)[5];
  208 Already Reported («уже сообщалось»)[6];
  226 IM Used («использовано IM»).`;
  test.addError(text);
  expect(test.translate(5)).toBe('Unknown error');
});
