class ErrorRepository {
  constructor() {
    this.err = new Map();
  }

  addError(text) {
    const textArray = text.match(/[0-9]{3}[a-z-]*[\sa-z]*[a-z]*/gmi);
    textArray.forEach((item) => {
      const key = item.match(/[0-9]+/g).join('');
      const value = item.match(/[a-z]+[.a-z]*/gi).join(' ');
      this.err.set(Number(key), value);
    });
  }

  translate(code) {
    return this.err.has(code)
      ? this.err.get(code)
      : 'Unknown error';
  }
}

export default ErrorRepository;
